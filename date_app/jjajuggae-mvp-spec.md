# 짜주께 MVP 설계서 (v0.2)

> 아껴주께 브랜드의 두 번째 기능. **오늘의 데이트 성향(기념일·날씨·활동성)을 먼저 고르면**, 그에 맞는 코스 구성을 제안하고 장소를 채운 뒤 **순서와 시간표**를 짜준다.
> Claude Code가 그대로 구현할 수 있도록 작성했다. 구현 순서는 14장 참고.

## 0. v0.1 → v0.2 변경 요약

| 항목 | 변경 |
|---|---|
| 플로우 | `장소 입력 → 짜기`에서 **`성향 선택 → 코스 구성(슬롯) → 짜기`** 로 변경 |
| 신규 | 성향(기념일/날씨/활동성) → 슬롯 템플릿·체류시간·경고 규칙 (9.4~9.5) |
| 신규 | 슬롯별 **근처 후보 추천** API (`/api/places/nearby`) |
| 유지 | 직접 장소 검색/추가, 솔버(순서 최적화), 공유 링크 |
| 원칙 | 솔버는 그대로 **순수 함수**로 두고, 성향 규칙은 별도 모듈(`profile.ts`)에서 입력 보정/경고 생성만 담당 |

## 1. 한 줄 정의

오늘의 기념일 여부·날씨·활동성(정적↔활동적)을 고르면 그에 맞는 코스 구성(카페→식사→산책 등)을 제안하고, 장소를 채우면 이동시간·영업시간을 반영해 **최적 순서와 시간표**를 만들어 공유까지 해주는 웹서비스.

**검증할 가설**
- H1: 사람들은 장소 선택 후 **동선 정리**에 시간을 쓰고, 대신해주면 쓴다.
- H2: **성향을 먼저 고르면** 구성 막막함이 줄어 생성 완료율·공유율이 올라간다. (성향 완료 vs 건너뛰기 그룹 비교로 검증)

## 2. MVP 범위

| 포함 | 제외 (나중에) |
|---|---|
| **성향 선택**: 기념일(없음/생일/기념일), 날씨(맑음/비/더움/추움), 활동성(정적/보통/활동적) | 성향 자동 학습/계정별 저장 (로그인 필요) |
| 성향 기반 **슬롯 템플릿** 제안 (카페/식사/문화/산책/활동) | LLM 기반 분위기·취향 매칭 |
| 슬롯별 **근처 후보 추천**(카카오 카테고리 검색) 또는 직접 검색 | 평점/리뷰 기반 랭킹 (데이터 없음) |
| 출발지, 시작 시간, 이동수단(도보/차) | 대중교통 (v1.1) |
| 장소별 체류시간, 영업 종료 시각 **수동 입력(선택)**, 첫/마지막 핀 | 영업시간 자동 조회 (10장 스파이크 결과에 따라) |
| 최적 순서 + 타임라인, 성향 기반 경고 배지 | 날씨 자동 조회 (v1.1, 기상청 API 검토) |
| 공유 링크, 지도 앱 열기 | 결제, 예약, 다중 일자 코스 |

> **제약**: 평점·분위기 데이터가 없으므로 "추천"은 *후보 제시 + 사용자 선택* 수준이다. 이 한계를 UI 문구에도 반영한다("근처 후보예요").

## 3. 사용자 플로우

1. **[성향]** 한 화면에서 칩 3그룹 선택(기념일/날씨/활동성) + 시작 시간. **"건너뛰기"** 가능(기본값: 없음/맑음/보통)
2. **[코스 구성]** 출발지·이동수단 설정. 성향 기반 **슬롯 리스트**가 미리 채워져 있음(예: 카페 → 문화 → 식사)
   - 슬롯마다 `근처 후보 보기` 또는 `직접 검색`으로 장소 채움
   - 슬롯 추가/삭제/순서 힌트 변경 가능, 템플릿 무시하고 자유 추가도 가능
   - 장소가 2개 이상 채워지면 "짜줘" 활성화
3. **[결과]** 타임라인 + 성향 배지 + 경고. 링크 복사/공유, 지도 열기
4. 공유 링크 진입자는 읽기 전용으로 같은 결과를 본다

마찰 최소화 원칙: 성향 화면은 **10초 이내**로 끝나야 하며, 모든 선택은 탭 한 번, 기본값 제공, 건너뛰기 상시 노출.

