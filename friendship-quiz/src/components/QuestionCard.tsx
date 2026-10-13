import type { RefObject } from "react";
import type { Question } from "@/lib/types";

interface Props {
  question: Question;
  selected: number | null;
  onSelect: (option: number) => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
}

export default function QuestionCard({ question, selected, onSelect, headingRef }: Props) {
  return (
    <fieldset>
      <legend className="w-full">
        <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold leading-8 sm:text-2xl sm:leading-9">
          {question.text}
        </h2>
      </legend>
      <div className="mt-5 space-y-3">
        {question.options.map((label, i) => {
          const checked = selected === i;
          return (
            <label key={label} className="block cursor-pointer">
              <input
                type="radio"
                className="peer sr-only"
                name={question.id}
                value={i}
                checked={checked}
                onChange={() => onSelect(i)}
              />
              <span
                className={`flex min-h-14 items-center gap-3 rounded-2xl border-2 px-4 py-3 leading-6 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand ${
                  checked ? "border-brand bg-peach font-semibold" : "border-line bg-white hover:border-muted"
                }`}
              >
                {/* 색뿐 아니라 체크 표시와 굵기로도 선택 상태를 알린다. */}
                <span
                  aria-hidden="true"
                  className={`grid size-6 shrink-0 place-items-center rounded-full border-2 text-sm font-bold ${
                    checked ? "border-brand bg-brand text-white" : "border-muted"
                  }`}
                >
                  {checked && "✓"}
                </span>
                {label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
