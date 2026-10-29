// 제안서용 초안. 시안(Stitch)마다 공간 이름·면적·층이 조금씩 달라서 대관 요율표 기준으로 한 곳에 모았다.
// 연락처·사업자 정보는 실제 번호와 겹치지 않게 0 으로 채웠다. 고객사 정보를 받으면 여기만 바꾸면 된다.
export const site = {
  name: "THE SEOULITEUM",
  nameKo: "더 서울라이티움",
  description: "서울숲의 고요한 자연과 거대한 미니멀리즘 건축이 조우하는 복합 문화 예술 공간. 전시, 대관 요율, 실시간 견적, 온라인 대관 신청을 한 곳에서 안내합니다.",
  address: "서울특별시 성동구 서울숲길 32",
  addressDetail: "갤러리아포레 B1 — 3F",
  phone: "02-000-0000",
  rentalPhone: "02-000-0001",
  email: "concierge@example.com",
  bizNo: "000-00-00000",
  mailOrderNo: "제0000-서울성동-0000호",
  coords: `37°32'41.2"N / 127°02'38.9"E`,
};

export const nav = [
  { href: "/", label: "홈", en: "Main" },
  { href: "/spaces/", label: "공간 소개", en: "Spaces & Services" },
  { href: "/rental/", label: "대관 안내", en: "Rental & Rates" },
  { href: "/booking/", label: "대관 신청·문의", en: "Booking & Inquiries" },
];

export const mapLinks = {
  kakao: `https://map.kakao.com/?q=${encodeURIComponent(site.address)}`,
  naver: `https://map.naver.com/p/search/${encodeURIComponent(site.address)}`,
};

/** 관람 시간. 화–일 10:00–20:00, 입장 마감 19:15, 월요일 휴관 (한국 시간 기준). */
export const hours = { open: 10, close: 20, lastEntry: "19:15", closedDay: 1 };

export type VenueId = "g1" | "g2" | "g3" | "atrium" | "g5";

export type Venue = {
  id: VenueId;
  no: string;
  name: string;
  en: string;
  tag: string;
  floor: string;
  area: number;
  pyeong: number;
  ceiling: number;
  capacity: number;
  /** 1일 기본 대관료 (VAT 별도) */
  daily: number;
  image: string;
  desc: string;
};

export const venues: Venue[] = [
  { id: "g1", no: "01", name: "제1전시장", en: "Grand Hall", tag: "Gallery 1 • Grand Hall", floor: "1F", area: 1239, pyeong: 375, ceiling: 8.5, capacity: 1000, daily: 2_000_000, image: "/images/gallery-1.webp", desc: "기둥이 없는 광활한 스팬 구조로 블록버스터 기획전 및 글로벌 브랜드 패션쇼를 완벽히 수용합니다." },
  { id: "g2", no: "02", name: "제2전시장", en: "Monumental Pavilion", tag: "Gallery 2 • Monumental", floor: "1F", area: 1640, pyeong: 496, ceiling: 7.2, capacity: 1400, daily: 2_500_000, image: "/images/gallery-2.webp", desc: "단일 면적으로 최대 규모를 자랑하며, 대형 아트페어와 차량 반입이 가능한 바닥 하중 설계가 적용되었습니다." },
  { id: "g3", no: "03", name: "제3전시장", en: "Media Blackbox", tag: "Gallery 3 • Media Blackbox", floor: "B1", area: 833, pyeong: 252, ceiling: 6.5, capacity: 600, daily: 1_800_000, image: "/images/gallery-3.webp", desc: "완벽한 암전 환경과 돌비 애트모스 기반 음향 제어가 가능하여 미디어아트 및 사운드 스케이프 연출에 최적화되었습니다." },
  { id: "atrium", no: "AT", name: "아트리움", en: "The Atrium", tag: "Central Atrium • Void", floor: "1F", area: 234, pyeong: 71, ceiling: 12, capacity: 200, daily: 1_000_000, image: "/images/atrium.webp", desc: "수직적 개방감과 조각적 계단이 어우러져 오프닝 리셉션 및 브랜드 VIP 칵테일 파티의 독보적 무대를 완성합니다." },
  { id: "g5", no: "05", name: "제5전시장", en: "Forest Pavilion", tag: "Gallery 5 • Forest Pavilion", floor: "2F", area: 745, pyeong: 225, ceiling: 6.8, capacity: 500, daily: 2_000_000, image: "/images/gallery-5.webp", desc: "서울숲의 사계절 풍경이 통창을 통해 투영되는 독창적 갤러리로, 브랜드 팝업스토어 및 프라이빗 론칭 행사에 선호됩니다." },
];

