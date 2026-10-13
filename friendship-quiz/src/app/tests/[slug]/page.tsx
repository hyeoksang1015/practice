import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StartFlow from "@/components/StartFlow";
import { pageMeta } from "@/config/site";
import { categories, getCategory } from "@/data/categories";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tests/[slug]">): Promise<Metadata> {
  const category = getCategory((await params).slug);
  if (!category) return {};
  return pageMeta(`${category.name} 궁합 테스트 - ${category.title}`, category.description, `/tests/${category.slug}/`);
}

export default async function CategoryPage({ params }: PageProps<"/tests/[slug]">) {
  const category = getCategory((await params).slug);
  if (!category) notFound();
  const total = category.questions.length;

  return (
    <div className="space-y-8">
      <div>
        <p className="font-bold text-brand">
          <span aria-hidden="true">{category.emoji}</span> {category.name} 궁합 테스트
        </p>
        <h1 className="mt-1 text-3xl font-bold">{category.title}</h1>
        <p className="mt-3 leading-7 text-muted">{category.description}</p>
        <p className="mt-3 text-sm font-semibold">
          질문 {total}개 · 한 사람당 약 {category.minutes}분 · 가입 없음
        </p>
      </div>

      <StartFlow category={category} />

      <section aria-labelledby="topics-heading">
        <h2 id="topics-heading" className="text-xl font-bold">
          이 테스트에서 살펴보는 주제
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {category.topics.map((t) => (
            <li key={t.id} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold">
              {t.name}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-heading">
        <h2 id="how-heading" className="text-xl font-bold">
          참여 방식
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-muted">
          <li>내가 먼저 질문 {total}개에 답합니다.</li>
          <li>만들어진 초대 링크를 상대에게 메신저로 보냅니다.</li>
          <li>상대가 링크를 열어 같은 질문에 답하면 두 사람의 온도와 해설이 나옵니다.</li>
          <li>상대가 결과 링크를 보내 주면 나도 같은 결과를 볼 수 있습니다.</li>
        </ol>
      </section>

      <section aria-labelledby="limits-heading">
        <h2 id="limits-heading" className="text-xl font-bold">
          결과를 볼 때 알아 두세요
        </h2>
        <ul className="bullets mt-3 text-muted">
          <li>오락과 서로에 대한 이해를 위한 테스트이며, 과학적·임상적 심리 진단이 아닙니다.</li>
          <li>온도는 두 사람이 고른 답의 가까움을 나타낼 뿐, 관계의 좋고 나쁨이나 앞날을 말해 주지 않습니다.</li>
          <li>
            내 답은 초대 링크 안에 담겨 전달됩니다. 서버에 저장되지 않지만 암호화된 것은 아니므로, 링크는 함께할 사람에게만 보내
            주세요.
          </li>
        </ul>
      </section>
    </div>
  );
}
