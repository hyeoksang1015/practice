import type { Metadata, Viewport } from "next";
import { Geist, Syne } from "next/font/google";
import type { ReactNode } from "react";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/data/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

const title = `${site.name} — ${site.nameKo}`;

export const metadata: Metadata = {
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  // 제안서용 초안이라 검색에 노출하지 않는다.
  robots: { index: false, follow: false },
  openGraph: { type: "website", locale: "ko_KR", siteName: site.name, title, description: site.description },
};

export const viewport: Viewport = { themeColor: "#131313" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={`${geist.variable} ${syne.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-secondary focus:px-4 focus:py-2 focus:text-label-md focus:text-on-secondary">
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main" className="w-full pt-20">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
