// 사이트 언어. 한국어는 접두어 없이(/tests/), 나머지는 /en/tests/ 처럼 접두어를 붙인다.
// 언어를 늘리려면: LOCALES, src/i18n/ui/<lang>.ts, src/data/categories/<lang>/, 각 페이지의 언어별 본문, public/og-image-<lang>.png 를 추가한다.
export const LOCALES = ["ko", "en", "ja", "zh"] as const;
export type Locale = (typeof LOCALES)[number];
export type PrefixedLocale = Exclude<Locale, "ko">;
export const PREFIXED_LOCALES = LOCALES.filter((l): l is PrefixedLocale => l !== "ko");

// <html lang>·hreflang 값
export const HTML_LANG: Record<Locale, string> = { ko: "ko", en: "en", ja: "ja", zh: "zh-Hans" };
export const OG_LOCALE: Record<Locale, string> = { ko: "ko_KR", en: "en_US", ja: "ja_JP", zh: "zh_CN" };
export const LOCALE_NAME: Record<Locale, string> = { ko: "한국어", en: "English", ja: "日本語", zh: "简体中文" };

export const isLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v);

// 언어별 주소. path는 "/"로 시작하는 한국어 기준 경로다(예: "/tests/couple/").
export function href(lang: Locale, path: string): string {
  return lang === "ko" ? path : `/${lang}${path}`;
}

// 현재 주소에서 언어와 한국어 기준 경로를 분리한다(언어 전환용).
export function splitPath(pathname: string): { lang: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (first && first !== "ko" && isLocale(first)) return { lang: first, path: `/${rest.join("/")}` };
  return { lang: "ko", path: pathname };
}
