# 관계의 온도 — 작업 인수인계 문서

새 세션에서 이 문서만 읽고 바로 이어서 작업할 수 있도록 정리했습니다. 최종 갱신: 2026-10-21 (4개 언어 지원 추가). **다국어 구조는 맨 아래 11장과 `friendship-quiz/README.md`의 "다국어"를 먼저 읽을 것.**

---

## 1. 한눈에 보기

| 항목 | 내용 |
| --- | --- |
| 서비스 | **관계의 온도**: 연인·친구·가족 궁합 테스트. A가 먼저 답하고 초대 링크를 보내면 B가 같은 질문에 답하고, 두 사람의 답을 비교해 "관계의 온도(℃)"와 해설을 보여 준다 |
| 배포 주소 | https://relationship-dbz.pages.dev (Cloudflare Pages, 프로젝트 이름 `relationship`) |
| 저장소 | https://github.com/hyeoksang1015/practice, 브랜치 `main` (푸시하면 자동 배포) |
| 코드 위치 | `바이브코딩/friendship-quiz/` (폴더 이름은 옛 이름 그대로 둠) |
| 스택 | Next.js 16.4 App Router, 정적 내보내기(`output: "export"`), React 19.3, TypeScript, Tailwind CSS v4, Vitest 5 |
| 서버·DB | 없음. 답변은 URL의 `#` 뒤(fragment)에 담겨 전달된다 |
| 언어 | 사이트·문서·답변 모두 한국어 |

저장소 루트(`바이브코딩/`)에 있는 다른 파일:
- `웹 아이디어.md`: 사용자의 아이디어 메모. **커밋하지 않은 상태로 유지**한다(사용자가 요청한 적 없음).
- 처음에 있던 포트폴리오 `index.html`은 사용자 요청으로 삭제했다. 커밋 `6235567`에 남아 있다.

---

## 2. 실행·검증·배포

```bash
cd friendship-quiz
npm install
npm run dev      # http://localhost:3000
npm test         # Vitest 단위 테스트 (현재 30개 통과)
npm run lint     # ESLint (현재 경고 0)
npm run build    # out/ 생성 + postbuild 로 scripts/fix-export.mjs 실행
```

- **Node 버전**: 로컬은 v24.16. `.node-version`에 `22`를 적어 두어 Cloudflare 빌드는 Node 22를 쓴다.
- **배포 방식**: GitHub `main`에 푸시하면 Cloudflare Pages가 자동으로 빌드·배포한다. 반영까지 약 1~2분 걸린다.
- **Cloudflare 설정**: Root directory는 `friendship-quiz`, Build command는 `npm run build`이다. 출력 폴더는 `wrangler.toml`의 `pages_build_output_dir = "./out"`이 정한다. 이 파일이 있으면 Pages는 대시보드 값 대신 이 파일을 따른다.
  - **과거 장애**: 출력 폴더가 지정되지 않아 소스 폴더 전체가 올라갔고, `/`가 404, 실제 사이트는 `/out/`에 있었다. 그래서 `wrangler.toml`을 추가했다(`c0fcb0a`). 이 파일을 지우면 같은 장애가 재발한다.
- **`scripts/fix-export.mjs`**: Next.js의 Windows 전용 버그를 우회한다. Windows에서 빌드하면 미리 불러오기 파일이 `__next.a/b.txt`처럼 폴더로 쪼개지는데, 이를 `__next.a.b.txt`로 되돌린다. Linux 빌드(Cloudflare)에서는 아무것도 하지 않는다.
- **서비스 주소**: `src/config/site.ts`의 `url` 기본값은 `https://relationship-dbz.pages.dev`이고, 빌드 환경 변수 `NEXT_PUBLIC_SITE_URL`로 덮어쓸 수 있다. canonical, sitemap, robots, og:image의 절대 주소에 쓰인다. 도메인을 바꾸면 이 값을 고친다.
- **배포 확인 방법**: 푸시 뒤 `curl`로 15초마다 폴링해 새 내용이 보일 때까지 기다리고, 페이지별 상태 코드와 `<head>` 안의 태그를 확인해 왔다.

---

## 3. 사용자 흐름과 화면

