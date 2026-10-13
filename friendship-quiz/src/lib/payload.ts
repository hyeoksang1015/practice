import { getCategory } from "../data/categories";
import { validAnswers } from "./analysis";
import type { Category } from "./types";

// 링크의 # 뒤에 들어가는 데이터. 질문·해설은 넣지 않고 카테고리 ID와 선택지 번호만 넣는다.
// 인코딩일 뿐 암호화가 아니다. 이름 등 개인정보는 절대 넣지 않는다.
const PAYLOAD_VERSION = 1;
// 정상 payload는 100자 안팎이다. 비정상적으로 긴 값은 해석하지 않는다.
const MAX_LENGTH = 400;

export type LinkErrorReason = "missing" | "malformed" | "unknown-category" | "version" | "answers";

export type Decoded =
  | { ok: true; category: Category; a: number[]; b?: number[] }
  | { ok: false; reason: LinkErrorReason };

export function encodePayload(category: Category, a: number[], b?: number[]): string {
  const json = JSON.stringify({ v: PAYLOAD_VERSION, c: category.slug, t: category.version, a, b });
  const binary = String.fromCharCode(...new TextEncoder().encode(json));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodePayload(hash: string): Decoded {
  const raw = hash.replace(/^#/, "");
  if (!raw) return { ok: false, reason: "missing" };
  if (raw.length > MAX_LENGTH || !/^[A-Za-z0-9_-]+$/.test(raw)) return { ok: false, reason: "malformed" };

  let data: unknown;
  try {
    const binary = atob(raw.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
    data = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    return { ok: false, reason: "malformed" };
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) return { ok: false, reason: "malformed" };

  const { v, c, t, a, b } = data as Record<string, unknown>;
  if (v !== PAYLOAD_VERSION) return { ok: false, reason: "version" };
  const category = typeof c === "string" ? getCategory(c) : undefined;
  if (!category) return { ok: false, reason: "unknown-category" };
  if (t !== category.version) return { ok: false, reason: "version" };
  if (!validAnswers(category, a) || (b !== undefined && !validAnswers(category, b))) return { ok: false, reason: "answers" };

  return { ok: true, category, a, b };
}