export const venueById = (id: string) => venues.find((v) => v.id === id);

export const exhibition = {
  badge: "Grand Exhibition",
  where: "Gallery 1 & Atrium",
  title: "Silence & Void: 여백과 공명",
  desc: "세계적 미니멀리즘 거장 7인의 대형 장소특정적 인스톨레이션. 8.5미터 층고의 웅장한 침묵 속에서 빛과 소리의 파동을 경험하는 공감각적 기획전.",
  start: "2026-11-10",
  end: "2027-02-28",
  maxTickets: 6,
};

export type Program = {
  id: string;
  date: string;
  time: string;
  category: string;
  title: string;
  desc: string;
  seats: number;
  note: string;
  /** 초청 코드가 있어야 신청할 수 있는 프로그램 */
  invite?: boolean;
  image: string;
};

export const programs: Program[] = [
  { id: "talk", date: "2026-11-21", time: "15:00", category: "Talk & Philosophy", title: "아티스트 토크: 텅 빈 공간의 파동", desc: "조각가와 건축가가 나누는 공간의 침묵과 물질성의 경계. 전시 연계 특별 심포지엄.", seats: 80, note: "정원 80명 한정", image: "/images/program-talk.webp" },
  { id: "gala", date: "2026-12-04", time: "19:30", category: "Nocturne Gala", title: "VIP Nocturne Preview Gala", desc: "폐관 후 어둠 속에서 펼쳐지는 특별 야간 도슨트 투어와 컬렉터스 샴페인 리셉션.", seats: 120, note: "VIP 패스 소지자 전용", invite: true, image: "/images/program-gala.webp" },
  { id: "sound", date: "2026-12-12", time: "14:00", category: "Sound Installation", title: "공감각 사운드스케이프 랩", desc: "제3전시장의 다채널 스피커 시스템을 활용한 앰비언트 사운드 디자인 및 오디오 비주얼 워크숍.", seats: 24, note: "정원 24명 한정", image: "/images/program-sound.webp" },
];

export type Floor = { id: "3F" | "2F" | "1F" | "B1"; title: string; sub: string; diagram: string; desc: string; image: string; specs: [string, string][] };

export const floors: Floor[] = [
  { id: "3F", title: "Penthouse Sky Lounge & Private Salon", sub: "VIP Patron Reception • Seoul Forest Open View Terrace", diagram: "3F • SKY SALON", image: "/images/floor-3f.webp", desc: "서울숲 수목을 파노라마로 조망하는 프라이빗 펜트하우스. 최고급 가구와 전문 와인 셀러, 비공개 컬렉터 네트워킹 및 VIP 애프터 파티를 위한 독립된 공간을 제공합니다.", specs: [["전용 면적", "620㎡ (테라스 포함)"], ["적정 수용", "80 — 150명"], ["설비", "전용 바, 프라이빗 룸, 하이엔드 사운드"]] },
  { id: "2F", title: "Forest Pavilion (제5전시장)", sub: "Natural Light Chamber • Sculpture Garden", diagram: "2F • FOREST PAVILION", image: "/images/floor-2f.webp", desc: "자연 채광이 투과되는 통창 갤러리와 야외 조각 정원이 연계된 공간. 조절 가능한 뮤지엄 조명 시스템과 전동 차광 블라인드를 갖췄습니다.", specs: [["전용 면적", "745㎡"], ["천장고", "6.8M"], ["설비", "전동 차광 블라인드, 항온항습 공조기"]] },
  { id: "1F", title: "Grand Atrium (제1·제2전시장 & 아트리움)", sub: "Flagship Exhibition • 8.5M Mega Ceiling Height", diagram: "1F • GRAND ATRIUM (MAIN)", image: "/images/floor-1f.webp", desc: "서울라이티움의 시그니처 층. 중앙 분할 가벽 시스템을 통해 제1전시장과 제2전시장으로 독립 운영하거나 하나의 초대형 복합 아레나로 통합 활용할 수 있습니다.", specs: [["전용 면적", "3,113㎡ (통합 사용 시)"], ["천장고 / 하중", "8.5M / 1.5t/㎡ 고하중 바닥"], ["특화", "5톤 대형 리프트 직통 연결"]] },
  { id: "B1", title: "Black Box & Sound Lab (제3전시장)", sub: "Acoustic Immersion • Pitch-Black Sensory Experience", diagram: "B1 • BLACK BOX & LAB", image: "/images/floor-b1.webp", desc: "완벽한 빛 차단과 전문 방음 설비가 집약된 미디어아트 전용 블랙박스. 인터랙티브 센서, 공간 음향, 초고화질 프로젝션 맵핑 연출에 이상적입니다.", specs: [["전용 면적", "833㎡"], ["음향 스펙", "STC 65 차음 등급, Dolby Atmos 설계"], ["특화", "완전 암전 제어 시스템"]] },
];

