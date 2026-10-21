"use client";

import { useRouter } from "next/navigation";
import { href, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";
import { useHash, useSessionState } from "@/lib/hooks";
import { decodePayload, encodePayload } from "@/lib/payload";
import { freshProgress, isProgress, type Progress } from "@/lib/progress";
import type { Category } from "@/lib/types";
import LinkError from "./LinkError";
import QuizRunner from "./QuizRunner";

// 두 번째 사람(B)의 흐름: 초대 링크 확인 → 안내 → 질문 → 결과 화면으로 이동
export default function InviteFlow({ lang }: { lang: Locale }) {
  const hash = useHash();
  if (hash === null) {
    return (
      <p className="card text-muted" role="status">
        {getDict(lang).invite.loading}
      </p>
    );
  }
  // 초대한 사람의 답은 저장소가 아니라 항상 링크에서 복원한다.
  const decoded = decodePayload(hash, lang);
  if (!decoded.ok) return <LinkError reason={decoded.reason} lang={lang} />;
  return <Inner key={hash} hash={hash} category={decoded.category} inviterAnswers={decoded.a} lang={lang} />;
}

interface InnerProps {
  hash: string;
  category: Category;
  inviterAnswers: number[];
  lang: Locale;
}

function Inner({ hash, category, inviterAnswers, lang }: InnerProps) {
  const t = getDict(lang).invite;
  const router = useRouter();
  const [progress, setProgress] = useSessionState<Progress>(`rt:b:${hash}`, freshProgress(category), (v) =>
    isProgress(category, v),
  );
  const total = category.questions.length;
  const resultHref = (p: Progress) =>
    `${href(lang, "/result/")}#${encodePayload(category, inviterAnswers, p.answers as number[])}`;

  function onChange(next: Progress) {
    setProgress(next);
    // 완료하면 두 사람의 답이 담긴 결과 주소로 이동한다. 그 주소가 곧 공유할 결과 링크다.
    if (next.phase === "done") router.push(resultHref(next));
  }

  return (
    <div>
      <p className="text-sm font-bold text-brand">
        <span aria-hidden="true">{category.emoji}</span> {t.badge(category.name)}
      </p>
      <h1 className="mb-6 mt-1 text-2xl font-bold sm:text-3xl">{category.title}</h1>

      {progress.phase === "answer" && <QuizRunner category={category} progress={progress} onChange={onChange} lang={lang} />}

      {progress.phase === "done" && (
        <div className="card">
          <h2 className="text-xl font-bold">{t.doneTitle}</h2>
          <p className="mt-2 leading-7 text-muted">{t.doneBody}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button type="button" className="btn btn-primary" onClick={() => router.push(resultHref(progress))}>
              {t.viewResult}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setProgress({ ...progress, phase: "answer", index: 0 })}>
              {t.editAnswers}
            </button>
          </div>
        </div>
      )}

      {progress.phase === "intro" && (
        <div className="card">
          <h2 className="text-xl font-bold">{t.introTitle}</h2>
          <ul className="bullets mt-3 text-muted">
            {t.introBullets(total, category.minutes).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <button type="button" className="btn btn-primary mt-6 w-full sm:w-auto" onClick={() => setProgress({ ...progress, phase: "answer" })}>
            {progress.answers.some((v) => v !== null) ? t.resume : t.start}
          </button>
        </div>
      )}
    </div>
  );
}