## 4. 화면 명세

모바일 우선(폭 360~430px). 3개 화면.

### 4.1 `/` 성향 화면
- 상단: 로고, 한 줄 문구("오늘은 어떤 데이트예요?")
- 칩 그룹 3개(단일 선택)
  - 기념일: `평범한 날` `생일` `기념일(100일 등)`
  - 날씨: `맑음` `비` `더움` `추움`
  - 분위기: `느긋하게(정적)` `적당히` `활기차게(활동적)`
- 시작 시간 선택(기본 14:00)
- CTA: "다음", 보조: "건너뛰기"
- 마지막 선택값은 localStorage에 기억(try/catch, 없어도 정상 동작)

### 4.2 `/plan` 코스 구성 화면
- 상단 요약 배지: 선택한 성향(탭하면 `/`로 돌아가 수정)
- 출발지 검색, 이동수단 토글
- **슬롯 카드 리스트**: 카테고리 아이콘/이름, 권장 체류시간 칩, 상태(비어 있음/채워짐)
  - 비어 있음: `근처 후보 보기`(바텀시트, 후보 5개) / `직접 검색`
  - 채워짐: 장소명·주소, 체류시간 칩, 종료시각 입력(접힘), 핀 토글, 교체/삭제
- `+ 장소 직접 추가`(카테고리 칩 선택은 선택사항, 기본 `custom`)
- 하단 고정 CTA "짜줘"(채워진 장소 2개 미만이면 비활성, 최대 6개)
- 안내 문구: 장소 수 권장치(정적 3, 보통 4, 활동적 5)는 **힌트일 뿐 제한 아님**

### 4.3 `/c/:id` 결과 화면
- 성향 배지(예: `정적 · 비 · 생일`)
- 요약 카드: 총 소요, 총 이동, 종료 예상 시각
- 타임라인: `도착 - 장소명 - 체류 - 이동(분)`
- 경고 배지: 영업 충돌, 대기, 비/더위/추위 시 도보 구간 김·야외 장소, 기념일 식사 **예약 권장**
- 버튼: 링크 복사, 공유(Web Share API), 장소별 지도 열기, "다시 짜기"(값 유지하고 `/plan`으로)

### 4.4 공통
- 로딩/에러/빈 상태 문구 제공(`~주께` 말투, 과하지 않게)
- 푸터: 아껴주께 다른 서비스(골라주께) 링크, 개인정보처리방침

## 5. 아키텍처

- **배포**: Cloudflare Pages(정적 프론트) + Pages Functions(API)
- **언어**: TypeScript 단일(프론트/백엔드/솔버/규칙 공유)
- **프론트**: Vite + React(대체 가능). 화면 간 상태는 React state + `sessionStorage` 백업(try/catch)
- **저장소**: Cloudflare KV(코스 JSON, TTL 90일). 계정 없음
- **외부 API 키**는 Functions 환경변수에만 둔다
- **순수 함수 분리**: `solver.ts`(순서 최적화), `profile.ts`(성향 규칙), `slots.ts`(카테고리 설정)

```
[성향 화면] ─profile─▶ buildSlots(profile) ─▶ [코스 구성 화면]
                                              │ 슬롯별 후보: GET /api/places/nearby ─▶ Kakao Local (카테고리)
                                              │ 직접 검색:   GET /api/places/search ─▶ Kakao Local (키워드)
                                              ▼
                           POST /api/courses {profile, origin, places...}
                              ├─ profile.adjustInput()     체류시간·핀 보정
                              ├─ TravelTimeProvider        이동시간 행렬
                              ├─ solver.solveCourse()      순서 최적화
                              ├─ profile.buildWarnings()   성향 기반 경고
                              └─ KV 저장 → {id, result}
[결과 화면] ◀── GET /api/courses/:id
```

## 6. 디렉터리 구조

