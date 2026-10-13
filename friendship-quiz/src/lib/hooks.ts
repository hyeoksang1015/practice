"use client";

import { useState, useSyncExternalStore } from "react";

const noop = () => () => {};

// 서버 렌더·하이드레이션 중에는 false. 브라우저 저장소를 읽는 컴포넌트는 true가 된 뒤에만 그린다.
export function useHydrated(): boolean {
  return useSyncExternalStore(noop, () => true, () => false);
}

function onHashChange(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

// 주소의 # 뒷부분. 서버 렌더·하이드레이션 중에는 null이라 답변이 HTML에 찍히지 않는다.
export function useHash(): string | null {
  return useSyncExternalStore(onHashChange, () => window.location.hash, () => null);
}

// sessionStorage와 함께 가는 상태. 하이드레이션이 끝난 뒤에 마운트되는 컴포넌트에서만 쓴다.
export function useSessionState<T>(key: string, fallback: T, isValid: (value: unknown) => boolean): [T, (next: T) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = sessionStorage.getItem(key);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (isValid(parsed)) return parsed as T;
      }
    } catch {
      // 저장소를 쓸 수 없거나 값이 깨졌으면 처음 상태로 시작한다.
    }
    return fallback;
  });

  function set(next: T) {
    setState(next);
    try {
      sessionStorage.setItem(key, JSON.stringify(next));
    } catch {
      // 저장에 실패해도 진행은 계속된다(새로고침 시 복원만 안 된다).
    }
  }

  return [state, set];
}
