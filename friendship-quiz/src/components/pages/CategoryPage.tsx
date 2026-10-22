import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StartFlow from "@/components/StartFlow";
import { pageMeta } from "@/config/site";
import { categories, categoriesFor, getCategory } from "@/data/categories";
import { href, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";

export const categoryParams = () => categories.map((c) => ({ slug: c.slug }));

export function categoryMeta(lang: Locale, slug: string): Metadata {
  const category = getCategory(slug, lang);
  if (!category) return {};
  const t = getDict(lang).categoryPage;
  return pageMeta(lang, t.metaTitle(category.name, category.title), category.description, `/tests/${category.slug}/`);
}

export default function CategoryPage({ lang, slug }: { lang: Locale; slug: string }) {
  const category = getCategory(slug, lang);
  if (!category) notFound();
  const t = getDict(lang).categoryPage;
  const total = category.questions.length;
  // 앞 세 주제에서 첫 질문 하나씩: 어떤 질문을 하는 테스트인지 시작 전에 보여 준다.
  const samples = category.topics.slice(0, 3).flatMap((tp) => category.questions.find((q) => q.topic === tp.id) ?? []);

  return (
    <div className="space-y-8">
      <div>
        <p className="font-bold text-brand">
          <span aria-hidden="true">{category.emoji}</span> {t.badge(category.name)}
        </p>
        <h1 className="mt-1 text-3xl font-bold">{category.title}</h1>
        <p className="mt-3 leading-7 text-muted">{category.description}</p>
        <p className="mt-3 text-sm font-semibold">{t.meta(total, category.minutes)}</p>
      </div>

      <StartFlow category={category} lang={lang} />

      <section aria-labelledby="topics-heading">
        <h2 id="topics-heading" className="text-xl font-bold">
          {t.topicsTitle}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {category.topics.map((topic) => (
            <li key={topic.id} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold">
              {topic.name}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sample-heading">
        <h2 id="sample-heading" className="text-xl font-bold">
          {t.sampleTitle}
        </h2>
        <ul className="bullets mt-3 text-muted">
          {samples.map((q) => (
            <li key={q.id}>{q.text}</li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-muted">{t.sampleNote(total)}</p>
      </section>

      <section aria-labelledby="how-heading">
        <h2 id="how-heading" className="text-xl font-bold">
          {t.howTitle}
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-muted">
          {t.howSteps(total).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="limits-heading">
        <h2 id="limits-heading" className="text-xl font-bold">
          {t.limitsTitle}
        </h2>
        <ul className="bullets mt-3 text-muted">
          {t.limits.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <Link href={href(lang, "/about/")} className="text-link mt-3 inline-flex min-h-12 items-center">
          {t.aboutLink}
        </Link>
      </section>

      <section aria-labelledby="others-heading">
        <h2 id="others-heading" className="text-xl font-bold">
          {t.othersTitle}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {categoriesFor(lang)
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <li key={c.slug}>
                <Link href={href(lang, `/tests/${c.slug}/`)} className="btn btn-ghost">
                  <span aria-hidden="true">{c.emoji}</span> {t.badge(c.name)}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