| 경로 | 역할 | 비고 |
| --- | --- | --- |
| `/` | 홈: 카테고리 3개, 이용 방법, 결과로 보는 것/하지 않는 것, FAQ(+FAQPage JSON-LD) | |
| `/tests/` | 카테고리 목록(상세 카드) | |
| `/tests/{couple,friend,family}/` | 카테고리 소개 + **A의 테스트**(`StartFlow`) → 끝나면 초대 링크 화면 | `generateStaticParams`, `dynamicParams=false` |
| `/invite/#<payload>` | **B 참여**(`InviteFlow`): 링크 검증 → 안내 → 질문 → `/result/#…`로 `router.push` | noindex, sitemap 제외 |
| `/result/#<payload>` | **결과**(`ResultFlow` → `ResultView`). 이 주소가 곧 결과 공유 링크 | noindex, sitemap 제외 |
| `/about/`, `/privacy/`, `/contact/` | 소개·온도 계산 설명, 개인정보 처리방침, 문의 | |
| 그 외 | `global-not-found.tsx` (404, 네 언어 안내) | |
| `/en/…`, `/ja/…`, `/zh/…` | 위 모든 페이지의 영어·일본어·중국어(간체) 판 | 11장 참고 |

진행 순서는 다음과 같다.
1. A가 12문항에 답한다.
2. 초대 링크 `/invite/#{v,c,t,a}`가 만들어지고, 복사·공유 버튼으로 B에게 보낸다.
3. B가 링크를 열고 같은 12문항에 답한다.
4. B의 화면이 `/result/#{v,c,t,a,b}`로 이동한다. B가 이 결과 링크를 A에게 보내야 A도 결과를 본다.

- **진행 중 답 보관**: 진행 중인 답은 `sessionStorage`에 둔다(키는 `rt:a:{slug}:{version}`과 `rt:b:{hash}`). 그래서 새로고침이나 뒤로 가기를 해도 이어진다. 결과 화면에서 뒤로 가면 "이미 답변을 마쳤어요" 화면이 나온다.
- **A의 답 복원**: A의 답은 항상 링크 payload에서 복원한다. 저장소를 믿지 않는다.
- **이름 없음**: 이름 입력은 없다. 결과 화면에는 "초대한 사람 / 초대받은 사람"으로 표시한다.

---

## 4. 데이터 모델과 로직 (`src/lib`, `src/data`)

### 카테고리 데이터: `src/data/categories/{couple,friend,family}.ts`

- 카테고리당 12문항(주제 6개 × 2문항). 질문과 해설은 모두 직접 작성했고, **카테고리끼리 문구가 겹치지 않는 것을 테스트로 강제**한다.
- `Question` 구조: `{ id, topic, text, options: string[4], rule, same, different, scenario?, tip, sameCaution? }`
  - `options`: 한 방향으로 나란히 놓인 4개 선택지. 두 답의 **번호 차이(0~3)**를 거리로 쓴다. 순서는 좋고 나쁨이 아니다.
  - `rule: "match"`: 기대가 맞아야 편한 주제. 온도에 반영되고, 답이 멀면 `scenario`(오해 상황)가 나온다. 반드시 `scenario`가 있어야 한다.
  - `rule: "complement"`: 달라도 괜찮은 주제. 온도에서 빼고, 다르면 "보완되는 차이"로 설명한다.
  - `sameCaution[번호]`: 둘 다 그 선택지를 골랐을 때의 주의점. 이 문항은 "잘 맞는 부분"에서 빠지고 주의점으로 나온다.
- 카테고리 필드: `slug, name, emoji, version, title, description, minutes, topics[{id,name,talk}], questions, summaries{low,middle,high}, defaultTips, defaultTalks`
- **질문이나 선택지 구성을 바꾸면 해당 카테고리의 `version`을 올린다.** 그러면 이전 링크는 "이전 버전의 링크" 오류 화면으로 간다.

### 온도 계산: `src/lib/analysis.ts`

- 온도 = 23 + (match 문항의 평균 가까움 0~1) × 20 → **23.0~43.0℃**, 중간이 **33℃**. 가까움 = 1 − 거리/3.
- 구간(사용자 요청: 33℃ 기준)
  - `low`: 30℃ 미만, 서늘함 ❄️
  - `middle`: 30~36℃ 미만, 미지근함 🌤️
  - `high`: 36℃ 이상, 따뜻함 🔥
  - 경계값은 파일 맨 위 상수 `LOW_BELOW`, `HIGH_FROM`으로 바꾼다.
