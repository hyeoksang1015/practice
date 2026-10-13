# 관계의 온도

연인·친구·가족이 같은 질문에 각자 답하고, 두 사람의 답을 비교해 "관계의 온도"와 해설을 보여 주는 오락용 테스트 사이트입니다.
Next.js(정적 내보내기) + TypeScript + Tailwind CSS로 만들었고, **서버·데이터베이스·회원 가입이 없습니다.**

## 사용 흐름

1. A가 관계(연인/친구/가족)를 고르고 12개 질문에 답한다.
2. 초대 링크(`/invite/#…`)가 만들어진다. A가 이 링크를 B에게 보낸다.
3. B가 링크를 열어 같은 질문에 답한다.
4. B의 화면이 결과(`/result/#…`)로 이동한다. 이 주소를 A에게 보내면 A도 같은 결과를 본다.

## DB 없이 동작하는 방식과 한계

- A의 답은 주소의 `#` 뒷부분에 `{ v, c(카테고리), t(테스트 버전), a(선택지 번호 배열) }`를 URL-safe Base64로 담아 전달합니다. 결과 링크에는 `b`가 추가됩니다. 질문·해설은 넣지 않으며 길이는 약 75~115자입니다.
- `#` 뒤의 내용은 브라우저가 서버로 보내지 않으므로 답변이 서버 로그에 남지 않습니다.
- **인코딩일 뿐 암호화가 아닙니다.** 링크를 가진 사람은 답을 볼 수 있습니다. 그래서 링크에 이름 등 개인정보를 넣지 않고, 민감한 질문을 만들지 않습니다.
- 진행 중인 답은 새로고침에 대비해 `sessionStorage`에만 임시로 둡니다(탭을 닫으면 삭제).
- 링크를 잃어버리면 결과를 복구할 수 없습니다. A는 B가 결과 링크를 보내 줘야 결과를 볼 수 있습니다.
- 질문 구성을 바꾸면 해당 카테고리의 `version`을 올려야 합니다. 이전 버전으로 만든 링크는 "이전 버전의 링크" 안내 화면으로 갑니다.

### 서버와 DB가 필요해지는 기능

| 기능 | 이유 |
| --- | --- |
| B가 답하면 A에게 자동으로 결과 알림·표시 | 두 기기가 주고받을 공통 저장소가 필요 |
| 링크 분실 후 결과 복구, 지난 결과 목록 | 결과를 서버에 저장하고 사용자를 식별해야 함 |
| 짧은 링크, 링크 만료·삭제 | 링크와 답을 서버에서 대응시켜야 함 |
| 답을 링크 받은 사람이 해석하지 못하게 하기 | 답을 링크가 아닌 서버에 보관해야 함 |
| 참여자 수·평균 온도 같은 통계 | 결과를 모아 둘 저장소가 필요 |

이런 기능을 넣으면 개인정보 처리방침(`src/app/privacy/page.tsx`)도 함께 고쳐야 합니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # payload·분석·공유 로직 단위 테스트
npm run lint
npm run build    # out/ 폴더에 정적 사이트 생성
```

## 배포 (Cloudflare)

Cloudflare Pages에 GitHub 저장소를 연결해 배포합니다(현재 주소: https://relationship-dbz.pages.dev). `main` 브랜치에 푸시할 때마다 자동으로 다시 배포됩니다.

| Pages 빌드 설정 | 값 |
| --- | --- |
| Root directory (루트 디렉터리) | `friendship-quiz` |
| Build command | `npm run build` |
| Build output directory | `out` (`wrangler.toml`의 `pages_build_output_dir`가 지정) |

`npm run build`가 만드는 `out/` 폴더가 사이트 전체입니다. 출력 디렉터리가 `out`이 아니면 소스 폴더가 그대로 올라가서 첫 화면이 404가 됩니다.

### 주의

- 서비스 주소는 `src/config/site.ts`의 `url`에 들어 있습니다. 도메인을 연결하면 그 값을 바꾸거나 빌드 환경 변수 `NEXT_PUBLIC_SITE_URL`을 설정하세요(canonical·sitemap·robots에 쓰입니다).
- 도메인 최상위(`/`)에 배포하는 것을 전제로 합니다. 하위 경로에 올리려면 `next.config.ts`에 `basePath`를 추가해야 합니다.
- 글꼴(Jua, Gowun Dodum)은 빌드할 때 Google Fonts에서 내려받아 사이트에 포함합니다. 빌드 환경에 인터넷 연결이 필요합니다.

## 광고 (Google AdSense)

- AdSense 코드는 `src/app/(content)/layout.tsx` 한 곳에서 넣으며, `(content)` 폴더 안의 페이지(홈, 테스트 소개, 소개·개인정보·문의)에만 들어갑니다. 게시자 ID는 `src/config/site.ts`와 `public/ads.txt`에 있습니다.
- **초대(`/invite/`)·결과(`/result/`)·404 화면에는 넣지 않습니다.** 초대·결과 주소의 `#` 뒤에는 답변이 있어서, 광고 스크립트가 그 주소를 읽지 못하게 분리했습니다. 이 화면들을 `(content)` 폴더로 옮기면 개인정보 처리방침의 설명과 어긋납니다.
- 같은 이유로 헤더·푸터·결과 화면의 링크는 `next/link` 대신 `PageLink`(문서를 새로 불러오는 링크)를 씁니다.
- 광고를 실제로 배치할 때는 선택지·다음 버튼과 붙지 않게 하고, 광고·추적 방식이 바뀌면 `src/app/(content)/privacy/page.tsx`도 함께 고칩니다.

## 자주 고치는 곳

| 바꾸고 싶은 것 | 파일 |
| --- | --- |
| 서비스명, 로고, 문의 이메일 | `src/config/site.ts` |
| 질문, 선택지, 해석 문구 | `src/data/categories/{couple,friend,family}.ts` |
| 새 관계 유형 추가 | `src/data/categories/`에 파일을 만들고 `index.ts`의 목록에 추가 |
| 온도 범위·구간 기준(33℃, 30℃, 36℃) | `src/lib/analysis.ts` 상단 상수 |
| 온도별 결과 화면 색 | `src/app/globals.css`의 `[data-temp="…"]` |
| 링크 형식·검증 | `src/lib/payload.ts` |

### 질문 데이터 규칙

- 선택지 4개는 한 방향으로 나란히 놓습니다(번호 차이가 두 답의 거리).
- `rule: "match"`는 기대가 맞아야 편한 주제로, 온도에 반영되고 답이 멀면 `scenario`(오해 상황)가 나옵니다.
- `rule: "complement"`는 달라도 괜찮은 주제로, 온도에 넣지 않습니다.
- `sameCaution`은 둘 다 그 선택지를 골랐을 때의 주의점입니다(같은 답이 늘 좋은 것은 아님).
