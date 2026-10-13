import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { categories } from "@/data/categories";

export const dynamic = "force-static";

// 초대(/invite/)와 결과(/result/) 화면은 개인 답변을 다루므로 넣지 않는다.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/tests/", ...categories.map((c) => `/tests/${c.slug}/`), "/about/", "/privacy/", "/contact/"];
  return paths.map((path) => ({ url: site.url + path }));
}
