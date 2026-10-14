"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Progress } from "@/lib/progress";
import type { Category } from "@/lib/types";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";

interface Props {
  category: Category;
  progress: Progress;
  // 답 선택·이동·완료(phase: "done")·처음 화면으로(phase: "intro")를 모두 이 콜백으로 알린다.
  onChange: (next: Progress) => void;
}

// 질문 한 개씩 보여 주고 이전/다음으로 이동한다. 상태는 부모가 갖고(sessionStorage 저장 포함) 여기서는 그리기만 한다.
export default function QuizRunner({ category, progress, onChange }: Props) {
  const [notice, setNotice] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { index, answers } = progress;
  const total = category.questions.length;
  const question = category.questions[index];

  // 질문이 바뀌면 새 질문 제목으로 포커스를 옮겨 키보드·스크린리더 사용자가 위치를 놓치지 않게 한다.
  useEffect(() => {
    headingRef.current?.focus();
  }, [index]);

  function select(option: number) {
    setNotice("");
    onChange({ ...progress, answers: answers.map((v, i) => (i === index ? option : v)) });
  }

  function next(e: FormEvent) {
    e.preventDefault();
    if (answers[index] === null) {
      setNotice("선택지를 하나 골라야 다음으로 넘어갈 수 있어요.");
      return;
    }
    onChange(index < total - 1 ? { ...progress, index: index + 1 } : { ...progress, phase: "done" });
  }

  function prev() {
    setNotice("");
    onChange(index > 0 ? { ...progress, index: index - 1 } : { ...progress, phase: "intro" });
  }

  return (
    // action="#": 비워 두면 form 전송 주소가 현재 주소(# 뒤 답변 포함)가 되어 GA 양식 이벤트(form_destination)로 새어 나간다.
    <form className="card" onSubmit={next} action="#" noValidate>
      <ProgressBar current={index + 1} total={total} />
      <div className="mt-6">
        <QuestionCard question={question} selected={answers[index]} onSelect={select} headingRef={headingRef} />
      </div>
      <p role="alert" className="mt-4 min-h-6 text-sm font-semibold text-red-700">
        {notice}
      </p>
      <div className="mt-2 flex gap-3">
        <button type="button" className="btn btn-ghost" onClick={prev}>
          이전
        </button>
        <button type="submit" className="btn btn-primary flex-1">
          {index === total - 1 ? "답변 완료" : "다음"}
        </button>
      </div>
    </form>
  );
}
