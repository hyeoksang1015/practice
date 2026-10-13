import Link from "next/link";
import type { LinkErrorReason } from "@/lib/payload";

type Reason = LinkErrorReason | "incomplete";

const MESSAGES: Record<Reason, { title: string; body: string }> = {
  missing: {
    title: "링크에 답변 정보가 없어요",
    body: "초대 링크나 결과 링크에서 # 뒤의 내용이 빠져 있어요. 메신저에서 링크가 잘렸을 수 있으니, 보낸 사람에게 전체 링크를 다시 받아 보세요.",
  },
  malformed: {
    title: "링크를 읽을 수 없어요",
    body: "링크가 중간에 잘렸거나 일부 글자가 바뀐 것 같아요. 링크 전체를 복사해서 다시 열어 보세요.",
  },
  "unknown-category": {
    title: "알 수 없는 테스트의 링크예요",
    body: "이 링크가 가리키는 테스트를 찾지 못했어요. 지금 제공하는 테스트 중에서 새로 시작해 보세요.",
  },
  version: {
    title: "이전 버전의 테스트로 만든 링크예요",
    body: "링크를 만든 뒤에 질문 구성이 바뀌어서 이 링크로는 답을 비교할 수 없어요. 번거롭겠지만 테스트를 새로 시작해 주세요.",
  },
  answers: {
    title: "링크의 답변 정보가 올바르지 않아요",
    body: "답변 개수나 값이 테스트와 맞지 않아요. 링크가 수정되었을 수 있으니, 보낸 사람에게 링크를 다시 받아 보세요.",
  },
  incomplete: {
    title: "아직 두 번째 사람이 답하지 않은 링크예요",
    body: "이 링크에는 한 사람의 답만 들어 있어서 결과를 보여 드릴 수 없어요. 초대받은 분이라면 아래 버튼으로 답변을 시작해 주세요.",
  },
};

// 잘못된 초대·결과 링크 안내. 이유를 알려 주고 돌아갈 길을 준다.
export default function LinkError({ reason, inviteHref }: { reason: Reason; inviteHref?: string }) {
  const { title, body } = MESSAGES[reason];
  return (
    <div className="card text-center" role="alert">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-3 leading-7 text-muted">{body}</p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        {inviteHref && (
          <a href={inviteHref} className="btn btn-primary">
            초대받은 테스트 답하기
          </a>
        )}
        <Link href="/tests" className={`btn ${inviteHref ? "btn-ghost" : "btn-primary"}`}>
          테스트 새로 시작하기
        </Link>
        <Link href="/" className="btn btn-ghost">
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
