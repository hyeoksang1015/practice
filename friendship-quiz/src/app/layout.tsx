import type { Metadata } from "next";
import { Gowun_Dodum, Jua } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/config/site";
import "./globals.css";

// 둥글고 친근한 한글 글꼴. 빌드할 때 내려받아 사이트와 함께 제공하므로 방문자의 브라우저가 외부 서버에 요청하지 않는다.
const bodyFont = Gowun_Dodum({ weight: "400", subsets: ["latin"], variable: "--font-body", display: "swap" });
const displayFont = Jua({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="btn btn-primary sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10">
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:py-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
