import { InvitePage, inviteMeta } from "@/components/pages/FlowPages";

// 주소의 # 뒤에 답변이 있는 화면. 광고·Clarity가 붙지 않도록 (content) 그룹 밖에 둔다.
export const metadata = inviteMeta("ko");

export default function Page() {
  return <InvitePage lang="ko" />;
}
