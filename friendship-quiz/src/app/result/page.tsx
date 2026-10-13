import ResultFlow from "@/components/ResultFlow";
import { pageMeta } from "@/config/site";

// 결과는 주소의 # 뒤에 담긴 두 사람의 답으로 브라우저에서만 계산한다. 페이지는 색인하지 않는다.
export const metadata = pageMeta(
  "우리 사이의 온도 결과",
  "두 사람의 답을 비교한 관계의 온도와 해설이 도착했어요. 잘 맞는 부분과 다르게 느낄 수 있는 부분을 함께 확인해 보세요.",
  "/result/",
  { noindex: true },
);

export default function ResultPage() {
  return <ResultFlow />;
}
