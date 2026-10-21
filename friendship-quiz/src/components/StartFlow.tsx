"use client";

import { useEffect, useRef } from "react";
import { href, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";
import { useHydrated, useSessionState } from "@/lib/hooks";
import { encodePayload } from "@/lib/payload";
import { freshProgress, isProgress, type Progress } from "@/lib/progress";
import type { Category } from "@/lib/types";
import QuizRunner from "./QuizRunner";
import ShareButtons from "./ShareButtons";

// 첫 번째 사람(A)의 흐름: 시작 → 질문 → 초대 링크
export default function StartFlow({ category, lang }: { category: Category; lang: Locale }) {
  const hydrated = useHydrated();
  if (!hydrated) {
    return (
      <p className="card text-muted" role="status">
        {getDict(lang).start.loading}
      </p>
    );
  }
  return <Inner category={category} lang={lang} />;
}

function Inner({ category, lang }: { category: Category; lang: Locale }) {
  const t = getDict(lang).start;
  // 진행 중인 답은 새로고침에 대비해 이 탭의 sessionStorage에만 둔다(탭을 닫으면 사라진다).
  // 키에 언어가 없어서, 답하는 도중 언어를 바꿔도 이어서 할 수 있다.
  const [progress, setProgress] = useSessionState<Progress>(
    `rt:a:${category.slug}:${category.version}`,
    freshProgress(category),
    (v) => isProgress(category, v),
  );

  if (progress.phase === "answer")
    return <QuizRunner category={category} progress={progress} onChange={setProgress} lang={lang} />;

  if (progress.phase === "done") {
    return (
      <InviteCreated
        category={category}
        lang={lang}
        answers={progress.answers as number[]}
        onEdit={() => setProgress({ ...progress, phase: "answer", index: 0 })}
        onRestart={() => setProgress(freshProgress(category))}
      />
    );
  }

  const started = progress.answers.some((v) => v !== null);
  return (
    <div className="card">
      <h2 className="text-xl font-bold">{started ? t.resumeTitle : t.firstTitle}</h2>
      <p className="mt-2 leading-7 text-muted">{t.intro(category.questions.length)}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button type="button" className="btn btn-primary" onClick={() => setProgress({ ...progress, phase: "answer" })}>
          {started ? t.resume : t.start}
        </button>
        {started && (
          <button type="button" className="btn btn-ghost" onClick={() => setProgress({ ...freshProgress(category), phase: "answer" })}>
            {t.restartAnswers}
          </button>
        )}
      </div>
    </div>
  );
}

interface InviteCreatedProps {
  category: Category;
  lang: Locale;
  answers: number[];
  onEdit: () => void;
  onRestart: () => void;
}

function InviteCreated({ category, lang, answers, onEdit, onRestart }: InviteCreatedProps) {
  const dict = getDict(lang);
  const t = dict.start;
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  // 초대 링크는 지금 보고 있는 언어의 초대 화면으로 연다(받는 사람이 언어를 바꿔도 답은 유지된다).
  const url = `${window.location.origin}${href(lang, "/invite/")}#${encodePayload(category, answers)}`;

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold">
          {t.created}
        </h2>
        <p className="mb-5 mt-2 leading-7 text-muted">{t.createdBody(category.name)}</p>
        <ShareButtons url={url} fieldLabel={t.inviteLink} text={t.inviteText(dict.site.name, category.name)} lang={lang} />
      </section>

      <section className="card" aria-labelledby="next-heading">
        <h3 id="next-heading" className="text-lg font-bold">
          {t.nextTitle}
        </h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-muted">
          {t.nextSteps(category.questions.length).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className="mt-4 rounded-2xl bg-peach p-4 text-sm leading-6">{t.linkNote}</p>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" className="btn btn-ghost" onClick={onEdit}>
          {t.edit}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onRestart}>
          {t.restart}
        </button>
      </div>
    </div>
  );
}
