import type { Metadata } from "next";
import { HTML_LANG, LOCALES, OG_LOCALE, href, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";

// 로고·주소·광고 ID·문의처는 여기서만 바꾸면 사이트 전체에 반영된다. 사이트 이름·설명은 언어별 사전(src/i18n/ui)에 있다.
export const site = {
  logoMark: "🌡️",
  // canonical·sitemap·robots에 쓰는 실제 서비스 주소. 도메인을 바꾸면 여기를 고치거나
  // 빌드 환경 변수 NEXT_PUBLIC_SITE_URL로 덮어쓴다.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://relationship-dbz.pages.dev").replace(/\/$/, ""),
  // Google AdSense 게시자 ID(공개 값). public/ads.txt 에도 같은 번호가 들어 있다.
  adsenseClient: "ca-pub-4035979084834637",
  // 운영자가 채운다. 비워 두면 문의 페이지가 "준비 중"으로 안내한다(가짜 연락처를 넣지 않는다).
  contactEmail: "",
};

// 링크를 메신저·SNS에 붙였을 때 보이는 미리보기 이미지(1200×630). 언어마다 글자만 다른 이미지를 쓴다.
// 모든 페이지가 같은 이미지를 쓰며, 개인 답변은 이미지나 메타 태그에 들어가지 않는다.
const SHARE_IMAGE: Record<Locale, string> = {
  ko: "/og-image.png",
  en: "/og-image-en.png",
  ja: "/og-image-ja.png",
  zh: "/og-image-zh.png",
};

// 루트 레이아웃 공통 메타데이터(제목 기본값·설명).
export function rootMeta(lang: Locale): Metadata {
  const t = getDict(lang).site;
  return { metadataBase: new URL(site.url), title: t.name, description: t.description };
}

interface MetaOptions {
  absoluteTitle?: boolean;
  // 개인 답변이 담기는 화면(초대·결과)은 검색에 노출하지 않는다.
  noindex?: boolean;
}

// path는 한국어 기준 경로("/tests/")다. 언어별 주소와 hreflang(검색엔진용 언어별 주소)을 함께 만든다.
export function pageMeta(lang: Locale, title: string, description: string, path: string, options: MetaOptions = {}): Metadata {
  const t = getDict(lang).site;
  const fullTitle = options.absoluteTitle ? title : `${title} | ${t.name}`;
  const url = href(lang, path);
  const image = { url: SHARE_IMAGE[lang], width: 1200, height: 630, alt: t.shareImageAlt };
  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], href(l, path)])), "x-default": path },
    },
    ...(options.noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: t.name,
      locale: OG_LOCALE[lang],
      type: "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}
