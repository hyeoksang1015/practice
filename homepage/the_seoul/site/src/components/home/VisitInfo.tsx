"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { site } from "@/data/site";
import { isOpenNow } from "@/lib/booking";
import { useNow } from "@/lib/useNow";

/** 지금 한국 시간 기준 관람 가능 여부. 정적 빌드라 방문자 브라우저에서 계산한다. */
export function OpenBadge() {
  const now = useNow();
  if (!now) return null;
  const open = isOpenNow(now);
  return (
    <span data-testid="open-badge" className={`rounded-full px-space-sm py-0.5 text-label-sm uppercase ${open ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container-highest text-on-surface-variant"}`}>
      {open ? "Open Now" : "Closed Now"}
    </span>
  );
}

export function CopyAddress() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${site.address} ${site.nameKo}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 권한이 없으면(http, 일부 브라우저) 조용히 넘어간다. 주소는 화면에 그대로 보인다.
    }
  };
  return (
    <button type="button" onClick={copy} className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-surface-container-high px-space-md text-label-sm text-on-surface transition-colors hover:bg-surface-bright">
      {copied ? <Check className="size-3.5 text-secondary" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "복사됨" : "주소 복사"}</span>
    </button>
  );
}
