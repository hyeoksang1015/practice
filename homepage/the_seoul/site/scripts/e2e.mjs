// 브라우저 점검: 빌드된 out/ 을 로컬 서버로 띄우고 헤드리스 Edge(또는 Chrome)를 원격 조작해 확인한다.
// 사용법: npm run build && npm run e2e   (화면 캡처는 SHOTS=폴더 를 주면 그 폴더에 저장)
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, statSync, writeFileSync } from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";

const OUT = path.resolve("out");
const PORT = 4190, CDP = 9350, BASE = `http://127.0.0.1:${PORT}`;
const SHOTS = process.env.SHOTS;
const WIDTHS = [375, 768, 1440];
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".xml": "application/xml", ".txt": "text/plain", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".ico": "image/x-icon" };

if (!existsSync(OUT)) throw new Error("out/ 이 없습니다. 먼저 npm run build 를 실행하세요.");

const server = http.createServer((req, res) => {
  let file = path.join(OUT, decodeURIComponent(new URL(req.url, BASE).pathname));
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, "index.html");
  const ok = existsSync(file);
  if (!ok) file = path.join(OUT, "404.html");
  res.writeHead(ok ? 200 : 404, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
}).listen(PORT);

const browserPath = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Google/Chrome/Application/chrome.exe"].find(existsSync);
const browser = spawn(browserPath, ["--headless=new", "--hide-scrollbars", `--remote-debugging-port=${CDP}`, `--user-data-dir=${mkdtempSync(path.join(os.tmpdir(), "seoul-e2e-"))}`, "about:blank"]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const problems = [], external = [], results = [];
const check = (name, pass, detail = "") => { results.push(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? "  [" + detail + "]" : ""}`); if (process.env.VERBOSE) console.error(results.at(-1)); };

async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id) { pending.get(msg.id)?.(msg); return pending.delete(msg.id); }
    if (msg.method === "Runtime.exceptionThrown") problems.push("exception: " + msg.params.exceptionDetails.text);
    if (msg.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(msg.params.type)) problems.push(`console.${msg.params.type}: ` + msg.params.args.map((a) => a.value ?? a.description).join(" "));
    if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") problems.push("log: " + msg.params.entry.text + " " + (msg.params.entry.url ?? ""));
    if (msg.method === "Network.requestWillBeSent") {
      const { url } = msg.params.request;
      // 글꼴·이미지를 모두 자체 호스팅하므로 외부 요청은 없어야 한다.
      if (!["http://127.0.0.1:4190", "about:", "data:", "blob:", "mailto:"].some((p) => url.startsWith(p))) external.push(url);
    }
  };
  // 응답이 없으면 무한정 기다리지 않고 어느 단계에서 멈췄는지 알린다.
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const myId = ++id;
    const timer = setTimeout(() => { pending.delete(myId); reject(new Error(`CDP 응답 없음: ${method}`)); }, 60000);
    pending.set(myId, (msg) => { clearTimeout(timer); resolve(msg); });
    ws.send(JSON.stringify({ id: myId, method, params }));
  });
  return { send, close: () => ws.close() };
}

await sleep(1500);
const root = await connect((await (await fetch(`http://127.0.0.1:${CDP}/json/version`)).json()).webSocketDebuggerUrl);

async function openPage(width, height = 900) {
  const { result } = await root.send("Target.createTarget", { url: "about:blank" });
  const { send, close } = await connect(`ws://127.0.0.1:${CDP}/devtools/page/${result.targetId}`);
  await root.send("Target.activateTarget", { targetId: result.targetId });
  for (const d of ["Runtime", "Log", "Page", "Network"]) await send(d + ".enable");
  const mobile = width < 768;
  const resize = (w, h) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, mobile });
  await resize(width, height);
  const js = async (expression) => {
    const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (r.result.exceptionDetails) throw new Error(expression.slice(0, 80) + " -> " + r.result.exceptionDetails.exception?.description);
    return r.result.result.value;
  };
  return {
    send, js, resize,
    close: async () => { close(); await root.send("Target.closeTarget", { targetId: result.targetId }); },
    go: async (url) => { await send("Page.navigate", { url: BASE + url }); await sleep(1000); },
    key: async (key) => { const k = { key, code: key, windowsVirtualKeyCode: { Escape: 27 }[key] }; await send("Input.dispatchKeyEvent", { type: "rawKeyDown", ...k }); await send("Input.dispatchKeyEvent", { type: "keyUp", ...k }); await sleep(150); },
    noOverflow: () => js("document.documentElement.scrollWidth <= window.innerWidth"),
    loadAllImages: () => js(`(async () => { document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager'); for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 5000); }))); scrollTo(0, 0); return [...document.images].filter(i => !i.naturalWidth).map(i => i.getAttribute('src')); })()`),
    shot: async (name) => {
      if (!SHOTS) return;
      const h = await js("document.documentElement.scrollHeight");
      const { result: r } = await send("Page.captureScreenshot", { format: "jpeg", quality: 70, clip: { x: 0, y: 0, width, height: h, scale: width > 800 ? 0.5 : 1 }, captureBeyondViewport: true });
      mkdirSync(SHOTS, { recursive: true });
      writeFileSync(path.join(SHOTS, name + ".jpg"), Buffer.from(r.data, "base64"));
    },
  };
}

