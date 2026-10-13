import type { Metadata } from "next";

// 서비스명·로고·주소·문의처는 여기서만 바꾸면 사이트 전체에 반영된다.
export const site = {
  name: "관계의 온도",
  logoMark: "🌡️",
  description:
    "연인, 친구, 가족과 같은 질문에 각자 답하고 두 사람의 답을 비교해 '관계의 온도'를 확인해 보세요. 내가 먼저 답하고 링크를 보내면 상대가 이어서 답하는, 가입 없는 무료 오락용 테스트입니다.",
  // canonical·sitemap·robots에 쓰는 실제 서비스 주소. 도메인을 바꾸면 여기를 고치거나
  // 빌드 환경 변수 NEXT_PUBLIC_SITE_URL로 덮어쓴다.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://relationship-dbz.pages.dev").replace(/\/$/, ""),
  // 운영자가 채운다. 비워 두면 문의 페이지가 "준비 중"으로 안내한다(가짜 연락처를 넣지 않는다).
  contactEmail: "",
};

// 결과 화면에서 두 사람을 부르는 이름. 링크에 이름을 담지 않으므로 역할로만 구분한다.
export const ROLE_A = "초대한 사람";
export const ROLE_B = "초대받은 사람";

interface MetaOptions {
  absoluteTitle?: boolean;
  // 개인 답변이 담기는 화면(초대·결과)은 검색에 노출하지 않는다.
  noindex?: boolean;
}

export function pageMeta(title: string, description: string, path: string, options: MetaOptions = {}): Metadata {
  const fullTitle = options.absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: options.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    ...(options.noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "ko_KR",
      type: "website",
    },
  };
}
