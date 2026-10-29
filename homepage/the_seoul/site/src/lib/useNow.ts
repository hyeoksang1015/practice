"use client";

import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 60_000);
  return () => clearInterval(t);
};
// 분 단위로 끊어 같은 분 안에서는 같은 값을 돌려준다(useSyncExternalStore 는 값이 안정적이어야 한다).
const minute = () => Math.floor(Date.now() / 60_000) * 60_000;

/** 정적 빌드 시점이 아닌 방문 시점의 현재 시각. 서버 렌더에서는 null. */
export function useNow() {
  const t = useSyncExternalStore(subscribe, minute, () => null);
  return t === null ? null : new Date(t);
}