- `analyze(category, a, b)`가 돌려주는 것: `{ temperature, band, title, summary, strengths(≤4, 거리≤1), differences(≤3, 거리≥2), scenarios(≤4), tips(≥2), talks(2~3) }`. 같은 입력이면 항상 같은 결과다.

### 링크 payload: `src/lib/payload.ts`

- JSON `{ v:1, c:slug, t:version, a:number[12], b?:number[12] }` → UTF-8 → URL-safe Base64. 길이는 초대 링크 약 75자, 결과 링크 약 115자다.
- `decodePayload`의 실패 사유는 5가지다: `missing | malformed | unknown-category | version | answers`. 결과 화면에서 `b`가 없으면 `incomplete`로 처리해 초대 화면으로 안내한다(`LinkError`).
- 길이 상한은 400자, 문자 화이트리스트를 적용한다. payload는 데이터로만 다루고 HTML이나 코드로 해석하지 않는다.
- **인코딩일 뿐 암호화가 아니다.** 이 사실을 사이트 곳곳에 명시해 두었다.

### 그 밖의 모듈

- `progress.ts`: `Progress{phase,index,answers}`와 저장소 값 검증
- `hooks.ts`: `useHydrated`, `useHash`(`useSyncExternalStore`라 서버 렌더에서는 null), `useSessionState`
- `share.ts`: `navigator.share` → 클립보드 → 실패 순으로 대체한다. 실패하면 링크 입력칸을 선택해 직접 복사하도록 안내한다.

### 단위 테스트

`analysis.test.ts`, `payload.test.ts`, `share.test.ts` 세 파일이 데이터 구조, 문구 중복, 온도 경계, 무작위 조합 900개의 모순 여부, 오류 사유를 검사한다.

---

## 5. ⚠️ 반드시 지켜야 할 불변 조건 (개인정보)

**핵심 약속: "답변은 서버나 외부로 전송되지 않는다."** 개인정보 처리방침과 FAQ가 이 약속을 전제로 쓰여 있다. 아래 장치들은 모두 실제 측정으로 누출을 확인한 뒤 넣은 것이니 지우지 말 것.

| 장치 | 위치 | 이유 (측정으로 확인) |
| --- | --- | --- |
| GA `page_location`에서 `#` 뒤 제거: `gtag('config','G-EQ3K3HCXPW',{ page_location: location.href.split('#')[0] })` | `src/components/GoogleTag.tsx` | 받은 태그 원본은 `#답변`까지 포함한 주소를 전송했다 |
| 질문 `<form action="#">` | `src/components/QuizRunner.tsx` | GA4 향상된 측정의 `form_start` 이벤트가 `form_destination`(action이 없으면 현재 주소 전체)을 전송했다 |
| AdSense를 `(content)` 그룹에만 넣음 | `src/components/ContentScripts.tsx` (`(ko)/(content)`·`[lang]/(content)` 레이아웃이 사용) | 초대·결과 주소의 답변을 광고 스크립트가 읽지 못하게 하기 위해 |
| Clarity를 `(content)` 그룹과 404에만 넣음 | `src/components/ClarityTag.tsx` | Clarity는 `#` 포함 주소 전체와 화면 글자를 업로드한다. 주소를 바꾸는 설정이 없다 |
| `data-clarity-mask="true"` | `QuizRunner` form, `ShareButtons` | A가 고른 답과 초대 링크가 Clarity 녹화에 찍히지 않게 하기 위해 |
| `PageLink`(일반 `<a>`, 문서를 새로 불러옴) | Header, Footer, ResultView, LinkError | 결과→홈(광고·Clarity 있음)→뒤로 가기를 했을 때 스크립트가 같은 문서에 남아 결과 주소를 읽는 것을 막는다. `next/link`로 바꾸지 말 것 |
| 초대·결과 화면은 `(content)` 밖에 두기 | `src/app/(ko)/{invite,result}`, `src/app/[lang]/{invite,result}` | 이 두 폴더를 `(content)`로 옮기면 광고·Clarity가 붙는다 |
| OG 태그에 답변을 넣지 않음 | `site.ts`의 `pageMeta` | 모든 페이지가 같은 고정 이미지 `public/og-image.png`를 쓴다 |

