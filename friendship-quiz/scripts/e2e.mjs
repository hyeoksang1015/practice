// 브라우저 점검: 빌드된 out/ 을 로컬 서버로 띄우고 헤드리스 Edge(또는 Chrome)를 원격 조작해 전체 흐름을 확인한다.
// 사용법: npm run build && npm run e2e   (Windows의 Edge/Chrome 기준, 인터넷 연결 필요: 광고·분석 요청까지 확인한다)
// 핵심 확인: 4개 언어 페이지, A→B 초대 흐름, 언어 전환 시 답 유지, 온도 테마, 잘못된 링크,
// 그리고 # 뒤 답변(payload)이 어떤 요청(GA·광고·Clarity 포함)에도 실리지 않는지.
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, statSync } from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";

const OUT = path.resolve("out");
const PORT = 4173, CDP = 9333, BASE = `http://127.0.0.1:${PORT}`;
const LANGS = { ko: "ko", en: "en", ja: "ja", zh: "zh-Hans" };
const pre = (lang, p) => (lang === "ko" ? p : `/${lang}${p}`);
const HANGUL = /[\uac00-\ud7a3]/;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain", ".png": "image/png", ".woff2": "font/woff2" };

if (!existsSync(OUT)) throw new Error("out/ 이 없습니다. 먼저 npm run build 를 실행하세요.");

const serverSeen = [];
const server = http.createServer((req, res) => {
  serverSeen.push(req.url + " " + JSON.stringify(req.headers));
  let file = path.join(OUT, decodeURIComponent(new URL(req.url, BASE).pathname));
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, "index.html");
  const ok = existsSync(file);
  if (!ok) file = path.join(OUT, "404.html");
  res.writeHead(ok ? 200 : 404, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
}).listen(PORT);

