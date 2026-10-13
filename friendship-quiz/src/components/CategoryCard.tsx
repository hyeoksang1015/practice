import Link from "next/link";
import type { Category } from "@/lib/types";

export default function CategoryCard({ category, detailed = false }: { category: Category; detailed?: boolean }) {
  return (
    <article className="card flex h-full flex-col">
      <p className="text-3xl" aria-hidden="true">
        {category.emoji}
      </p>
      <h3 className="mt-2 text-xl font-bold">{category.name} 궁합</h3>
      <p className="mt-1 font-semibold text-brand">{category.title}</p>
      <p className="mt-3 text-sm text-muted">
        질문 {category.questions.length}개 · 한 사람당 약 {category.minutes}분
      </p>
      {detailed && (
        <>
          <p className="mt-3 leading-7 text-muted">{category.description}</p>
          <h4 className="mt-4 text-sm font-bold">살펴보는 주제</h4>
          <ul className="mt-2 flex flex-wrap gap-2 text-sm">
            {category.topics.map((t) => (
              <li key={t.id} className="rounded-full bg-peach px-3 py-1">
                {t.name}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-auto pt-5">
        <Link href={`/tests/${category.slug}`} className="btn btn-primary w-full sm:w-auto">
          {category.name} 테스트 보기
        </Link>
      </div>
    </article>
  );
}
