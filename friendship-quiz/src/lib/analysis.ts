import type { Band, Category, Question } from "./types";

// 온도 = 23 + (match 문항의 답 가까움 0~1) × 20. 딱 중간이 33℃다.
export const TEMP_MIN = 23;
export const TEMP_MAX = 43;
export const TEMP_BASE = 33;
// 33℃ 기준 ±3℃ 를 middle 로 본다.
export const LOW_BELOW = 30;
export const HIGH_FROM = 36;

const MAX_GAP = 3;

export function bandOf(temperature: number): Band {
  if (temperature < LOW_BELOW) return "low";
  if (temperature < HIGH_FROM) return "middle";
  return "high";
}

export function validAnswers(category: Category, value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length === category.questions.length &&
    value.every((v, i) => Number.isInteger(v) && v >= 0 && v < category.questions[i].options.length)
  );
}

export interface Insight {
  question: Question;
  a: number;
  b: number;
  text: string;
}

export interface Analysis {
  temperature: number;
  band: Band;
  title: string;
  summary: string;
  strengths: Insight[];
  differences: Insight[];
  scenarios: string[];
  tips: string[];
  talks: string[];
}

const unique = (items: string[]) => [...new Set(items)];

export function analyze(category: Category, a: number[], b: number[]): Analysis {
  if (!validAnswers(category, a) || !validAnswers(category, b)) throw new RangeError("invalid answers");

  const rows = category.questions.map((question, i) => ({ question, a: a[i], b: b[i], gap: Math.abs(a[i] - b[i]) }));

  const matched = rows.filter((r) => r.question.rule === "match");
  const closeness = matched.reduce((sum, r) => sum + 1 - r.gap / MAX_GAP, 0) / matched.length;
  const temperature = Math.round((TEMP_MIN + closeness * (TEMP_MAX - TEMP_MIN)) * 10) / 10;
  const band = bandOf(temperature);

  // 같은 답이어도 주의가 필요한 문항은 '잘 맞는 부분'에서 빼고 주의점으로만 보여 준다.
  const cautions = rows.filter((r) => r.gap === 0 && r.question.sameCaution?.[r.a]);
  const near = rows
    .filter((r) => r.gap <= 1 && !cautions.includes(r))
    .sort((x, y) => x.gap - y.gap)
    .slice(0, 4);
  const far = rows
    .filter((r) => r.gap >= 2)
    .sort((x, y) => y.gap - x.gap)
    .slice(0, 3);

  const scenarios = [
    ...far.flatMap((r) => (r.question.rule === "match" && r.question.scenario ? [r.question.scenario] : [])),
    ...cautions.map((r) => r.question.sameCaution![r.a]),
  ].slice(0, 4);

  const focus = [...far, ...cautions];
  const tips = unique(focus.map((r) => r.question.tip)).slice(0, 4);
  for (const tip of category.defaultTips) if (tips.length < 2) tips.push(tip);

  const talkOf = (topicId: string) => category.topics.find((t) => t.id === topicId)!.talk;
  const talks = unique([...focus.map((r) => talkOf(r.question.topic)), ...category.defaultTalks]).slice(0, 3);

  return {
    temperature,
    band,
    ...category.summaries[band],
    strengths: near.map((r) => ({ question: r.question, a: r.a, b: r.b, text: r.question.same })),
    differences: far.map((r) => ({ question: r.question, a: r.a, b: r.b, text: r.question.different })),
    scenarios,
    tips,
    talks,
  };
}