export const techRates = [
  { name: "상주 음향/조명 감독", desc: "전문 오퍼레이터 현장 상주 (1일/8시간)", price: 450_000, unit: "일" },
  { name: "중앙 미디어 월 가동", desc: "초고해상도 8K LED Wall 시스템 일체", price: 1_500_000, unit: "일" },
  { name: "전시 전문 경호·도슨트 관리", desc: "관람객 동선 및 작품 안전 전담 (1인 기준)", price: 220_000, unit: "인·일" },
  { name: "철수 전용 특수 청소 패키지", desc: "바닥 복원 및 산업 폐기물 수거 처리", price: 600_000, unit: "회" },
];

export const eventTypes = [
  { value: "브랜드 팝업스토어", desc: "신제품 런칭, 플래그십 체험존" },
  { value: "기획전시 & 아트페어", desc: "미술, 조형, 미디어 아트 큐레이션" },
  { value: "기업 행사 / 컨퍼런스", desc: "포럼, 서밋, 키노트 프리젠테이션" },
  { value: "CF · 룩북 영상 촬영", desc: "광고, 뮤직비디오, 매거진 화보" },
  { value: "공연 쇼케이스 / VIP 갈라", desc: "프라이빗 옥션, 럭셔리 갈라, 프레스 쇼케이스" },
];

export const visitorRanges = ["500명 미만", "500 ~ 1,000명", "1,000 ~ 3,000명", "3,000명 이상"];

export const rentalFaq = [
  { q: "30일 미만 단기 대관이나 팝업 행사도 가능한가요?", a: "정기 대관은 전시의 완결성과 관람객 몰입도를 위해 최소 30일을 원칙으로 운영합니다. 단, 브랜드 아트 팝업, 프라이빗 론칭 쇼 등 30일 미만의 특별 프로젝트는 정기 일정 공백기에 큐레이션 심의위원회의 승인을 거쳐 예외적으로 진행될 수 있으니 대관 사무국으로 별도 문의 바랍니다." },
  { q: "전시 설치(준비) 및 철수 기간의 대관료는 어떻게 산정되나요?", a: "전시 설치 및 철수 기간은 기본 전시대관료의 50% 감면율이 적용됩니다. 단, 정규 대관 계약 시 사전에 합의된 설치/철수 일정에 한하며, 사전 승인 없는 초과 작업 시간은 추가대관료 규정(3시간 단위)이 적용됩니다." },
  { q: "대관 계약금 및 잔금 납부 일정과 보증금 정책은 어떻게 되나요?", a: "대관 승인 후 7일 이내 계약금(총 대관료의 30%)을 납부하며, 사용 개시 14일 전까지 잔금 70% 및 원상복구 예치 보증금(총 대관료의 10%)을 완납해야 합니다. 보증금은 철수 및 원상복구 검수 완료 후 14일 이내에 정산 환불됩니다." },
  { q: "전시장 내 식음료(F&B) 케이터링이나 VIP 리셉션 진행이 가능한가요?", a: "본 전시 구역에서는 미술품 보존 및 화재 예방 규정상 음식물 반입이 제한됩니다. 단, 아트리움 및 라운지 공간을 연계한 핑거푸드 형태의 VIP 케이터링은 공식 협력 업체를 통해 사전 승인 후 진행하실 수 있습니다." },
];