### 현재 태그 배치 (배포된 사이트에서 확인함)

| 페이지 | GA | AdSense | Clarity |
| --- | --- | --- | --- |
| 홈, `/tests/`, 카테고리 3개, about, privacy, contact | O | O | O |
| 404 | O | X | O |
| `/invite/`, `/result/` | O (# 제거) | X | X |

- 초대·결과 HTML 안에 Clarity ID 문자열이 보이는 것은 404 화면 데이터가 직렬화되어 들어간 것이다. 실행되는 `<script>` 요소는 없다(요청 0건으로 확인).
- **새 추적·광고 태그를 추가할 때의 절차**: 넣기 → 헤드리스 브라우저로 모든 요청(본문을 압축 해제한 내용까지)에서 payload와 답변 글자를 검색 → 누출되면 차단하거나 초대·결과 화면에서 제외 → 개인정보 처리방침 갱신 → 사용자에게 무엇을 바꿨는지 보고. GA와 Clarity가 모두 이 순서로 처리됐다.

---

## 6. 디자인

- **색**: 따뜻한 계열(브랜드 `#c2410c`, 크림색 배경). 토큰은 `src/app/globals.css`의 `@theme`에 있다.
- **글꼴**(사용자 요청: "둥글고 친근하게")
  - 제목·버튼·숫자: **Jua**. 굵기가 하나뿐이라 CSS에서 `font-weight: 400`으로 고정했다.
  - 본문: **Gowun Dodum**.
  - 둘 다 `next/font/google`로 빌드할 때 내려받아 사이트에 포함한다.
  - Jua에는 ℃ 글자가 없어서, 결과 화면의 큰 숫자는 단위 ℃만 본문 글꼴로 그린다.
- **결과 화면 온도 테마**: 최상위 요소의 `data-temp="low|middle|high"`에 따라 CSS 변수와 `body:has()` 배경이 바뀐다.
  - low: 푸른빛
  - middle: 베이지
  - high: 코랄·붉은빛
  - 온도계 막대에는 33℃ 기준선을 표시한다.
- **문구 원칙**: 낮은 온도도 깎아내리지 않는다("방식이 다를 뿐"). 진단·판정·이별 권유를 하지 않는다. "오락용, 심리 진단 아님" 안내를 결과 화면에 표시한다.
- **OG 이미지**: `public/og-image.png`(1200×630, 살구색 배경, "관계의 온도", 두 얼굴과 온도계 38.5℃). HTML을 헤드리스 Edge로 캡처해 만들었다. 원본 HTML은 저장소에 없으므로, 고치려면 새로 그려서 교체한다.
- **사이트 상단 문구**: 사용자 요청으로 "가입 없이 · 무료 · 링크로 함께하기" 배지를 삭제했다.

---

## 7. 검증 방법 (지금까지 해 온 방식)

1. `npm test` → `npm run lint` → `npm run build`
2. **헤드리스 브라우저 점검**(최근 70항목 통과): `out/`을 로컬 Node 서버로 띄우고, Edge를 CDP(원격 디버깅)로 조작한다. 모바일 375px 기준이다.
   - 정적 페이지: h1, 가로 넘침, 404, sitemap, noindex, AdSense·ads.txt 배치
   - A 흐름: 미답변 안내, 키보드 조작, 새로고침 복원, 초대 링크 생성·복사
   - B 흐름: **별도 브라우저 컨텍스트(시크릿과 동일)**에서 링크로 복원, 결과 이동, 뒤로 가기
   - 친구·가족 흐름, 온도 테마 3종(색이 서로 다른지)
   - 잘못된 링크 10종
   - **모든 네트워크 요청의 URL·헤더·본문에 payload가 없는지**, 외부 요청 호스트 허용 목록, 초대·결과 화면의 외부 요청, 콘솔 오류
3. **Clarity 전용 점검**: `Fetch.requestPaused`로 `*clarity.ms*` 업로드 본문을 가로채 gzip·deflate·brotli를 풀고 payload와 답변 글자를 검색했다.
4. 디자인 변경은 헤드리스 캡처를 직접 열어 눈으로 확인했다.
5. 배포 뒤에는 `curl`로 배포된 주소를 확인했다.

> 브라우저 점검은 이제 저장소의 **`friendship-quiz/scripts/e2e.mjs`**(`npm run build && npm run e2e`, 65항목)에 있다. 임시 폴더의 스크립트는 세션이 끝나면 지워져서 2026-10-21에 옮겼다. Clarity 업로드 본문 검사(`clarity-probe`)와 미리보기 이미지 생성 스크립트는 저장소에 없다(필요하면 7장 설명대로 다시 만든다).

---

## 8. 작업 이력 (커밋 순)

| 커밋 | 내용 |
| --- | --- |
| `6235567` | (기존) 포트폴리오 `index.html` |
| — | 1차 MVP: "우리 사이 테스트"(친구 1종, 한 기기에서 번갈아 답하기). 이후 전면 개편되어 남아 있지 않음 |
| `88b8234` | 「관계의 온도」로 개편: 연인·친구·가족, A→B 초대 링크(fragment payload), 온도 컨셉·테마, 둥근 글꼴, 홈 배지 삭제. `index.html` 삭제 |
| `c0fcb0a` | Cloudflare Pages 404 해결: `wrangler.toml`(`pages_build_output_dir=./out`), 기본 서비스 주소를 pages.dev로 |
| `3519564` | OG 미리보기 이미지와 og/twitter 태그. 초대·결과 페이지 공유 제목 개선 |
| `08452ce` | AdSense 코드(`ca-pub-4035979084834637`)를 `(content)` 그룹에만, `public/ads.txt`, `PageLink`, 개인정보 처리방침 광고 항목 |
| `9bc9e14` | GA4(`G-EQ3K3HCXPW`)를 모든 페이지에. `#` 제거와 `form action="#"`로 누출 차단, 개인정보 처리방침 GA 항목 |
| `a68069d` | Microsoft Clarity(`yxey4l844i`)를 `(content)`와 404에만, 녹화 마스킹, 개인정보 처리방침 Clarity 항목 |

### 기획 출처

사용자가 대화에 첨부한 프롬프트 md 2개가 있다(저장소에는 없음).
1. 「친구 궁합 테스트 웹사이트」
2. 「관계별 궁합 테스트 플랫폼」: 현재 기준 명세. 내용은 A→B fragment 링크, 카테고리별 고유 콘텐츠, 결과 8요소, AdSense 품질 기준, 검증 시나리오 11개다.

여기에 사용자가 추가로 요청한 것은 "관계의 온도" 이름과 33℃ 기준 온도 테마, 둥근 글꼴이다.

---

## 9. 남은 일 · 알려진 이슈

- **문의 이메일 미설정**: `site.ts`의 `contactEmail`이 비어 있어 문의 페이지가 "아직 문의 창구가 마련되지 않았습니다"로 나온다. AdSense 심사에 불리할 수 있다. 사용자가 "나중에 정하기"를 골랐다. 가짜 주소는 넣지 않는다.
- **AdSense**: 사이트 검토를 기다리는 중이다(승인 보장 없음).
  - 유럽 방문자용 동의 창(CMP)은 AdSense 대시보드의 "개인 정보 보호 및 메시지"에서 설정해야 한다. 아직 하지 않았다.
  - 자동 광고를 켜면 질문 선택지나 버튼 근처에 광고가 붙지 않는지 확인해야 한다.
- **결과 화면 광고·Clarity 없음**: 수익과 분석 면에서 손해다. 넣으려면 답변이 Google·Microsoft로 전송된다는 것을 사용자가 받아들이고, 개인정보 처리방침을 고쳐야 한다. 사용자에게 선택지를 안내해 두었지만 아직 답이 없다.
- **확인하지 못한 것**
  - 실제 휴대폰 공유 창
  - 카카오톡 미리보기(캐시가 남으면 카카오 "공유 디버거"로 초기화)
  - 스크린리더 실사용
  - GA·Clarity 대시보드에 데이터가 실제로 쌓이는지
- **DB가 필요한 미구현 기능**(README에 정리)
  - B가 답하면 A에게 자동 알림
  - 결과 복구와 기록 조회
  - 짧은 링크
  - 답을 링크에서 숨기기
  - 통계
- **질문·해설 문구**: 36문항은 AI가 작성했다. 사용자 검토를 권했다.
- **LF/CRLF 경고**: 깃 커밋 때 나오지만 무시해도 된다.

---

## 10. 사용자와 일하는 방식 (관찰된 선호)

- 사용자는 바이브코딩 초보자다. **한국어로 짧고 쉽게** 설명한다.
- **"원인 추측하지 말고 정확히 파악해서 해결"**하기를 원한다. 실제 요청이나 측정으로 근거를 보여 준 뒤 고친다.
- 기능을 요청할 때 "**깃 푸시하고 배포까지**"를 함께 요청하는 편이다. 푸시 전에 테스트·린트·빌드·브라우저 점검을 하고, 푸시 뒤에는 배포된 사이트에서 직접 확인한 결과를 보고한다.
- 받은 코드나 태그를 그대로 넣는 것이 개인정보 약속을 깨면, **바꾼 부분과 이유를 분명히 보고**한다. 지금까지 사용자는 이 방식을 받아들였다.
- 커밋 메시지는 영어로 쓰고, 끝에 `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`를 붙인다.

---

## 11. 다국어 (2026-10-21 추가)

사용자 요청: "외국인 방문이 더 많다 → 영어·일본어·중국어 등 언어 선택". 같은 사용자의 다른 프로젝트(`바이브코딩/menu-recommand`, 별도 저장소)에서 쓴 구조를 그대로 따랐다.

- **주소**: 한국어는 접두어 없이 기존 주소 유지(이미 공유된 링크·AdSense 심사 중인 주소를 깨지 않기 위해). 영어·일본어·중국어 간체는 `/en/` `/ja/` `/zh/`.
- **라우트**: `src/app/(ko)/…`(한국어 루트 레이아웃)와 `src/app/[lang]/…`(다른 언어 루트 레이아웃) 두 갈래가 `src/components/pages/*` 를 함께 쓴다. 루트 레이아웃이 둘이라 404는 `src/app/global-not-found.tsx` + `next.config.ts`의 `experimental.globalNotFound`.
- **문구**: 화면 문구 `src/i18n/ui/{ko,en,ja,zh}.ts`(ko가 기준 타입 `Dict`), 질문·해석 `src/data/categories/{en,ja,zh}/`, 긴 글(홈 FAQ·소개·개인정보·문의)은 각 페이지 컴포넌트 안 언어별 블록. 모든 번역은 AI가 작성 → 원어민 검토 권장.
- **링크 호환**: payload에는 선택지 번호만 있으므로 어느 언어로 만든 링크든 어느 언어 화면에서나 열린다. 그래서 질문 구조는 네 언어가 같아야 한다(`src/i18n/i18n.test.ts`가 검사, 번역에 한글이 남아도 실패).
- **언어 선택**: 헤더 `LanguageSwitcher`. `location.assign`으로 문서를 새로 불러오며 `#`(답변)를 그대로 붙인다. 진행 중 답 저장 키에 언어가 없어 답하다 언어를 바꿔도 이어진다.
- **SEO**: `pageMeta(lang, …)`가 canonical·hreflang(ko·en·ja·zh-Hans·x-default)·og:locale·언어별 og 이미지를 만든다. sitemap도 4개 언어.
- **글꼴**: 일본어 Zen Maru Gothic(일본어 페이지에서만 로드), 중국어는 기기 기본 글꼴, ja·zh는 `word-break: normal`(keep-all이면 줄바꿈 안 됨).
- **폴더 이동 사건**: 2026-10-19에 누군가 `friendship-quiz/`·`HANDOFF.md`·`웹 아이디어.md`를 `바이브코딩/friendship/` 안으로 옮겨 두었다. Cloudflare Root directory가 `friendship-quiz`라 그대로 푸시하면 배포가 깨지므로, 사용자 선택에 따라 원래 위치로 되돌렸다. 저장소 루트의 `.gitignore`(`menu-recommand/`)는 다른 프로젝트 세션이 만든 것으로 커밋하지 않았다.
