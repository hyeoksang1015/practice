import type { Category } from "./types";

// 한 사람이 테스트를 진행하는 상태. 새로고침에 대비해 sessionStorage에 임시로 둔다.
export interface Progress {
  phase: "intro" | "answer" | "done";
  index: number;
  answers: (number | null)[];
}

export function freshProgress(category: Category): Progress {
  return { phase: "intro", index: 0, answers: category.questions.map(() => null) };
}

// 저장소에서 읽은 값은 믿지 않고 구조를 확인한다.
export function isProgress(category: Category, value: unknown): value is Progress {
  if (typeof value !== "object" || value === null) return false;
  const { phase, index, answers } = value as Record<string, unknown>;
  const total = category.questions.length;
  if (phase !== "intro" && phase !== "answer" && phase !== "done") return false;
  if (!Number.isInteger(index) || (index as number) < 0 || (index as number) >= total) return false;
  if (!Array.isArray(answers) || answers.length !== total) return false;
  const ok = answers.every(
    (v, i) => v === null || (Number.isInteger(v) && v >= 0 && v < category.questions[i].options.length),
  );
  return ok && (phase !== "done" || !answers.includes(null));
}
