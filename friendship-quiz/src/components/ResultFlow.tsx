"use client";

import { analyze } from "@/lib/analysis";
import { useHash } from "@/lib/hooks";
import { decodePayload } from "@/lib/payload";
import LinkError from "./LinkError";
import ResultView from "./ResultView";

// 결과 링크(# 뒤에 두 사람의 답)를 읽어 브라우저 안에서만 분석한다.
export default function ResultFlow() {
  const hash = useHash();
  if (hash === null) {
    return (
      <p className="card text-muted" role="status">
        결과 링크를 확인하는 중이에요…
      </p>
    );
  }
  const decoded = decodePayload(hash);
  if (!decoded.ok) return <LinkError reason={decoded.reason} />;
  if (!decoded.b) return <LinkError reason="incomplete" inviteHref={`/invite/${hash}`} />;

  return (
    <ResultView
      category={decoded.category}
      analysis={analyze(decoded.category, decoded.a, decoded.b)}
      url={window.location.href}
    />
  );
}
