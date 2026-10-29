import { hours } from "@/data/site";

export type BookingForm = {
  company: string;
  bizNo: string;
  manager: string;
  dept: string;
  tel: string;
  email: string;
  eventType: string;
  spaces: string[];
  start: string;
  end: string;
  overnight: boolean;
  visitors: string;
  notes: string;
  agreeRules: boolean;
  agreePrivacy: boolean;
};

export type BookingErrors = Partial<Record<keyof BookingForm | "files", string>>;

export const MAX_UPLOAD = 50 * 1024 * 1024;
export const UPLOAD_EXT = [".pdf", ".zip", ".hwp", ".docx"];

const digits = (s: string) => s.replace(/\D/g, "");
export const isTel = (s: string) => /^01[016789]\d{7,8}$/.test(digits(s));
export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

/** today 는 YYYY-MM-DD. 행사 시작일은 오늘 이후여야 한다. */
export function validateBooking(f: BookingForm, today: string, files: { name: string; size: number }[] = []): BookingErrors {
  const e: BookingErrors = {};
  if (!f.company.trim()) e.company = "기업 / 단체명을 입력해 주세요.";
  if (digits(f.bizNo).length !== 10) e.bizNo = "사업자등록번호 10자리를 입력해 주세요.";
  if (!f.manager.trim()) e.manager = "담당자 성함을 입력해 주세요.";
  if (!isTel(f.tel)) e.tel = "휴대전화 번호를 확인해 주세요. (예: 010-1234-5678)";
  if (!isEmail(f.email)) e.email = "회신받을 이메일 주소를 확인해 주세요.";
  if (!f.eventType) e.eventType = "행사 유형을 선택해 주세요.";
  if (f.spaces.length === 0) e.spaces = "희망 공간을 1개 이상 선택해 주세요.";
  if (!f.start) e.start = "행사 개시일을 선택해 주세요.";
  else if (f.start <= today) e.start = "개시일은 내일 이후로 선택해 주세요.";
  if (!f.end) e.end = "행사 종료일을 선택해 주세요.";
  else if (f.start && f.end < f.start) e.end = "종료일은 개시일과 같거나 이후여야 합니다.";
  if (files.some((x) => !UPLOAD_EXT.some((ext) => x.name.toLowerCase().endsWith(ext)))) e.files = "PDF, ZIP, HWP, DOCX 파일만 첨부할 수 있습니다.";
  else if (files.reduce((s, x) => s + x.size, 0) > MAX_UPLOAD) e.files = "첨부 파일은 합계 50MB 까지 가능합니다.";
  if (!f.agreeRules) e.agreeRules = "대관 규약 동의가 필요합니다.";
  if (!f.agreePrivacy) e.agreePrivacy = "개인정보 수집 및 이용 동의가 필요합니다.";
  return e;
}

const CODE = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** 접수번호 TS-YYYYMMDD-XXXX. 서버가 없어 브라우저에서 만든다. */
export function receiptNo(date: Date, rand: () => number = Math.random) {
  const ymd = kst(date).toISOString().slice(0, 10).replaceAll("-", "");
  const tail = Array.from({ length: 4 }, () => CODE[Math.floor(rand() * CODE.length)]).join("");
  return `TS-${ymd}-${tail}`;
}

/** 한국 시간(UTC+9, 서머타임 없음)으로 옮긴 Date. getUTC* 로 읽는다. */
export const kst = (d: Date) => new Date(d.getTime() + 9 * 3_600_000);

export const todayKst = (d = new Date()) => kst(d).toISOString().slice(0, 10);

export function isOpenNow(d: Date) {
  const k = kst(d);
  const h = k.getUTCHours();
  return k.getUTCDay() !== hours.closedDay && h >= hours.open && h < hours.close;
}

/** 관람일로 고를 수 있는 날인지: 전시 기간 안이고, 오늘 이후이며, 휴관일(월)이 아니다. */
export function isVisitDay(day: string, from: string, to: string, today: string) {
  if (!day || day < from || day > to || day < today) return false;
  return new Date(`${day}T00:00:00Z`).getUTCDay() !== hours.closedDay;
}