const browserPath = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Google/Chrome/Application/chrome.exe"].find(existsSync);
const browser = spawn(browserPath, ["--headless=new", `--remote-debugging-port=${CDP}`, `--user-data-dir=${mkdtempSync(path.join(os.tmpdir(), "rt-e2e-"))}`, "about:blank"]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const problems = [], requests = [], external = [], results = [];
const check = (name, pass, detail = "") => results.push(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? "  [" + detail + "]" : ""}`);

async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id) return pending.get(msg.id)?.(msg);
    if (msg.method === "Runtime.exceptionThrown") problems.push("exception: " + msg.params.exceptionDetails.text);
    if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") problems.push("console.error: " + msg.params.args.map((a) => a.value ?? a.description).join(" "));
    if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") problems.push("log: " + msg.params.entry.text + " " + (msg.params.entry.url ?? ""));
    if (msg.method === "Network.requestWillBeSent") {
      const { url, headers, postData } = msg.params.request;
      requests.push(url + " " + JSON.stringify(headers) + " " + (postData ?? ""));
      if (!["http://127.0.0.1:4173", "about:", "data:", "blob:"].some((p) => url.startsWith(p)))
        external.push({ host: new URL(url).host, from: new URL(msg.params.documentURL).pathname });
    }
  };
  const send = (method, params = {}) => new Promise((r) => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
  return { send, close: () => ws.close() };
}

async function openPage(root, browserContextId) {
  const { result } = await root.send("Target.createTarget", { url: "about:blank", ...(browserContextId ? { browserContextId } : {}) });
  const { send } = await connect(`ws://127.0.0.1:${CDP}/devtools/page/${result.targetId}`);
  for (const d of ["Runtime", "Log", "Page", "Network"]) await send(d + ".enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 375, height: 800, deviceScaleFactor: 2, mobile: true });
  const js = async (expression) => {
    const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (r.result.exceptionDetails) throw new Error(expression + " -> " + r.result.exceptionDetails.exception?.description);
    return r.result.result.value;
  };
  return {
    send, js,
    go: async (url) => { await send("Page.navigate", { url: url.startsWith("http") ? url : BASE + url }); await sleep(900); },
    reload: async () => { await send("Page.reload"); await sleep(900); },
    text: (sel) => js(`document.querySelector(${JSON.stringify(sel)})?.textContent ?? null`),
    main: () => js("document.querySelector('main').innerText"),
    click: async (sel) => { await js(`document.querySelector(${JSON.stringify(sel)}).click()`); await sleep(150); },
    btn: async (label) => { await js(`[...document.querySelectorAll('button, a.btn')].find(b => b.textContent.trim() === ${JSON.stringify(label)}).click()`); await sleep(250); },
    noOverflow: () => js("document.documentElement.scrollWidth <= window.innerWidth"),
    progress: () => js("document.querySelector('[role=progressbar]')?.getAttribute('aria-valuenow') ?? null"),
    switchLang: async (lang) => { await js(`(() => { const s = document.querySelector('header select'); s.value = ${JSON.stringify(lang)}; s.dispatchEvent(new Event('change', { bubbles: true })); })()`); await sleep(1300); },
    key: async (k, code) => { for (const type of ["keyDown", "keyUp"]) await send("Input.dispatchKeyEvent", { type, key: k, code: k, windowsVirtualKeyCode: code, ...(k === "Enter" && type === "keyDown" ? { text: "\r" } : {}) }); await sleep(120); },
    answer: async (pick, from = 0) => {
      for (let i = from; i < 12; i++) {
        await js(`document.querySelectorAll('input[type=radio]')[${pick(i)}].click()`);
        await sleep(40);
        await js("document.querySelector('form button[type=submit]').click()");
        await sleep(110);
      }
      await sleep(700);
    },
  };
}

const b64 = (data) => Buffer.from(JSON.stringify(data)).toString("base64url");
const decode = (url) => JSON.parse(Buffer.from(url.split("#")[1], "base64url").toString());
const hasAdsense = (h) => h.split("</head>")[0].includes("adsbygoogle.js?client=ca-pub-4035979084834637");
const hasClarity = (h) => h.includes('<script type="text/javascript">(function(c,l,a,r,i,t,y)');
const hasGa = (h) => h.split("</head>")[0].includes("gtag/js?id=G-EQ3K3HCXPW") && h.includes("page_location: location.href.split('#')[0]");

let target;
for (let i = 0; i < 40 && !target; i++) {
  await sleep(250);
  try { target = await (await fetch(`http://127.0.0.1:${CDP}/json/version`)).json(); } catch {}
}
const root = await connect(target.webSocketDebuggerUrl);
const payloads = [];

try {
  const A = await openPage(root);

  // ── 1. 언어별 콘텐츠 페이지 ──
  const CONTENT = ["/", "/tests/", "/tests/couple/", "/tests/friend/", "/tests/family/", "/about/", "/privacy/", "/contact/"];
  for (const [lang, htmlLang] of Object.entries(LANGS)) {
    const bad = [];
    for (const p of CONTENT) {
      const url = pre(lang, p);
      const html = await (await fetch(BASE + url)).text();
      await A.go(url);
      const info = await A.js(`({
        h1: document.querySelector('h1')?.textContent ?? '',
        lang: document.documentElement.lang,
        canonical: document.querySelector('link[rel=canonical]')?.href ?? '',
        hreflang: [...document.querySelectorAll('link[rel=alternate][hreflang]')].map(l => l.hreflang + '=' + new URL(l.href).pathname).sort().join(','),
        og: document.querySelector('meta[property="og:image"]')?.content ?? '',
        main: document.querySelector('main').innerText,
        overflow: document.documentElement.scrollWidth > window.innerWidth,
      })`);
      const expectHreflang = [...Object.entries(LANGS).map(([l, h]) => `${h}=${pre(l, p)}`), `x-default=${p}`].sort().join(",");
      const why = [
        !info.h1 && "h1 없음",
        info.lang !== htmlLang && `html lang=${info.lang}`,
        !info.canonical.endsWith(url) && `canonical=${info.canonical}`,
        info.hreflang !== expectHreflang && `hreflang=${info.hreflang}`,
        !info.og.endsWith(lang === "ko" ? "/og-image.png" : `/og-image-${lang}.png`) && `og=${info.og}`,
        lang !== "ko" && HANGUL.test(info.main) && "본문에 한국어",
        info.overflow && "375px 넘침",
        !hasAdsense(html) && "AdSense 없음",
        !hasClarity(html) && "Clarity 없음",
        !hasGa(html) && "GA 없음",
      ].filter(Boolean);
      if (why.length) bad.push(`${url}: ${why.join(", ")}`);
    }
    check(`${lang}: 콘텐츠 ${CONTENT.length}쪽 (h1·html lang·canonical·hreflang·og 이미지·번역·375px·광고/분석 태그)`, bad.length === 0, bad.join(" | "));
  }
  for (const lang of Object.keys(LANGS)) {
    const img = await fetch(BASE + (lang === "ko" ? "/og-image.png" : `/og-image-${lang}.png`));
    check(`${lang}: 미리보기 이미지 제공`, img.status === 200 && img.headers.get("content-type") === "image/png");
  }
  await A.go("/ja/about/");
  check("일본어 긴 문장 줄바꿈(word-break: normal)", (await A.js("getComputedStyle(document.body).wordBreak")) === "normal" && (await A.noOverflow()));

  // ── 2. 초대·결과·404 페이지 태그 ──
  for (const lang of Object.keys(LANGS)) {
    const pages = await Promise.all(["/invite/", "/result/"].map(async (p) => (await fetch(BASE + pre(lang, p))).text()));
    check(`${lang}: 초대·결과 화면에 광고·Clarity 없음, GA(# 제거)·noindex 있음`, pages.every((h) => !hasAdsense(h) && !hasClarity(h) && hasGa(h) && h.includes("noindex")));
  }
  for (const p of ["/no-such-page", "/en/no-such-page"]) {
    const res = await fetch(BASE + p);
    const h = await res.text();
    check(`404 ${p}: 네 언어 안내, 광고 없음`, res.status === 404 && ["페이지를 찾을 수 없어요", "Page not found", "ページが見つかりません", "找不到这个页面"].every((s) => h.includes(s)) && !hasAdsense(h) && hasGa(h));
  }
  const sitemap = await (await fetch(BASE + "/sitemap.xml")).text();
  check("sitemap: 4개 언어 주소·hreflang, 초대·결과 제외", ["/tests/couple/", "/en/tests/couple/", "/ja/about/", "/zh/"].every((s) => sitemap.includes(s)) && sitemap.includes('hreflang="zh-Hans"') && !sitemap.includes("invite") && !sitemap.includes("result"));
  check("robots.txt·ads.txt", (await (await fetch(BASE + "/robots.txt")).text()).includes("sitemap.xml") && (await (await fetch(BASE + "/ads.txt")).text()).trim() === "google.com, pub-4035979084834637, DIRECT, f08c47fec0942fa0");

  // ── 3. 한국어 A 흐름 ──
  await A.go("/");
  await A.click('a[href="/tests/couple/"]');
  await sleep(900);
  check("홈 → 연인 카테고리", (await A.js("location.pathname")) === "/tests/couple/");
  await A.btn("테스트 시작하기");
  check("A: 첫 질문·제목 포커스", (await A.progress()) === "1" && (await A.js("document.activeElement === document.querySelector('legend h2')")));
  await A.click("form button[type=submit]");
  check("A: 미답변 안내", (await A.text("[role=alert]")).includes("골라야"));
  await A.js("document.querySelector('input[type=radio]').focus()");
  await A.key(" ", 32);
  await A.key("ArrowDown", 40);
  check("A: 키보드 방향키로 선택", await A.js("document.querySelectorAll('input[type=radio]')[1].checked"));
  await A.key("Enter", 13);
  check("A: Enter로 다음", (await A.progress()) === "2");
  await A.btn("이전");
  check("A: 이전으로 가도 답 유지", (await A.progress()) === "1" && (await A.js("document.querySelectorAll('input[type=radio]')[1].checked")));
  await A.click("input[type=radio]");
  await A.click("form button[type=submit]");
  await A.click("input[type=radio]");
  await A.click("form button[type=submit]");
  await A.reload();
  check("A: 새로고침해도 이어짐", (await A.progress()) === "3");
  await A.answer(() => 0, 2);
  const inviteUrl = await A.js("document.querySelector('input[readonly]').value");
  payloads.push(inviteUrl.split("#")[1]);
  const ip = decode(inviteUrl);
  check("A: 초대 링크(카테고리·버전·A 답만)", inviteUrl.startsWith(BASE + "/invite/#") && JSON.stringify(Object.keys(ip).sort()) === '["a","c","t","v"]' && ip.a.join("") === "000000000000", `${inviteUrl.length}자`);
  await A.btn("링크 공유하기");
  await sleep(300);
  check("공유 API·클립보드 없을 때 직접 복사 안내", /직접 복사|복사했어요|공유/.test(await A.text("[role=status]")), await A.text("[role=status]"));
  await A.send("Browser.grantPermissions", { permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"] });
  await A.js("window.focus()");
  await A.btn("링크 복사");
  await sleep(300);
  check("A: 링크 복사", (await A.text("[role=status]")).includes("복사했어요"));
  await A.reload();
  check("A: 새로고침해도 초대 링크 유지", (await A.js("document.querySelector('input[readonly]')?.value")) === inviteUrl);

  // ── 4. 한국어 B 흐름(별도 브라우저 컨텍스트 = 시크릿 창) ──
  const ctx = (await root.send("Target.createBrowserContext")).result.browserContextId;
  const B = await openPage(root, ctx);
  await B.go(inviteUrl);
  check("B: 링크로 카테고리 복원, 저장소 비어 있음", (await B.main()).includes("연인 궁합 테스트 초대") && (await B.js("sessionStorage.length")) === 0);
  await B.btn("답변 시작하기");
  check("B: A의 답을 미리 보여 주지 않음", !(await B.js("[...document.querySelectorAll('input[type=radio]')].some(r => r.checked)")));
  await B.js("document.querySelectorAll('input[type=radio]')[3].click()");
  await B.click("form button[type=submit]");
  await B.reload();
  check("B: 새로고침해도 이어짐", (await B.progress()) === "2");
  await B.answer(() => 3, 1);
  const resultUrl = await B.js("location.href");
  payloads.push(resultUrl.split("#")[1]);
  const rp = decode(resultUrl);
  let body = await B.main();
  check("B 완료 → 결과(A 답 그대로 + B 답)", resultUrl.startsWith(BASE + "/result/#") && rp.a.join("") === "000000000000" && rp.b.join("") === "333333333333");
  check("결과: 23.0℃ low 서늘함", (await B.js("document.querySelector('[data-temp]').dataset.temp")) === "low" && body.includes("23.0") && body.includes("서늘함"));
  check("결과: 구성 요소 8개·한계 안내", ["이 온도는 이렇게 읽어 주세요", "잘 맞는 부분", "다르게 느낄 수 있는 부분", "오해가 생길 수 있는 상황", "이렇게 해 보세요", "함께 이야기해 볼 질문", "결과 함께 보기", "테스트 새로 시작하기", "오락용 지표"].every((s) => body.includes(s)));
  check("결과: 두 사람의 실제 답", body.includes("초대한 사람: 마음은 깊어도 표현은 특별한 날에 주로 한다") && body.includes("초대받은 사람: 생각날 때마다 바로바로 표현한다"));
  check("결과 375px", await B.noOverflow());
  await B.reload();
  check("결과 새로고침 유지", (await B.main()).includes("23.0"));
  await B.btn("홈으로");
  await sleep(1200);
  const homeHasAd = await B.js("!!document.querySelector('script[src*=adsbygoogle]')");
  await B.js("history.back()");
  await sleep(1200);
  check("결과→홈→뒤로: 결과 화면 문서에 광고 스크립트 없음", homeHasAd && (await B.js("location.href")) === resultUrl && !(await B.js("!!document.querySelector('script[src*=adsbygoogle]') || !!window.adsbygoogle")));
  await B.js("history.back()");
  await sleep(1200);
  check("결과에서 뒤로: '이미 답변을 마쳤어요'", (await B.js("location.pathname")) === "/invite/" && (await B.main()).includes("이미 답변을 마쳤어요"));

  // ── 5. 다른 언어 흐름과 언어 전환 ──
  await A.go("/en/tests/friend/");
  await A.btn("Start the test");
  await A.answer(() => 1);
  const enInvite = await A.js("document.querySelector('input[readonly]').value");
  payloads.push(enInvite.split("#")[1]);
  check("en: 초대 링크가 /en/invite/ 로 만들어짐", enInvite.startsWith(BASE + "/en/invite/#"));
  await B.go(enInvite);
  check("en: 초대 화면 영어", (await B.main()).includes("Invitation to the friendship test") && !HANGUL.test(await B.main()));
  await B.switchLang("ja");
  check("초대 화면에서 일본어로 전환해도 # 답 유지", (await B.js("location.href")) === enInvite.replace("/en/", "/ja/") && (await B.main()).includes("友だちの相性テストへの招待"));
  await B.btn("回答をはじめる");
  await B.answer(() => 2);
  const jaResult = await B.js("location.href");
  payloads.push(jaResult.split("#")[1]);
  const jaBody = await B.main();
  check("ja: 결과 36.3℃ あたたか, 한국어 없음", jaResult.startsWith(BASE + "/ja/result/#") && jaBody.includes("36.3") && jaBody.includes("あたたか") && !HANGUL.test(jaBody), (await B.text("h1")) ?? "");
  await B.switchLang("zh");
  check("결과 화면 중국어 전환: 같은 온도·중국어", (await B.js("location.href")) === jaResult.replace("/ja/", "/zh/") && (await B.main()).includes("36.3") && (await B.main()).includes("温暖"));
  await B.switchLang("ko");
  check("결과 화면 한국어 전환: 접두어 없는 주소", (await B.js("location.href")) === jaResult.replace("/ja/", "/") && (await B.main()).includes("따뜻함"));
  await B.switchLang("en");
  check("결과 화면 영어 전환", (await B.main()).includes("Warm") && (await B.main()).includes("36.3") && !HANGUL.test(await B.main()));

  await A.go("/en/tests/family/");
  await A.btn("Start the test");
  for (let i = 0; i < 3; i++) { await A.js("document.querySelectorAll('input[type=radio]')[2].click()"); await A.click("form button[type=submit]"); }
  await A.switchLang("ja");
  check(
    "답하는 도중 언어 전환: 일본어로 4번째 질문부터 바로 이어짐",
    (await A.js("location.pathname")) === "/ja/tests/family/" && (await A.progress()) === "4" && /[぀-ヿ]/.test(await A.text("legend h2")),
    await A.text("legend h2"),
  );

  // ── 6. 온도 테마 ──
  const themed = {};
  for (const [band, bAns] of [["low", Array(12).fill(3)], ["middle", [0, 3, 0, 3, 0, 0, 3, 0, 3, 0, 3, 0]], ["high", Array(12).fill(0).map((_, i) => (i % 3 === 0 ? 1 : 0))]]) {
    const raw = b64({ v: 1, c: "friend", t: 1, a: Array(12).fill(0), b: bAns });
    payloads.push(raw);
    await B.go(`/result/#${raw}`);
    await sleep(300);
    themed[band] = { attr: await B.js("document.querySelector('[data-temp]')?.dataset.temp"), temp: parseFloat(await B.js("document.querySelector('.temp-accent').textContent")), page: await B.js("getComputedStyle(document.body).backgroundColor") };
  }
  check("온도 구간·화면 색(low<30≤middle<36≤high)", themed.low.attr === "low" && themed.middle.attr === "middle" && themed.high.attr === "high" && themed.low.temp < 30 && themed.middle.temp >= 30 && themed.middle.temp < 36 && themed.high.temp >= 36 && new Set(Object.values(themed).map((v) => v.page)).size === 3, JSON.stringify(themed));

  // ── 7. 잘못된 링크 ──
  const good = { v: 1, c: "couple", t: 1, a: Array(12).fill(0) };
  for (const [label, url, expect] of [
    ["payload 없음", "/invite/", "답변 정보가 없어요"],
    ["깨진 payload", "/invite/#%%%not-base64", "읽을 수 없어요"],
    ["스크립트 주입 시도", "/invite/#<img src=x onerror=alert(1)>", "읽을 수 없어요"],
    ["잘린 payload", `/invite/#${b64(good).slice(0, 25)}`, "읽을 수 없어요"],
    ["알 수 없는 카테고리", `/invite/#${b64({ ...good, c: "coworker" })}`, "알 수 없는 테스트"],
    ["알 수 없는 버전", `/invite/#${b64({ ...good, t: 99 })}`, "이전 버전"],
    ["답변 범위 초과", `/invite/#${b64({ ...good, a: Array(12).fill(9) })}`, "올바르지 않아요"],
    ["답변 누락", `/invite/#${b64({ ...good, a: [0, 1] })}`, "올바르지 않아요"],
    ["B 답 범위 초과", `/result/#${b64({ ...good, b: Array(12).fill(7) })}`, "올바르지 않아요"],
    ["결과 주소에 초대 payload", `/result/#${b64({ ...good, a: Array(12).fill(2) })}`, "아직 두 번째 사람이"],
    ["영어: payload 없음", "/en/invite/", "This link has no answers in it"],
    ["중국어: 깨진 payload", "/zh/result/#%%%", "无法读取这个链接"],
  ]) {
    await B.go("/about/");
    await B.go(url);
    const h1 = (await B.text("h1")) ?? "";
    check(`오류 화면: ${label}`, h1.includes(expect) && !(await B.js("!!document.querySelector('[data-temp], input[type=radio]')")), h1);
  }

  // ── 8. 답변이 밖으로 나가지 않는지 ──
  const leaked = payloads.filter((p) => requests.some((r) => r.includes(p)) || serverSeen.some((r) => r.includes(p)));
  check("payload가 어떤 요청(URL·헤더·본문)에도 없음", leaked.length === 0, `요청 ${requests.length}건, payload ${payloads.length}종`);
  const allowed = ["clarity.ms", "bing.com", "googletagmanager.com", "google-analytics.com", "googlesyndication.com", "doubleclick.net", "google.com", "googleadservices.com", "adtrafficquality.google", "gstatic.com"];
  const hosts = [...new Set(external.map((e) => e.host))];
  check("외부 요청은 Google(광고·애널리틱스)·Clarity뿐", hosts.every((h) => allowed.some((g) => h === g || h.endsWith("." + g))), hosts.join(", "));
  const priv = external.filter((e) => /^\/((en|ja|zh)\/)?(invite|result)\//.test(e.from));
  const privHosts = [...new Set(priv.map((e) => e.host))];
  check("초대·결과 화면의 외부 요청은 GA뿐(광고·Clarity 없음)", privHosts.every((h) => ["googletagmanager.com", "google-analytics.com"].some((g) => h === g || h.endsWith("." + g))), privHosts.join(", "));
  check("GA 수집 요청이 실제로 나감", requests.some((r) => r.includes("google-analytics.com/g/collect")));
} catch (e) {
  check("스크립트 오류", false, e.stack);
}

const real = problems.filter((p) => !p.includes("no-such-page"));
check("콘솔 오류 없음", real.length === 0, real.slice(0, 5).join(" ;; "));
console.log(results.join("\n"));
console.log(`\n${results.filter((r) => r.startsWith("PASS")).length} / ${results.length} 통과`);
root.close(); browser.kill(); server.close();
process.exit(results.some((r) => r.startsWith("FAIL")) ? 1 : 0);
