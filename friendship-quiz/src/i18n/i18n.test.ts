import { describe, expect, it } from "vitest";
import { categoriesFor } from "../data/categories";
import { analyze } from "../lib/analysis";
import { decodePayload, encodePayload } from "../lib/payload";
import type { Category } from "../lib/types";
import { LOCALES, PREFIXED_LOCALES, href, splitPath } from "./config";
import { getDict } from "./ui";

const HANGUL = /[가-힣]/;

// 사전·데이터 안의 모든 문자열을 모은다. 함수는 예시 인자로 불러서 결과 문자열을 모은다.
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (typeof value === "function") return strings((value as (...a: unknown[]) => unknown)("X", "X", "X", "X"));
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

// 언어마다 같아야 하는 뼈대(문구 제외)
const skeleton = (c: Category) => ({
  slug: c.slug,
  emoji: c.emoji,
  version: c.version,
  minutes: c.minutes,
  topics: c.topics.map((t) => t.id),
  questions: c.questions.map((q) => ({
    id: q.id,
    topic: q.topic,
    rule: q.rule,
    options: q.options.length,
    scenario: Boolean(q.scenario),
    cautions: Object.keys(q.sameCaution ?? {}),
  })),
  summaries: Object.keys(c.summaries),
  tips: c.defaultTips.length,
  talks: c.defaultTalks.length,
});

describe("다국어 데이터", () => {
  it.each(PREFIXED_LOCALES)("%s: 카테고리 구조가 한국어와 똑같다(링크가 언어와 상관없이 통한다)", (lang) => {
    expect(categoriesFor(lang).map(skeleton)).toEqual(categoriesFor("ko").map(skeleton));
  });

  it.each(PREFIXED_LOCALES)("%s: 번역에 한국어가 남아 있지 않다", (lang) => {
    const leftovers = [...strings(getDict(lang)), ...strings(categoriesFor(lang))].filter((s) => HANGUL.test(s));
    expect(leftovers).toEqual([]);
  });

  it.each(LOCALES)("%s: 빈 문구가 없고, 카테고리끼리 문구가 겹치지 않는다", (lang) => {
    const all = [...strings(getDict(lang)), ...strings(categoriesFor(lang))];
    expect(all.filter((s) => s.trim() === "")).toEqual([]);
    const texts = categoriesFor(lang).flatMap((c) => [
      c.title,
      c.description,
      ...c.topics.map((t) => t.talk),
      ...c.questions.flatMap((q) => [q.text, q.same, q.different, q.tip, ...(q.scenario ? [q.scenario] : []), ...Object.values(q.sameCaution ?? {})]),
      ...Object.values(c.summaries).flatMap((s) => [s.title, s.summary]),
      ...c.defaultTips,
      ...c.defaultTalks,
    ]);
    expect(texts.filter((t, i) => texts.indexOf(t) !== i)).toEqual([]);
  });

  it.each(LOCALES)("%s: 한 언어로 만든 결과 링크를 이 언어로 열면 같은 온도에 이 언어 문구가 나온다", (lang) => {
    const a = Array(12).fill(0);
    const b = Array(12).fill(1);
    const raw = encodePayload(categoriesFor("ko")[0], a, b);
    const decoded = decodePayload(raw, lang);
    if (!decoded.ok || !decoded.b) throw new Error("decode failed");
    expect(decoded.category).toBe(categoriesFor(lang)[0]);
    const result = analyze(decoded.category, decoded.a, decoded.b);
    expect(result.temperature).toBe(analyze(categoriesFor("ko")[0], a, b).temperature);
    expect(result.title).toBe(categoriesFor(lang)[0].summaries[result.band].title);
  });
});

describe("언어별 주소", () => {
  it("한국어는 접두어 없이, 나머지는 /en/ 처럼 붙인다", () => {
    expect(href("ko", "/tests/")).toBe("/tests/");
    expect(href("en", "/tests/")).toBe("/en/tests/");
    expect(href("zh", "/")).toBe("/zh/");
  });

  it.each(["/", "/tests/couple/", "/invite/", "/result/"])("주소 %s 를 언어와 경로로 나눴다가 다시 붙이면 같다", (path) => {
    for (const lang of LOCALES) expect(splitPath(href(lang, path))).toEqual({ lang, path });
  });

  it("언어 코드가 아닌 첫 경로는 한국어 경로로 본다", () => {
    expect(splitPath("/tests/en/")).toEqual({ lang: "ko", path: "/tests/en/" });
    expect(splitPath("/ko/tests/")).toEqual({ lang: "ko", path: "/ko/tests/" });
  });
});
