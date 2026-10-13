import { describe, expect, it } from "vitest";
import { categories } from "../data/categories";
import { couple } from "../data/categories/couple";
import { decodePayload, encodePayload } from "./payload";
import { freshProgress, isProgress } from "./progress";

const a = couple.questions.map((_, i) => i % 4);
const b = couple.questions.map((_, i) => (i + 1) % 4);

// 검증을 건너뛰고 임의의 JSON을 payload 모양으로 만든다.
const forge = (data: unknown) =>
  btoa(JSON.stringify(data)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

describe("payload 왕복", () => {
  it.each(categories)("$slug: 초대 링크(A만)와 결과 링크(A·B)를 그대로 복원한다", (c) => {
    const x = c.questions.map((_, i) => (i * 3) % 4);
    const y = c.questions.map((_, i) => (i * 2 + 1) % 4);
    expect(decodePayload(encodePayload(c, x))).toEqual({ ok: true, category: c, a: x, b: undefined });
    expect(decodePayload("#" + encodePayload(c, x, y))).toEqual({ ok: true, category: c, a: x, b: y });
  });

  it("URL에 안전한 문자만 쓰고 충분히 짧다", () => {
    const raw = encodePayload(couple, a, b);
    expect(raw).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(raw.length).toBeLessThan(200);
  });
});

describe("잘못된 링크 처리", () => {
  const reason = (hash: string) => {
    const d = decodePayload(hash);
    return d.ok ? "ok" : d.reason;
  };
  const base = { v: 1, c: "couple", t: couple.version, a };

  it("payload 없음", () => {
    expect(reason("")).toBe("missing");
    expect(reason("#")).toBe("missing");
  });

  it("깨진 payload", () => {
    expect(reason("#%%%")).toBe("malformed");
    expect(reason("#<script>alert(1)</script>")).toBe("malformed");
    expect(reason("#" + encodePayload(couple, a).slice(0, 20))).toBe("malformed");
    expect(reason("#" + forge([1, 2, 3]))).toBe("malformed");
    expect(reason("#" + forge("text"))).toBe("malformed");
    expect(reason("#" + "A".repeat(401))).toBe("malformed");
  });

  it("알 수 없는 카테고리·버전", () => {
    expect(reason("#" + forge({ ...base, c: "coworker" }))).toBe("unknown-category");
    expect(reason("#" + forge({ ...base, c: 3 }))).toBe("unknown-category");
    expect(reason("#" + forge({ ...base, t: couple.version + 1 }))).toBe("version");
    expect(reason("#" + forge({ ...base, v: 2 }))).toBe("version");
  });

  it("답변 누락·범위 초과·형식 오류", () => {
    expect(reason("#" + forge({ ...base, a: undefined }))).toBe("answers");
    expect(reason("#" + forge({ ...base, a: a.slice(1) }))).toBe("answers");
    expect(reason("#" + forge({ ...base, a: a.map(() => 4) }))).toBe("answers");
    expect(reason("#" + forge({ ...base, a: a.map(() => -1) }))).toBe("answers");
    expect(reason("#" + forge({ ...base, a: a.map(String) }))).toBe("answers");
    expect(reason("#" + forge({ ...base, b: [0, 1] }))).toBe("answers");
  });
});

describe("진행 상태 검증", () => {
  it("저장소에서 읽은 값의 구조를 확인한다", () => {
    const fresh = freshProgress(couple);
    expect(isProgress(couple, fresh)).toBe(true);
    expect(isProgress(couple, { ...fresh, phase: "done" })).toBe(false);
    expect(isProgress(couple, { phase: "done", index: 0, answers: a })).toBe(true);
    expect(isProgress(couple, { ...fresh, index: 99 })).toBe(false);
    expect(isProgress(couple, { ...fresh, answers: [0] })).toBe(false);
    expect(isProgress(couple, { ...fresh, answers: fresh.answers.map(() => 7) })).toBe(false);
    expect(isProgress(couple, null)).toBe(false);
  });
});
