import type { Category } from "../../lib/types";
import { couple } from "./couple";
import { family } from "./family";
import { friend } from "./friend";

// 새 관계 유형은 고유한 질문·해석을 가진 데이터 파일을 만들어 여기에 추가한다.
export const categories: Category[] = [couple, friend, family];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
