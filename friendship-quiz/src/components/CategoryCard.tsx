import Link from "next/link";
import { href, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";
import type { Category } from "@/lib/types";

interface Props {
  category: Category;
  lang: Locale;
  detailed?: boolean;
}

export default function CategoryCard({ category, lang, detailed = false }: Props) {
  const t = getDict(lang).card;
  return (
    <article className="card flex h-full flex-col">
      <p className="text-3xl" aria-hidden="true">
        {category.emoji}
      </p>
      <h3 className="mt-2 text-xl font-bold">{t.title(category.name)}</h3>
      <p className="mt-1 font-semibold text-brand">{category.title}</p>
      <p className="mt-3 text-sm text-muted">{t.meta(category.questions.length, category.minutes)}</p>
      {detailed && (
        <>
          <p className="mt-3 leading-7 text-muted">{category.description}</p>
          <h4 className="mt-4 text-sm font-bold">{t.topics}</h4>
          <ul className="mt-2 flex flex-wrap gap-2 text-sm">
            {category.topics.map((topic) => (
              <li key={topic.id} className="rounded-full bg-peach px-3 py-1">
                {topic.name}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-auto pt-5">
        <Link href={href(lang, `/tests/${category.slug}/`)} className="btn btn-primary w-full sm:w-auto">
          {t.cta(category.name)}
        </Link>
      </div>
    </article>
  );
}
