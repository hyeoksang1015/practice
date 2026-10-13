import ResultFlow from "@/components/ResultFlow";
import { pageMeta } from "@/config/site";

// 결과는 주소의 # 뒤에 담긴 두 사람의 답으로 브라우저에서만 계산한다. 페이지는 색인하지 않는다.
export const metadata = pageMeta(
  "궁합 테스트 결과",
  "두 사람의 답을 비교한 관계의 온도와 해설을 보여 주는 화면입니다.",
  "/result/",
  { noindex: true },
);

export default function ResultPage() {
  return <ResultFlow />;
}
