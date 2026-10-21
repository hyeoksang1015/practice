import { Gowun_Dodum, Jua, Zen_Maru_Gothic } from "next/font/google";
import type { ReactNode } from "react";
import { HTML_LANG, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";
import Footer from "./Footer";
import GoogleTag from "./GoogleTag";
import Header from "./Header";
import "@/app/globals.css";

// 둥글고 친근한 글꼴. 빌드할 때 내려받아 사이트와 함께 제공하므로 글꼴 때문에 외부 서버에 요청하지 않는다.
// Jua·Gowun Dodum은 한글·영문용, Zen Maru Gothic은 일본어용(일본어 페이지에서만 내려받도록 preload를 끈다).
// 중국어는 둥근 간체 글꼴이 마땅치 않아 기기 기본 글꼴을 쓴다(globals.css).
const bodyFont = Gowun_Dodum({ weight: "400", subsets: ["latin"], variable: "--font-body", display: "swap" });
const displayFont = Jua({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const jaFont = Zen_Maru_Gothic({ weight: ["500", "700"], subsets: ["latin"], variable: "--font-ja", display: "swap", preload: false });

// 한국어(app/(ko))와 다른 언어(app/[lang]) 루트 레이아웃이 함께 쓰는 html 껍데기.
export default function RootShell({ lang, children }: { lang: Locale; children: ReactNode }) {
  const t = getDict(lang);
  const fonts = [bodyFont.variable, displayFont.variable, lang === "ja" ? jaFont.variable : ""].join(" ");
  return (
    <html lang={HTML_LANG[lang]} className={`${fonts} h-full antialiased`}>
      {/* eslint-disable-next-line @next/next/no-head-element -- 두 루트 레이아웃이 함께 쓰는 html 껍데기라 app/ 밖에 있을 뿐 루트 레이아웃이다 */}
      <head>
        <GoogleTag />
      </head>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="btn btn-primary sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10">
          {t.nav.skip}
        </a>
        <Header lang={lang} />
        <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:py-14">
          {children}
        </main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