export const regulations = [
  { title: "대관 승인 심사 기준 및 자격 요건", items: ["큐레이토리얼 위원회는 공공성, 예술성, 기획의 독창성 및 브랜드 적합도를 평가하여 대관을 승인합니다.", "종교적 포교 목적, 정치적 집회, 불특정 다수에게 안전 위험을 초래할 우려가 있는 행사는 심의에서 배제됩니다.", "신청 주관사는 사업자등록증 또는 법인 인감증명서를 구비한 적격 법인이어야 하며, 결격 사유가 없을 시 48시간 이내 정식 승인 통보서를 발송합니다."] },
  { title: "계약금, 잔금 납부 및 취소 위약금 규정", items: ["승인일로부터 7일 이내에 총 대관료의 30%를 계약금으로 예치하여야 예약이 확정됩니다.", "잔금 70% 및 원상복구 예치 보증금(총액의 10%)은 사용 개시일 14일 전까지 전액 완납되어야 합니다.", "사용 개시 60일 전 취소 시 계약금 50% 반환, 30일 전 취소 시 계약금 전액 몰취, 14일 전 취소 시 총 대관료의 80% 위약금이 부과됩니다."] },
  { title: "구조물 반입·반출 및 원상 복구 의무", items: ["모든 하역 작업은 B2 화물 하역 전용 도크를 통해 진행되며, 바닥 보양재 사전 시공이 의무화됩니다.", "벽면 타공, 도색, 특수 앵커 설치 시 사전에 테크니컬 매니저의 도면 승인을 받아야 하며, 행사 종료 익일 06:00까지 원형으로 복구되어야 합니다.", "미복구 또는 훼손 발견 시 원상복구 보증금에서 실비 차감 후 잔액이 반환됩니다."] },
  { title: "소방 안전 및 다중 밀집 관리 수칙", items: ["방염 필증이 첨부되지 않은 목재 및 가연성 자재의 반입은 소방법에 의거 전면 금지됩니다.", "동시 체류 인원 1,000명 초과 예상 시 전문 안전 경호 인력을 50인당 1명 이상 상시 배치하여야 합니다."] },
];

export const bookingFaq = [
  { tag: "사전 현장 답사", q: "신청 전 실제 전시장 답사가 가능한가요?", a: "네, 가능합니다. 온라인 신청서를 접수하시거나 대관 사무국으로 사전 예약 후 평일 10:00~17:00 사이에 전문 매니저의 인솔 하에 상세 투어가 진행됩니다." },
  { tag: "대형 화물 차량 반입", q: "5톤 또는 11톤 트럭 진입이 지원되나요?", a: "B2층 전용 하역장은 11톤 윙바디 차량의 직진 진입 및 회차 공간을 보유하고 있습니다. 최대 적재 5톤 화물 엘리베이터가 각 전시관으로 바로 연결됩니다." },
  { tag: "케이터링 및 주류 반입", q: "F&B 케이터링 및 샴페인 리셉션이 허용되나요?", a: "지정된 라운지 및 아트리움 구역에서 스탠딩 칵테일 및 케이터링이 가능합니다. 단, 메인 전시장 내 오픈 화기 사용은 엄격히 제한되며 사전 위생/소방 허가가 필요합니다." },
  { tag: "주차 및 발렛 파킹", q: "관람객 및 VIP 주차 지원 대수는 어떻게 되나요?", a: "지하 자주식 주차장에 180대를 동시 수용할 수 있습니다. 행사 주최사 전용 무료 주차권 및 VIP 발렛 서비스 연계가 가능합니다." },
];

export const won = (n: number) => `₩ ${n.toLocaleString("ko-KR")}`;
