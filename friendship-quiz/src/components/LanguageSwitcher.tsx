"use client";

import { LOCALES, LOCALE_NAME, href, splitPath, type Locale } from "@/i18n/config";

// 같은 페이지의 다른 언어로 이동한다. 초대·결과 화면은 # 뒤(답변)를 그대로 넘겨야 이어지므로 hash를 붙인다.
// 문서를 새로 불러오는 이동(location.assign)이라 광고·분석 스크립트가 다른 화면의 주소를 보지 않는다(PageLink와 같은 이유).
export default function LanguageSwitcher({ lang, label }: { lang: Locale; label: string }) {
  return (
    <label className="flex min-h-12 items-center gap-1 text-sm font-semibold">
      <span aria-hidden="true">🌐</span>
      <span className="sr-only">{label}</span>
      <select
        value={lang}
        onChange={(e) => {
          const { path } = splitPath(window.location.pathname);
          window.location.assign(href(e.target.value as Locale, path) + window.location.search + window.location.hash);
        }}
        className="min-h-10 cursor-pointer rounded-full border border-line bg-white px-3"
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>
            {LOCALE_NAME[l]}
          </option>
        ))}
      </select>
    </label>
  );
}