// 입력칸에 값을 넣고 React 가 알아채도록 input·change 이벤트를 보낸다.
const fill = (sel, v) => `(() => { const e = document.querySelector(${JSON.stringify(sel)}); const proto = e.tagName === 'TEXTAREA' ? HTMLTextAreaElement : e.tagName === 'SELECT' ? HTMLSelectElement : HTMLInputElement; Object.getOwnPropertyDescriptor(proto.prototype, 'value').set.call(e, ${JSON.stringify(v)}); e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); })()`;
// 보이는 요소 중 글자가 맞는 첫 요소를 누른다. 없으면 어떤 요소를 못 찾았는지 알린다.
const click = (sel, text) => `(() => { const e = [...document.querySelectorAll(${JSON.stringify(sel)})].find(e => e.offsetParent !== null && ${text ? `e.textContent.includes(${JSON.stringify(text)})` : "true"}); if (!e) throw new Error(${JSON.stringify("없음: " + sel + " " + (text ?? ""))}); e.click(); })()`;
const text = (sel) => `document.querySelector(${JSON.stringify(sel)})?.textContent ?? ''`;
const visible = (sel) => `!!document.querySelector(${JSON.stringify(sel)}) && !document.querySelector(${JSON.stringify(sel)}).hidden`;
const RECEIPT = /TS-\d{8}-[A-Z0-9]{4}/;
// 전시 기간 안에서 내일 이후 첫 화–일요일 (한국 날짜 기준)
const VISIT_DAY = `(() => { const kst = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10); let d = new Date(Math.max(Date.parse(kst) + 864e5, Date.parse('2026-11-10'))); while (d.getUTCDay() === 1) d = new Date(+d + 864e5); return d.toISOString().slice(0, 10); })()`;

