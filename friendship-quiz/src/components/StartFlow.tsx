"use client";

import { useEffect, useRef } from "react";
import { site } from "@/config/site";
import { useHydrated, useSessionState } from "@/lib/hooks";
import { encodePayload } from "@/lib/payload";
import { freshProgress, isProgress, type Progress } from "@/lib/progress";
import type { Category } from "@/lib/types";
import QuizRunner from "./QuizRunner";
import ShareButtons from "./ShareButtons";

// 첫 번째 사람(A)의 흐름: 시작 → 질문 → 초대 링크
export default function StartFlow({ category }: { category: Category }) {
  const hydrated = useHydrated();
  if (!hydrated) {
    return (
      <p className="card text-muted" role="status">
        테스트를 불러오는 중이에요…
      </p>
    );
  }
  return <Inner category={category} />;
}

function Inner({ category }: { category: Category }) {
  // 진행 중인 답은 새로고침에 대비해 이 탭의 sessionStorage에만 둔다(탭을 닫으면 사라진다).
  const [progress, setProgress] = useSessionState<Progress>(
    `rt:a:${category.slug}:${category.version}`,
    freshProgress(category),
    (v) => isProgress(category, v),
  );

  if (progress.phase === "answer") return <QuizRunner category={category} progress={progress} onChange={setProgress} />;

  if (progress.phase === "done") {
    return (
      <InviteCreated
        category={category}
        answers={progress.answers as number[]}
        onEdit={() => setProgress({ ...progress, phase: "answer", index: 0 })}
        onRestart={() => setProgress(freshProgress(category))}
      />
    );
  }

  const started = progress.answers.some((v) => v !== null);
  return (
    <div className="card">
      <h2 className="text-xl font-bold">{started ? "답하던 테스트가 남아 있어요" : "내가 먼저 답하기"}</h2>
      <p className="mt-2 leading-7 text-muted">
        질문 {category.questions.length}개에 답하면 상대에게 보낼 초대 링크가 만들어져요. 정답은 없으니 평소의 나와 가장 가까운 답을
        골라 주세요.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button type="button" className="btn btn-primary" onClick={() => setProgress({ ...progress, phase: "answer" })}>
          {started ? "이어서 답하기" : "테스트 시작하기"}
        </button>
        {started && (
          <button type="button" className="btn btn-ghost" onClick={() => setProgress({ ...freshProgress(category), phase: "answer" })}>
            처음부터 다시 답하기
          </button>
        )}
      </div>
    </div>
  );
}

interface InviteCreatedProps {
  category: Category;
  answers: number[];
  onEdit: () => void;
  onRestart: () => void;
}

function InviteCreated({ category, answers, onEdit, onRestart }: InviteCreatedProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const url = `${window.location.origin}/invite/#${encodePayload(category, answers)}`;

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold">
          초대 링크가 만들어졌어요
        </h2>
        <p className="mb-5 mt-2 leading-7 text-muted">
          아래 링크를 {category.name} 테스트를 함께할 상대에게 보내 주세요. 상대가 같은 질문에 답하면 두 사람의 온도가 나옵니다.
        </p>
        <ShareButtons
          url={url}
          fieldLabel="초대 링크"
          text={`[${site.name}] ${category.name} 테스트에 초대했어요. 같은 질문에 답하면 우리 사이의 온도를 볼 수 있어요.`}
        />
      </section>

      <section className="card" aria-labelledby="next-heading">
        <h3 id="next-heading" className="text-lg font-bold">
          이제 이렇게 진행돼요
        </h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-muted">
          <li>상대가 링크를 열고 같은 질문 {category.questions.length}개에 답합니다.</li>
          <li>답을 마치면 상대의 화면에 결과가 바로 나옵니다.</li>
          <li>상대에게 결과 화면의 &lsquo;결과 링크&rsquo;를 보내 달라고 하면 나도 같은 결과를 볼 수 있어요.</li>
        </ol>
        <p className="mt-4 rounded-2xl bg-peach p-4 text-sm leading-6">
          이 링크 안에는 내가 고른 답이 들어 있어요. 서버에 저장되지는 않지만 암호화된 것이 아니어서, 링크를 받은 사람은 답을 확인할
          수 있습니다. 함께할 사람에게만 보내 주세요. 링크를 잃어버리면 다시 찾을 수 없으니 필요하면 메모해 두세요.
        </p>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" className="btn btn-ghost" onClick={onEdit}>
          내 답변 수정하기
        </button>
        <button type="button" className="btn btn-ghost" onClick={onRestart}>
          처음부터 다시 하기
        </button>
      </div>
    </div>
  );
}