```
.
├─ CLAUDE.md
├─ package.json / vite.config.ts / wrangler.toml
├─ src/
│  ├─ main.tsx
│  ├─ pages/ (Profile.tsx, Plan.tsx, Course.tsx)
│  ├─ components/ (ChipGroup, SlotCard, PlaceSearch, NearbySheet, Timeline, ...)
│  ├─ lib/
│  │  ├─ solver.ts / solver.test.ts       # 순서 최적화 (순수)
│  │  ├─ profile.ts / profile.test.ts     # 성향 규칙 (순수)
│  │  ├─ slots.ts                         # 카테고리 설정, 템플릿 테이블
│  │  ├─ time.ts / geo.ts
│  │  └─ travel/ (provider.ts, haversine.ts, kakaoMobility.ts)
│  ├─ types.ts
│  └─ analytics.ts
└─ functions/api/
   ├─ places/ (search.ts, nearby.ts)
   └─ courses/ (index.ts, [id].ts)
```

## 7. API 명세

### `GET /api/places/search?q={query}`
- 카카오 로컬 키워드 검색 프록시, 최대 8개
- 응답: `{ places: [{ id, name, address, category, lat, lng, url }] }`
- 쿼리 1글자 이하는 400. 짧은 TTL(60초) 캐시 허용

### `GET /api/places/nearby?lat=&lng=&category=&weather=&limit=5`
- `category` ∈ {meal, cafe, culture, walk, activity}. 서버가 `slots.ts` 설정으로 카카오 카테고리/키워드 검색으로 변환
- `weather`가 `rain|hot|cold`면 야외 카테고리(`walk`)는 실내 대체 설정으로 조회
- 정렬: 거리 기준 + 세부 카테고리 다양성(같은 세부 카테고리 연속 2개 초과 금지)
- 기준 좌표는 출발지, 또는 이미 채워진 직전 슬롯 장소
- 응답: `{ places: [...] }` (최대 limit개)

### `POST /api/courses`
```json
{
  "profile": { "occasion": "birthday", "weather": "rain", "vibe": "calm" },
  "origin": { "name": "강남역", "lat": 37.498, "lng": 127.027 },
  "startTime": "14:00",
  "mode": "walk",
  "places": [
    {
      "id": "kakao:123", "name": "카페 A", "lat": 37.5, "lng": 127.03,
      "category": "cafe", "stayMin": 60,
      "closeTime": "21:00", "pin": null
    }
  ]
}
```
- `profile`은 선택(생략/건너뛰기 시 `none/clear/balanced`)
- `category` 기본 `custom`, `closeTime`/`openTime`/`pin`은 선택
- 검증: 장소 2~6개, 좌표 범위, stayMin 10~240, mode ∈ {walk, drive}, 자정 넘김 불가
- 응답: `{ id, result }`

### `GET /api/courses/:id`
- `{ input, result, createdAt }`, 없으면 404

## 8. 데이터 모델

시간은 내부적으로 "자정 기준 분".

```ts
type Mode = 'walk' | 'drive';
type Occasion = 'none' | 'birthday' | 'anniversary';
type Weather = 'clear' | 'rain' | 'hot' | 'cold';
type Vibe = 'calm' | 'balanced' | 'active';
type Category = 'meal' | 'cafe' | 'culture' | 'walk' | 'activity' | 'custom';

interface DateProfile { occasion: Occasion; weather: Weather; vibe: Vibe; }

interface Slot {
  id: string;
  category: Category;
  defaultStayMin: number;
  pin?: 'first' | 'last';
  place?: PlaceInput;   // 비어 있으면 솔버 입력에서 제외
}

interface PlaceInput {
  id: string; name: string; lat: number; lng: number;
  category: Category;
  stayMin: number;
  openMin?: number; closeMin?: number;
  pin?: 'first' | 'last';
}

type WarningCode =
  | 'WAIT' | 'CLOSED_CONFLICT'
  | 'LONG_WALK_BAD_WEATHER' | 'OUTDOOR_BAD_WEATHER'
  | 'RESERVE_RECOMMENDED';

interface Stop {
  place: PlaceInput;
  arriveMin: number; startMin: number; leaveMin: number;
  travelFromPrevMin: number;
  warnings: WarningCode[];
}

interface CourseResult {
  profile: DateProfile;
  stops: Stop[];
  totalTravelMin: number;
  endMin: number;
  travelEstimated: boolean;
  feasible: boolean;
}
```

KV: `course:{id}` = `{ input, result, createdAt }`, TTL 90일.

## 9. 핵심 로직