try {
  // ── 페이지별 레이아웃
  for (const w of WIDTHS) {
    for (const url of ["/", "/spaces/", "/rental/", "/booking/"]) {
      const p = await openPage(w);
      await p.go(url);
      const broken = await p.loadAllImages();
      check(`[${w}] ${url} 가로 스크롤 없음`, await p.noOverflow(), String(await p.js("document.documentElement.scrollWidth")));
      check(`[${w}] ${url} 이미지 모두 불러옴`, broken.length === 0, broken.join(", "));
      check(`[${w}] ${url} h1 하나`, (await p.js("document.querySelectorAll('h1').length")) === 1);
      const clipped = await p.js(`[...document.querySelectorAll('h1,h2,h3,p,a,button,dd,dt,li,label')].filter(e => e.offsetParent && e.scrollWidth > e.clientWidth + 1 && !['visible', 'clip'].includes(getComputedStyle(e).overflowX) && !e.closest('.sr-only') && !e.classList.contains('sr-only')).map(e => e.textContent.trim().slice(0, 30))`);
      check(`[${w}] ${url} 글자가 잘린 요소 없음`, clipped.length === 0, clipped.join(" | "));
      if (w === 375) {
        const small = await p.js(`[...document.querySelectorAll('main button, main a[class*=min-h], header a, nav a')].filter(e => e.offsetParent && e.getBoundingClientRect().height < 24).map(e => e.textContent.trim().slice(0, 16) + ':' + Math.round(e.getBoundingClientRect().height))`);
        check(`[375] ${url} 누르는 요소 높이 24px 이상`, small.length === 0, small.join(", "));
        check(`[375] ${url} 하단 탭 보임`, await p.js(`getComputedStyle(document.querySelector('nav[aria-label="하단 메뉴"]')).display !== 'none'`));
      }
      await p.shot(`${url.replace(/\//g, "_")}-${w}`);
      await p.close();
    }
  }

  // ── 홈: 관람 상태, 전시 예매, 초청 프로그램
  const h = await openPage(1440);
  await h.go("/");
  check("홈: 오늘 관람 상태 배지", /Open Now|Closed Now/.test(await h.js(text("[data-testid=open-badge]"))));
  check("홈: 현재 메뉴 표시", (await h.js(text("header a[aria-current=page]"))).includes("홈"));
  await h.js(click("main button", "예매하기")); await sleep(200);
  check("예매: 대화상자 열림", await h.js("!!document.querySelector('dialog[open]')"));
  await h.js(click("dialog[open] button[type=submit]")); await sleep(150);
  check("예매: 빈칸이면 오류 3개", (await h.js("document.querySelectorAll('dialog[open] [role=alert]').length")) === 3);
  await h.js(fill("dialog[open] input[name=date]", "2026-11-16")); // 월요일
  await h.js(fill("dialog[open] input[name=name]", "김관람"));
  await h.js(fill("dialog[open] input[name=tel]", "010-1234-5678"));
  await h.js(click("dialog[open] button[type=submit]")); await sleep(150);
  check("예매: 월요일은 휴관 안내", (await h.js(text("dialog[open] [role=alert]"))).includes("월요일"));
  await h.js(fill("dialog[open] input[name=date]", await h.js(VISIT_DAY)));
  await h.js(fill("dialog[open] select[name=count]", "3"));
  await h.js(click("dialog[open] button[type=submit]")); await sleep(150);
  const done = await h.js(text("dialog[open] [data-testid=reserve-done]"));
  check("예매: 접수번호와 인원", RECEIPT.test(done) && done.includes("3명"), done.slice(0, 80));
  await h.key("Escape");
  check("예매: Esc 로 닫힘", await h.js("!document.querySelector('dialog[open]')"));
  await h.js(click("main button", "초청 코드 입력")); await sleep(200);
  await h.js(fill("dialog[open] input[name=name]", "김초청"));
  await h.js(fill("dialog[open] input[name=tel]", "01012345678"));
  await h.js(fill("dialog[open] input[name=code]", "ab"));
  await h.js(click("dialog[open] button[type=submit]")); await sleep(150);
  check("갈라: 짧은 초청 코드 거부", (await h.js(text("dialog[open] [role=alert]"))).includes("코드"));
  await h.js(fill("dialog[open] input[name=code]", "NOCT2026"));
  await h.js(click("dialog[open] button[type=submit]")); await sleep(150);
  check("갈라: 코드 형식 맞으면 접수", RECEIPT.test(await h.js(text("dialog[open] [data-testid=reserve-done]"))));
  await h.close();

  // ── 공간 소개: 층별 가이드
  const sp = await openPage(1440);
  await sp.go("/spaces/");
  check("층별: 기본 1F 열림", (await sp.js(visible("#floor-panel-1F"))) && !(await sp.js(visible("#floor-panel-B1"))));
  await sp.js("document.querySelector('[data-testid=iso-B1]').dispatchEvent(new MouseEvent('click', { bubbles: true }))"); await sleep(150);
  check("층별: 단면도 B1 → 목록 B1 열림", (await sp.js(visible("#floor-panel-B1"))) && !(await sp.js(visible("#floor-panel-1F"))));
  await sp.js(click("#floor-3F button")); await sleep(150);
  check("층별: 목록 3F → 단면도 3F 선택", (await sp.js("document.querySelector('[data-testid=iso-3F]').getAttribute('aria-pressed')")) === "true");
  await sp.js("document.querySelector('[data-testid=iso-2F]').focus()");
  await sp.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 }); await sleep(150);
  check("층별: 키보드 Enter 로 2F", await sp.js(visible("#floor-panel-2F")));
  await sp.go("/spaces/#floor-B1"); await sleep(300);
  check("층별: 주소 해시 #floor-B1 로 바로 열림", await sp.js(visible("#floor-panel-B1")));
  await sp.close();

  // ── 대관 안내: 계산기와 신청 연결
  const r = await openPage(1440);
  await r.go("/rental/");
  const total = () => r.js(text("[data-testid=calc-total]"));
  check("계산기: 기본 제1전시장 30일", (await total()) === "₩ 60,000,000", await total());
  await r.js(fill("[data-testid=calc-venue]", "g2")); await sleep(100);
  check("계산기: 제2전시장 30일", (await total()) === "₩ 75,000,000", await total());
  await r.js(click("button[aria-label='하루 늘리기']")); await sleep(100);
  check("계산기: + 로 31일", (await total()) === "₩ 77,500,000", await total());
  await r.js(click("button[aria-pressed]", "하절기")); await sleep(100);
  check("계산기: 하절기 10% 가산", (await total()) === "₩ 85,250,000", await total());
  await r.js(fill("[data-testid=calc-days]", "500")); await r.js("document.querySelector('[data-testid=calc-days]').focus(); document.querySelector('[data-testid=calc-days]').blur()"); await sleep(100);
  check("계산기: 500일 → 120일로 맞춤", (await r.js("document.querySelector('[data-testid=calc-days]').value")) === "120", await r.js("document.querySelector('[data-testid=calc-days]').value"));
  check("계산기: 120일에서 + 버튼 막힘", await r.js(`document.querySelector('button[aria-label="하루 늘리기"]').disabled`));
  await r.js("document.querySelectorAll('details[name=rental-faq] summary')[0].click()"); await r.js("document.querySelectorAll('details[name=rental-faq] summary')[1].click()"); await sleep(100);
  check("FAQ: 하나만 열림", (await r.js("document.querySelectorAll('details[name=rental-faq][open]').length")) === 1);
  await r.js(click("a", "가승인 신청")); await sleep(1500);
  check("계산기 → 신청서: 주소에 조건", (await r.js("location.search")) === "?venue=g2&days=120&season=summer", await r.js("location.search"));
  check("신청서: 제2전시장 미리 선택", (await r.js(text("aside dd"))).includes("제2전시장") && !(await r.js(text("aside dd"))).includes("제1전시장"));
  await r.js(fill("[data-field=start]", "2027-03-02")); await sleep(100);
  check("신청서: 120일 기준 종료일 자동 입력", (await r.js("document.querySelector('[data-field=end]').value")) === "2027-06-29", await r.js("document.querySelector('[data-field=end]').value"));
  check("신청서: 하절기 견적 반영", (await r.js(text("[data-testid=booking-quote]"))) === "₩ 330,000,000", await r.js(text("[data-testid=booking-quote]")));
  await r.close();

  // ── 대관 신청서: 검증과 접수
  const b = await openPage(1440);
  await b.go("/booking/");
  await b.js(click("form button[type=submit]")); await sleep(200);
  check("신청서: 빈칸 제출 → 첫 칸에 초점", (await b.js("document.activeElement.dataset.field")) === "company", await b.js("document.activeElement.dataset.field"));
  check("신청서: 오류 개수 안내", (await b.js("[...document.querySelectorAll('form [role=alert]')].at(-1)?.textContent ?? ''")).includes("항목"));
  check("신청서: 진행률 40% (유형·공간 기본값)", (await b.js(text("[data-testid=progress]"))).includes("40%"), await b.js(text("[data-testid=progress]")));
  const fields = { "[data-field=company]": "(주)아틀리에 서울", "[data-field=bizNo]": "123-45-67890", "[data-field=manager]": "홍길동", "[data-field=tel]": "010-1234-5678", "[data-field=email]": "curator@brand.co.kr" };
  for (const [sel, v] of Object.entries(fields)) await b.js(fill(sel, v));
  await b.js(click("label", "아트리움")); await sleep(100);
  await b.js(fill("[data-field=start]", "2027-01-05")); await b.js(fill("[data-field=end]", "2027-02-03")); await sleep(100);
  check("신청서: 2개 공간 30일 견적", (await b.js(text("[data-testid=booking-quote]"))) === "₩ 90,000,000", await b.js(text("[data-testid=booking-quote]")));
  await b.js(fill("[data-field=end]", "2027-01-10")); await sleep(100);
  check("신청서: 30일 미만은 별도 문의", (await b.js(text("[data-testid=booking-quote]"))).includes("별도 문의"));
  await b.js(fill("[data-field=end]", "2027-01-01")); await b.js(click("form button[type=submit]")); await sleep(150);
  check("신청서: 종료일이 앞서면 오류", (await b.js("document.activeElement.dataset.field")) === "end", await b.js("document.activeElement.dataset.field"));
  await b.js(fill("[data-field=end]", "2027-02-03"));
  await b.js(`(() => { const dt = new DataTransfer(); dt.items.add(new File(['x'], 'virus.exe')); const i = document.querySelector('input[type=file]'); i.files = dt.files; i.dispatchEvent(new Event('change', { bubbles: true })); })()`); await sleep(100);
  check("신청서: 첨부 목록 표시", (await b.js(text("[data-testid=file-list]"))).includes("virus.exe"));
  await b.js(click("[data-field=agreeRules]")); await b.js(click("[data-field=agreePrivacy]"));
  await b.js(click("form button[type=submit]")); await sleep(150);
  check("신청서: 허용 안 된 파일 거부", (await b.js("document.activeElement.dataset.field")) === "files", await b.js("document.activeElement.dataset.field"));
  await b.js(click("button[aria-label='virus.exe 빼기']")); await sleep(100);
  await b.js(click("form button[type=submit]")); await sleep(300);
  const ok = await b.js(text("[data-testid=booking-done]"));
  check("신청서: 접수 완료와 접수번호", RECEIPT.test(ok) && ok.includes("아틀리에 서울") && ok.includes("30일"), ok.slice(0, 120));
  check("신청서: 진행률 100%", (await b.js(text("[data-testid=progress]"))).includes("100%"));
  await b.js(click("button", "새 신청서 작성")); await sleep(150);
  check("신청서: 새로 작성 시 동의 해제", (await b.js("document.querySelector('[data-field=agreeRules]').checked")) === false);
  await b.js("document.querySelector('details[name=regulations] summary').click()"); await sleep(100);
  check("규약: 펼치면 조항 보임", await b.js("document.querySelector('details[name=regulations][open] ol li')?.offsetParent !== null"));
  await b.go("/nope/");
  check("없는 주소 → 404 안내", (await b.js(text("h1"))).includes("찾으시는 페이지가 없습니다"));
  await b.close();
} finally {
  const real = problems.filter((m) => !m.includes("/nope/"));
  check("콘솔 오류·경고 없음", real.length === 0, [...new Set(real)].slice(0, 5).join(" | "));
  check("외부 요청 없음(글꼴·이미지 자체 호스팅)", external.length === 0, [...new Set(external)].slice(0, 5).join(", "));
  console.log(results.join("\n"));
  const failed = results.filter((r) => r.startsWith("FAIL")).length;
  console.log(`\n${results.length - failed}/${results.length} 통과`);
  browser.kill();
  server.close();
  process.exitCode = failed ? 1 : 0;
}
