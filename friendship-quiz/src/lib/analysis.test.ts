import { describe, expect, it } from "vitest";
import { categories } from "../data/categories";
import { couple } from "../data/categories/couple";
import { HIGH_FROM, LOW_BELOW, TEMP_BASE, TEMP_MAX, TEMP_MIN, analyze, bandOf, validAnswers } from "./analysis";
import type { Category } from "./types";

const all = (category: Category, option: number) => category.questions.map(() => option);

// 재현 가능한 무작위 답(시드 고정)
function sampler(seed: number) {
  let s = seed;
  return (category: Category) =>
    category.questions.map(() => {
      s = (s * 1103515245 + 12345) % 2147483648;
      return s % 4;
    });
}

describe("카테고리 데이터", () => {
  it.each(categories)("$slug: 질문·주제 구조가 유효하다", (c) => {
    expect(c.questions.length).toBeGreaterThanOrEqual(10);
    expect(c.questions.length).toBeLessThanOrEqual(15);
    expect(new Set(c.questions.map((q) => q.id)).size).toBe(c.questions.length);
    const topicIds = c.topics.map((t) => t.id);
    for (const q of c.questions) {
      expect(topicIds).toContain(q.topic);
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      // match 문항은 오해 상황을, sameCaution은 실제 있는 선택지 번호를 가져야 한다.
      if (q.rule === "match") expect(q.scenario).toBeTruthy();
      for (const key of Object.keys(q.sameCaution ?? {})) expect(Number(key)).toBeLessThan(4);
    }
    // 모든 주제에 질문이 있고(장식용 주제 없음), 온도를 계산할 match 문항이 있어야 한다.
    for (const id of topicIds) expect(c.questions.some((q) => q.topic === id)).toBe(true);
    expect(c.questions.filter((q) => q.rule === "match").length).toBeGreaterThanOrEqual(6);
    expect(c.defaultTips.length).toBeGreaterThanOrEqual(2);
    expect(c.defaultTalks.length).toBeGreaterThanOrEqual(3);
  });

  it("카테고리끼리 질문·해석 문구가 겹치지 않는다(제목만 바꾼 복제 금지)", () => {
    const texts = categories.flatMap((c) => [
      c.title,
      c.description,
      ...c.topics.map((t) => t.talk),
      ...c.questions.flatMap((q) => [q.text, q.same, q.different, q.tip, ...(q.scenario ? [q.scenario] : []), ...Object.values(q.sameCaution ?? {})]),
      ...Object.values(c.summaries).flatMap((s) => [s.title, s.summary]),
      ...c.defaultTips,
      ...c.defaultTalks,
    ]);
    const duplicates = texts.filter((t, i) => texts.indexOf(t) !== i);
    expect(duplicates).toEqual([]);
  });
});

describe("온도", () => {
  it("33℃ 기준으로 구간을 나눈다", () => {
    expect(TEMP_BASE).toBe((TEMP_MIN + TEMP_MAX) / 2);
    expect(bandOf(LOW_BELOW - 0.1)).toBe("low");
    expect(bandOf(LOW_BELOW)).toBe("middle");
    expect(bandOf(TEMP_BASE)).toBe("middle");
    expect(bandOf(HIGH_FROM - 0.1)).toBe("middle");
    expect(bandOf(HIGH_FROM)).toBe("high");
  });

  it.each(categories)("$slug: 모두 같은 답이면 43℃(high), 정반대면 23℃(low)", (c) => {
    expect(analyze(c, all(c, 1), all(c, 1))).toMatchObject({ temperature: TEMP_MAX, band: "high" });
    expect(analyze(c, all(c, 0), all(c, 3))).toMatchObject({ temperature: TEMP_MIN, band: "low" });
  });

  it("complement 문항의 차이는 온도를 낮추지 않는다", () => {
    // 2번 선택지에는 sameCaution이 없어, complement 문항의 차이만 남는다.
    const b = all(couple, 2).map((v, i) => (couple.questions[i].rule === "complement" ? 0 : v));
    const result = analyze(couple, all(couple, 2), b);
    expect(result.temperature).toBe(TEMP_MAX);
    expect(result.differences.length).toBeGreaterThan(0);
    expect(result.scenarios).toEqual([]);
  });

  it("누가 먼저 답했는지와 상관없이 온도가 같다", () => {
    const pick = sampler(7);
    const a = pick(couple);
    const b = pick(couple);
    expect(analyze(couple, a, b).temperature).toBe(analyze(couple, b, a).temperature);
  });
});

describe("analyze 결과 구성", () => {
  it("둘 다 같은 답이어도 주의점이 있으면 '잘 맞는 부분'이 아니라 주의점으로 보여 준다", () => {
    // c5의 0번: 둘 다 자리를 피한다
    const result = analyze(couple, all(couple, 0), all(couple, 0));
    expect(result.band).toBe("high");
    expect(result.strengths.some((s) => s.question.id === "c5")).toBe(false);
    expect(result.scenarios).toContain(couple.questions.find((q) => q.id === "c5")!.sameCaution![0]);
  });

  it.each(categories)("$slug: 여러 답 조합에서 모순·반복 없이 모든 안내가 채워진다", (c) => {
    const pick = sampler(c.slug.length * 31);
    for (let n = 0; n < 300; n++) {
      const a = pick(c);
      const b = pick(c);
      const r = analyze(c, a, b);
      expect(analyze(c, a, b)).toEqual(r);

      expect(r.temperature).toBeGreaterThanOrEqual(TEMP_MIN);
      expect(r.temperature).toBeLessThanOrEqual(TEMP_MAX);
      expect(r.band).toBe(bandOf(r.temperature));
      expect(r.title).toBe(c.summaries[r.band].title);

      // 같은 문항이 '잘 맞는 부분'과 '다른 부분'에 동시에 나오면 안 된다.
      const strong = r.strengths.map((s) => s.question.id);
      const diff = r.differences.map((s) => s.question.id);
      expect(strong.filter((id) => diff.includes(id))).toEqual([]);
      for (const s of r.strengths) expect(Math.abs(s.a - s.b)).toBeLessThanOrEqual(1);
      for (const d of r.differences) expect(Math.abs(d.a - d.b)).toBeGreaterThanOrEqual(2);

      // 팁과 대화 질문은 항상 있고, 같은 문장이 반복되지 않는다.
      expect(r.tips.length).toBeGreaterThanOrEqual(2);
      expect(r.talks.length).toBeGreaterThanOrEqual(2);
      expect(r.talks.length).toBeLessThanOrEqual(3);
      for (const list of [r.tips, r.talks, r.scenarios]) expect(new Set(list).size).toBe(list.length);
    }
  });

  it("잘못된 답으로는 분석하지 않는다", () => {
    expect(validAnswers(couple, all(couple, 0))).toBe(true);
    expect(validAnswers(couple, all(couple, 0).slice(1))).toBe(false);
    expect(validAnswers(couple, all(couple, 4))).toBe(false);
    expect(validAnswers(couple, all(couple, 0.5))).toBe(false);
    expect(validAnswers(couple, "000000000000")).toBe(false);
    expect(() => analyze(couple, all(couple, 0), all(couple, 9))).toThrow(RangeError);
  });
});
