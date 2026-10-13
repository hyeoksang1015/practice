import CategoryCard from "@/components/CategoryCard";
import { pageMeta } from "@/config/site";
import { categories } from "@/data/categories";

export const metadata = pageMeta(
  "관계별 궁합 테스트 고르기",
  "연인, 친구, 가족 궁합 테스트를 한눈에 비교해 보세요. 테스트마다 어떤 주제를 살펴보는지, 얼마나 걸리는지 안내합니다.",
  "/tests/",
);

export default function TestsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">관계별 궁합 테스트</h1>
      <p className="mt-3 leading-7 text-muted">
        같은 사람이라도 연인에게, 친구에게, 가족에게 기대하는 것은 다릅니다. 그래서 관계마다 질문과 해석을 따로 썼어요. 한 사람이
        먼저 답하고 링크를 보내면 상대가 이어서 답하는 방식이며, 모든 테스트는 오락용이고 가입 없이 이용할 수 있습니다.
      </p>
      <ul className="mt-8 space-y-6">
        {categories.map((c) => (
          <li key={c.slug}>
            <CategoryCard category={c} detailed />
          </li>
        ))}
      </ul>
    </div>
  );
}
