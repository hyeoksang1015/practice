import { ResultPage, resultMeta } from "@/components/pages/FlowPages";
import { langOf } from "@/i18n/params";

// 주소의 # 뒤에 답변이 있는 화면. 광고·Clarity가 붙지 않도록 (content) 그룹 밖에 둔다.
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return resultMeta(await langOf(params));
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  return <ResultPage lang={await langOf(params)} />;
}
