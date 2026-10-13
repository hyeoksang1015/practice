import InviteFlow from "@/components/InviteFlow";
import { pageMeta } from "@/config/site";

// 답변은 주소의 # 뒤에만 있어 서버·검색엔진에 전달되지 않는다. 페이지 자체도 색인하지 않는다.
export const metadata = pageMeta(
  "초대받은 테스트 답하기",
  "초대 링크로 받은 궁합 테스트에 답하는 화면입니다. 같은 질문에 답하면 두 사람의 온도를 확인할 수 있습니다.",
  "/invite/",
  { noindex: true },
);

export default function InvitePage() {
  return <InviteFlow />;
}
