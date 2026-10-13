import InviteFlow from "@/components/InviteFlow";
import { pageMeta } from "@/config/site";

// 답변은 주소의 # 뒤에만 있어 서버·검색엔진에 전달되지 않는다. 페이지 자체도 색인하지 않는다.
export const metadata = pageMeta(
  // 초대 링크를 메신저에 붙였을 때 받는 사람이 보게 되는 제목과 설명이다.
  "궁합 테스트에 초대받았어요",
  "상대가 먼저 답하고 초대했어요. 같은 질문에 답하면 두 사람의 관계 온도를 바로 볼 수 있어요. 가입 없이 3분이면 됩니다.",
  "/invite/",
  { noindex: true },
);

export default function InvitePage() {
  return <InviteFlow />;
}
