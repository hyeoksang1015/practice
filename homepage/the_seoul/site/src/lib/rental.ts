import { venueById } from "@/data/site";

export const MIN_DAYS = 30;
export const MAX_DAYS = 120;
/** 하절기(9시간 운영)는 1시간 연장분으로 일일 요율에 10%를 더한다 (시안 계산기 기준). */
export const SUMMER_RATE = 1.1;

export const clampDays = (n: number) => (Number.isFinite(n) ? Math.min(MAX_DAYS, Math.max(MIN_DAYS, Math.round(n))) : MIN_DAYS);

/** 고른 공간들의 일일 요율 합계 × 일수. 모르는 공간 id 는 건너뛴다. */
export function estimate(ids: string[], days: number, summer = false) {
  const base = ids.reduce((sum, id) => sum + (venueById(id)?.daily ?? 0), 0);
  const daily = summer ? Math.round(base * SUMMER_RATE) : base;
  return { daily, total: daily * days };
}

/** 시작일·종료일을 모두 포함한 일수. 날짜가 비었거나 거꾸로면 null. */
export function daysBetween(start: string, end: string) {
  const s = Date.parse(start), e = Date.parse(end);
  if (Number.isNaN(s) || Number.isNaN(e) || e < s) return null;
  return Math.round((e - s) / 86_400_000) + 1;
}