### 9.1 이동시간 (`TravelTimeProvider`)
```ts
interface TravelTimeProvider {
  matrix(points: {lat: number; lng: number}[], mode: Mode): Promise<number[][]>; // 분
}
```
- **MVP 기본(HaversineProvider)**: 직선거리 × 우회계수 / 속도, 올림
  - 도보: 1.3, 80m/분 / 차량: 1.4, 25km/h
  - `travelEstimated = true` → UI "예상" 표기
- 행렬은 (n+1)×(n+1), 0번은 출발지. 이후 공급자 교체는 인터페이스만 지키면 됨

### 9.2 순서 최적화 (`solveCourse`)
일찍 도착하면 열 때까지 대기 가능하므로 **상태별 가장 이른 완료 시각만 유지**하면 최적성이 보존된다.
- 상태: `dp[mask][last]` = mask 방문 후 last에서 끝났을 때 가장 이른 출발 가능 시각
- 초기: `arrive = start + t[0][i+1]`, `begin = max(arrive, openMin_i ?? 0)`, `begin + stay_i <= closeMin_i`이면 `dp[1<<i][i] = begin + stay_i`
- 전이: `dp[mask|1<<j][j] = min(max(dp[mask][i] + t[i+1][j+1], openMin_j) + stay_j)` (종료 제약 만족 시)
- 핀: `first`는 초기 상태에서만, `last`는 `mask|1<<j == full`일 때만 허용
- 결과: `min over last of dp[full][last]`, parent 배열로 경로 복원
- 복잡도 **O(n²·2ⁿ)**, n ≤ 6 즉시, n ≤ 10까지 안전
- 불가능 시 `feasible=false`: 시간창 무시 재계산 후 위반 지점에 `CLOSED_CONFLICT`
- 동률: 이동시간 합 작은 쪽 → 입력 순서 우선(결정적)

### 9.3 시간 유틸
- 입출력 `"HH:mm"`, 내부 분 정수. 자정 넘김은 MVP 미지원(400)

### 9.4 성향 규칙 (`profile.ts`) — 모든 수치는 **초기값, 튜닝 대상**

**활동성(vibe)**
| vibe | 체류시간 배율 | 권장 장소 수 | 슬롯 성격 |
|---|---|---|---|
| calm | ×1.25 | 3 | 카페, 문화(서점·전시), 조용한 산책 |
| balanced | ×1.0 | 4 | 식사, 카페, 문화/산책 |
| active | ×0.8 | 5 | 활동(체험), 식사, 카페, 산책 |

체류시간 = `round5(defaultStay × 배율)`, 10~240으로 clamp.

**날씨(weather)**
| weather | 도보 구간 경고 기준 | 야외 처리 |
|---|---|---|
| clear | 20분 초과 | 제한 없음 |
| hot / cold | 10분 초과 | `walk` 슬롯은 `culture`(실내)로 치환, 야외 장소엔 `OUTDOOR_BAD_WEATHER` |
| rain | 7분 초과 | 위와 동일 |

- 경고 `LONG_WALK_BAD_WEATHER`: `mode=walk`이고 구간 이동시간이 기준 초과일 때
- 경고 `OUTDOOR_BAD_WEATHER`: 날씨가 clear가 아니고 장소 `category=walk`일 때

**기념일(occasion)**
- `birthday` / `anniversary`: 마지막 슬롯을 `meal`로 두고 `pin: 'last'`, 식사 체류 90분
- 마지막 `meal` 장소에 `RESERVE_RECOMMENDED` 경고
- 시작 시간 기본값 힌트 16:00(사용자가 바꾸면 따름)

### 9.5 슬롯 템플릿 (`buildSlots(profile)`)

권장 체류시간(분)은 기본값이며 9.4 배율이 적용된다. `(last)`는 `pin: 'last'`.

| vibe \ occasion | none | birthday / anniversary |
|---|---|---|
| calm | cafe 60 → meal 70 → walk 40 | cafe 60 → culture 60 → meal 90 (last) |
| balanced | meal 70 → cafe 60 → culture 60 | activity 60 → cafe 50 → meal 90 (last) |
| active | activity 90 → meal 70 → cafe 50 → walk 40 | activity 90 → cafe 40 → walk 40 → meal 90 (last) |

- weather ≠ clear면 `walk` → `culture`로 치환(중복 culture는 `cafe`로)
- 템플릿 순서는 **표시용 힌트**이고, 실제 방문 순서는 솔버가 정한다(핀만 강제)

