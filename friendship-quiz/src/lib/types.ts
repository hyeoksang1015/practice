export type Band = "low" | "middle" | "high";

// match: 기대가 맞아야 편한 주제. 답이 가까울수록 온도가 오르고, 멀면 오해 상황 후보가 된다.
// complement: 달라도 마찰이 아닌 주제. 온도 계산에서 빼고, 다르면 서로 보완되는 차이로 설명한다.
export type Rule = "match" | "complement";

export interface Question {
  id: string;
  topic: string;
  text: string;
  // 하나의 방향으로 나란히 놓인 선택지 4개. 우열이 아니라 두 답의 거리(번호 차이)만 쓴다.
  options: string[];
  rule: Rule;
  // 두 답이 같거나 한 칸 차이일 때의 해설
  same: string;
  // 두 답이 두 칸 이상 떨어졌을 때의 해설
  different: string;
  // match 문항에서 답이 멀 때 생길 수 있는 오해 상황
  scenario?: string;
  tip: string;
  // 둘 다 이 번호의 선택지를 골랐을 때의 주의점 (같은 답이 늘 좋은 것은 아니다)
  sameCaution?: Record<number, string>;
}

export interface Topic {
  id: string;
  name: string;
  // 이 주제에서 차이가 클 때 건네는 대화 질문
  talk: string;
}

export interface Category {
  slug: string;
  name: string;
  emoji: string;
  // 질문·선택지 구성이 바뀌면 올린다. 이전 버전으로 만든 링크는 안내 화면으로 보낸다.
  version: number;
  title: string;
  description: string;
  minutes: number;
  topics: Topic[];
  questions: Question[];
  summaries: Record<Band, { title: string; summary: string }>;
  defaultTips: string[];
  defaultTalks: string[];
}
