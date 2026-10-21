import CategoryCard from "@/components/CategoryCard";
import { pageMeta } from "@/config/site";
import { categoriesFor } from "@/data/categories";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";

export function testsMeta(lang: Locale) {
  const t = getDict(lang).testsPage;
  return pageMeta(lang, t.metaTitle, t.metaDescription, "/tests/");
}

export default function TestsPage({ lang }: { lang: Locale }) {
  const t = getDict(lang).testsPage;
  return (
    <div>
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <p className="mt-3 leading-7 text-muted">{t.intro}</p>
      <ul className="mt-8 space-y-6">
        {categoriesFor(lang).map((c) => (
          <li key={c.slug}>
            <CategoryCard category={c} lang={lang} detailed />
          </li>
        ))}
      </ul>
    </div>
  );
}