### 9.6 카테고리 설정 (`slots.ts`)

| category | 카카오 조회 | 실내/야외 |
|---|---|---|
| meal | category_group_code `FD6` | 실내 |
| cafe | `CE7` | 실내 |
| culture | `CT1` + 키워드(서점, 전시 등) | 실내 |
| walk | `AT4` + 키워드(공원 등) | 야외 |
| activity | 키워드 목록(방탈출, 보드게임, 볼링, 공방 등) | 대체로 실내 |

키워드/코드는 설정 파일로 분리해 코드 수정 없이 튜닝 가능하게 한다.

## 10. 외부 API 사전 확인 (Phase 0 스파이크, 코딩 전 반나절)

| 확인 항목 | 이유 | 결과에 따른 분기 |
|---|---|---|
| 카카오 로컬/네이버 API의 영업시간 제공 여부 | 없을 가능성이 높음 | 없으면 수동 입력 유지 |
| 카테고리 검색(`category_group_code`) 지원 범위, 반경/정렬/페이지 한도 | `nearby` 구현 가능 여부 | 제한적이면 키워드 검색으로 대체 |
| 응답 데이터 저장·캐싱 허용 범위 | KV 저장 가능 필드 | 불가 시 최소 필드만 저장 |
| 무료 호출 한도, 키/도메인 제한 | 비용·차단 | 레이트리밋 적용 |
| 길찾기 API 제공/비용 | Haversine 대체 여부 | 비용 크면 Haversine 유지 |
| 날씨 소스(기상청 단기예보 등) 이용 약관·상업적 이용 가능 여부 | v1.1 날씨 자동화 | MVP는 수동 선택 유지 |

## 11. 에러·엣지 케이스

- 검색/후보 결과 없음: 안내 문구 + 다른 슬롯/직접 검색 유도
- API 실패: 재시도 버튼
- 같은 장소 중복: 차단 + 토스트
- 인접 구간 이동 60분 초과 또는 도시가 다른 경우: 경고 배지
- `closeMin <= openMin`: 400
- 시작 시간이 모든 종료 시각보다 늦음: `feasible=false`
- 성향 건너뛰기: 기본값 적용, 결과 화면에 성향 배지 미표시
- 기념일인데 사용자가 마지막 슬롯을 식사가 아닌 장소로 바꿈: 핀은 사용자가 지정한 대로 따르고 경고만 생략
- 공유 링크 만료: 404 화면 + "새로 짜기"
- 레이트리밋: IP당 분당 N회

## 12. 이벤트 로깅 (검증용)

| 이벤트 | 시점/속성 |
|---|---|
| `profile_step_view` | 성향 화면 진입 |
| `profile_completed` | 성향 선택 후 다음 (occasion, weather, vibe) |
| `profile_skipped` | 건너뛰기 |
| `slot_nearby_click` | 근처 후보 보기 (category) |
| `slot_filled` | 슬롯 채움 (source: nearby / search, category) |
| `place_added` | 자유 추가 |
| `course_create_click` | "짜줘" 클릭 |
| `course_created` | 성공 (장소 수, mode, feasible, profile 값, profile_skipped 여부) |
| `share_click` / `share_view` | 공유 (view는 referrer 구분) |
| `map_open` | 지도 열기 |
| `return_visit` | 14일 내 재방문(익명 로컬 ID) |

개인 식별 정보는 수집하지 않는다. KV에는 코스 입력값(출발지 좌표 포함)만 저장.

## 13. 코드 컨벤션

- TypeScript strict, ESLint + Prettier **한 가지 스타일로 고정**(세미콜론 사용, 작은따옴표, 2칸 들여쓰기)
- 함수/타입에 TSDoc(설명 / 파라미터 / 반환 / 예외)
- `solver.ts`, `profile.ts`, `time.ts`는 외부 의존성 없는 순수 함수. 부수효과는 `functions/`와 UI에만
- 시크릿은 `.dev.vars`(로컬), Pages 환경변수(배포). 커밋 금지

## 14. 구현 순서 (Claude Code 작업 단위)

