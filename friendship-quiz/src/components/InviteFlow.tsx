"use client";

import { useRouter } from "next/navigation";
import { useHash, useSessionState } from "@/lib/hooks";
import { decodePayload, encodePayload } from "@/lib/payload";
import { freshProgress, isProgress, type Progress } from "@/lib/progress";
import type { Category } from "@/lib/types";
import LinkError from "./LinkError";
import QuizRunner from "./QuizRunner";

// 두 번째 사람(B)의 흐름: 초대 링크 확인 → 안내 → 질문 → 결과 화면으로 이동
export default function InviteFlow() {
  const hash = useHash();
  if (hash === null) {
    return (
      <p className="card text-muted" role="status">
        초대 링크를 확인하는 중이에요…
      </p>
    );
  }
  // 초대한 사람의 답은 저장소가 아니라 항상 링크에서 복원한다.
  const decoded = decodePayload(hash);
  if (!decoded.ok) return <LinkError reason={decoded.reason} />;
  return <Inner key={hash} hash={hash} category={decoded.category} inviterAnswers={decoded.a} />;
}

interface InnerProps {
  hash: string;
  category: Category;
  inviterAnswers: number[];
}

function Inner({ hash, category, inviterAnswers }: InnerProps) {
  const router = useRouter();
  const [progress, setProgress] = useSessionState<Progress>(`rt:b:${hash}`, freshProgress(category), (v) =>
    isProgress(category, v),
  );
  const total = category.questions.length;
  const resultHref = (p: Progress) => `/result/#${encodePayload(category, inviterAnswers, p.answers as number[])}`;

  function onChange(next: Progress) {
    setProgress(next);
    // 완료하면 두 사람의 답이 담긴 결과 주소로 이동한다. 그 주소가 곧 공유할 결과 링크다.
    if (next.phase === "done") router.push(resultHref(next));
  }

  return (
    <div>
      <p className="text-sm font-bold text-brand">
        <span aria-hidden="true">{category.emoji}</span> {category.name} 궁합 테스트 초대
      </p>
      <h1 className="mb-6 mt-1 text-2xl font-bold sm:text-3xl">{category.title}</h1>

      {progress.phase === "answer" && <QuizRunner category={category} progress={progress} onChange={onChange} />}

      {progress.phase === "done" && (
        <div className="card">
          <h2 className="text-xl font-bold">이미 답변을 마쳤어요</h2>
          <p className="mt-2 leading-7 text-muted">결과를 다시 보거나, 답을 고쳐서 새 결과를 볼 수 있어요.</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button type="button" className="btn btn-primary" onClick={() => router.push(resultHref(progress))}>
              결과 보기
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setProgress({ ...progress, phase: "answer", index: 0 })}>
              답변 수정하기
            </button>
          </div>
        </div>
      )}

      {progress.phase === "intro" && (
        <div className="card">
          <h2 className="text-xl font-bold">상대가 먼저 답하고 초대했어요</h2>
          <ul className="bullets mt-3 text-muted">
            <li>
              상대가 이미 답한 것과 같은 질문 {total}개에 답해요. 약 {category.minutes}분이 걸립니다.
            </li>
            <li>상대의 답은 미리 보여 드리지 않아요. 내 답을 마치면 두 사람의 답을 비교한 결과가 바로 나옵니다.</li>
            <li>정답은 없어요. 평소의 나와 가장 가까운 답을 골라 주세요.</li>
            <li>
              결과 링크에는 두 사람이 고른 답이 함께 담깁니다. 서버에 저장되지 않지만, 그 링크를 가진 사람은 답을 볼 수 있어요.
            </li>
            <li>결과는 오락과 대화를 위한 것이며 심리 진단이 아닙니다. 관계의 좋고 나쁨을 판정하지 않아요.</li>
          </ul>
          <button type="button" className="btn btn-primary mt-6 w-full sm:w-auto" onClick={() => setProgress({ ...progress, phase: "answer" })}>
            {progress.answers.some((v) => v !== null) ? "이어서 답하기" : "답변 시작하기"}
          </button>
        </div>
      )}
    </div>
  );
}
