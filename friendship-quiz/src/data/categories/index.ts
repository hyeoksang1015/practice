import type { Locale } from "../../i18n/config";
import type { Category } from "../../lib/types";
import { couple } from "./couple";
import { couple as coupleEn } from "./en/couple";
import { family as familyEn } from "./en/family";
import { friend as friendEn } from "./en/friend";
import { family } from "./family";
import { friend } from "./friend";
import { couple as coupleJa } from "./ja/couple";
import { family as familyJa } from "./ja/family";
import { friend as friendJa } from "./ja/friend";
import { couple as coupleZh } from "./zh/couple";
import { family as familyZh } from "./zh/family";
import { friend as friendZh } from "./zh/friend";

// 언어마다 문구만 다르고 구조(질문 id·주제·규칙·선택지 수·버전)는 같다(analysis.test.ts 가 검사).
// 링크에는 선택지 번호만 들어가므로, 한 언어로 만든 링크를 다른 언어 화면에서 열어도 그대로 비교된다.
const BY_LANG: Record<Locale, Category[]> = {
  ko: [couple, friend, family],
  en: [coupleEn, friendEn, familyEn],
  ja: [coupleJa, friendJa, familyJa],
  zh: [coupleZh, friendZh, familyZh],
};

export const categoriesFor = (lang: Locale): Category[] => BY_LANG[lang];
// 한국어(기준 언어) 목록. 슬러그 목록이나 구조 검사에 쓴다.
export const categories = BY_LANG.ko;

export function getCategory(slug: string, lang: Locale = "ko"): Category | undefined {
  return BY_LANG[lang].find((c) => c.slug === slug);
}