| 단계 | 작업 | 완료 조건 |
|---|---|---|
| 0 | 10장 스파이크, 결과를 이 문서에 반영 | 표의 항목 답 확보 |
| 1 | 프로젝트 초기화, Pages+Functions 로컬 실행, CLAUDE.md | `npm run dev` 빈 화면 + health API |
| 2 | `time.ts`, `geo.ts`, `HaversineProvider` + 테스트 | 테스트 통과 |
| 3 | `solver.ts` + 테스트 | 15.1 케이스 통과 |
| 4 | `slots.ts`, `profile.ts`(buildSlots/adjustInput/buildWarnings) + 테스트 | 15.2 케이스 통과 |
| 5 | `/api/places/search`, `/api/places/nearby` | 실제 결과 반환, 날씨별 카테고리 치환 |
| 6 | `POST/GET /api/courses` + KV | curl로 생성→조회, 경고 포함 |
| 7a | 성향 화면 UI | 선택/건너뛰기/기억 동작 |
| 7b | 코스 구성 화면 UI(슬롯, 후보 시트, 핀, 체류시간) | 슬롯 채우고 "짜줘" 가능 |
| 8 | 결과 화면 + 공유 링크 + 경고 배지 | 타임라인, 복사, 404 |
| 9 | 이벤트 로깅, 에러/빈 상태 | 12장 이벤트 확인 |
| 10 | 모바일 QA, 배포 | 실기기 확인 |

## 15. 테스트 케이스

### 15.1 솔버
1. 장소 2개, 제약 없음 → 이동시간 합 최소 순서
2. 장소 4개, 한 곳 `closeMin`이 빨라 먼저 방문해야 함 → 앞으로 이동
3. `pin: first` + `pin: last` 동시 지정 → 핀 준수
4. 오픈 전 도착 → `WAIT` 경고와 대기 반영
5. 어떤 순서로도 불가능 → `feasible=false` + 경고
6. 동일 입력 반복 → 동일 결과(결정성)
7. n=6 최악 케이스 < 50ms

### 15.2 성향 규칙
1. `buildSlots` 3(vibe) × 2(occasion) 조합이 9.5 표와 일치
2. weather=rain일 때 `walk`가 `culture`로 치환되고, 중복 culture는 `cafe`로 치환
3. birthday/anniversary → 마지막 슬롯 `meal` + `pin: last` + 체류 90분
4. 체류시간 배율 적용 시 5분 단위 반올림, 10~240 clamp
5. rain + walk 구간 8분 → `LONG_WALK_BAD_WEATHER`, clear + 15분 → 경고 없음
6. weather≠clear + `category=walk` 장소 → `OUTDOOR_BAD_WEATHER`
7. 기념일 마지막 meal → `RESERVE_RECOMMENDED`
8. profile 생략 → `none/clear/balanced`로 동작하고 경고 없음

## 16. 검증 지표 (출시 후)

| 지표 | 목표(가설용) |
|---|---|
| 성향 단계 완료율 (완료 / 진입) | 70%+ (30% 이상 이탈 시 단계 축소) |
| 성향 완료 그룹 vs 건너뛰기 그룹의 **생성 완료율·공유율 차이** | 완료 그룹이 유의미하게 높을 것 (H2) |
| 슬롯 후보 사용률 (후보로 채운 슬롯 / 전체 채운 슬롯) | 40%+ |
| 코스 생성 완료율 | 방문자 대비 30%+ |
| 공유율 | 생성 대비 20%+ |
| 공유 링크 유입 | 링크당 1명+ |
| 14일 재사용 | 10%+ |

접는/수정 기준
- 성향 단계 이탈 40% 초과 → 선택형(기본 건너뛰기)으로 전환하거나 질문 축소
- 완료 그룹과 건너뛰기 그룹의 공유율 차이가 없음 → H2 기각, 성향 단계 제거 후 v0.1 구조로 복귀
- 후보 사용률 10% 미만 → 후보 품질 부족으로 판단, 직접 검색 중심으로 단순화

## 17. 오픈 이슈

- 영업시간 자동화 여부와 방식 (10장 결과로 결정)
- 후보 추천 품질 개선 방법 (평점 데이터 확보, LLM 분위기 매칭)
- 날씨 자동 조회 시점과 소스
- 대중교통 지원 시점과 공급자
- 성향 누적 학습을 위한 로그인 도입 시점
- 아껴주께 공통 헤더/푸터를 골라주께와 공유할지 여부
