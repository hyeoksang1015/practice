import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { categories } from "@/data/categories";
import { HTML_LANG, LOCALES, href } from "@/i18n/config";

export const dynamic = "force-static";

// 언어마다 같은 페이지 목록. 초대(/invite/)와 결과(/result/) 화면은 개인 답변을 다루므로 넣지 않는다.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/tests/", ...categories.map((c) => `/tests/${c.slug}/`), "/about/", "/privacy/", "/contact/"];
  return LOCALES.flatMap((lang) =>
    paths.map((path) => ({
      url: site.url + href(lang, path),
      alternates: { languages: Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], site.url + href(l, path)])) },
    })),
  );
}
