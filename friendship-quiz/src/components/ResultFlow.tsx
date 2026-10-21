"use client";

import { href, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";
import { analyze } from "@/lib/analysis";
import { useHash } from "@/lib/hooks";
import { decodePayload } from "@/lib/payload";
import LinkError from "./LinkError";
import ResultView from "./ResultView";

// 결과 링크(# 뒤에 두 사람의 답)를 읽어 브라우저 안에서만 분석한다.
export default function ResultFlow({ lang }: { lang: Locale }) {
  const hash = useHash();
  if (hash === null) {
    return (
      <p className="card text-muted" role="status">
        {getDict(lang).result.loading}
      </p>
    );
  }
  const decoded = decodePayload(hash, lang);
  if (!decoded.ok) return <LinkError reason={decoded.reason} lang={lang} />;
  if (!decoded.b) return <LinkError reason="incomplete" inviteHref={`${href(lang, "/invite/")}${hash}`} lang={lang} />;

  return (
    <ResultView
      category={decoded.category}
      analysis={analyze(decoded.category, decoded.a, decoded.b)}
      url={window.location.href}
      lang={lang}
    />
  );
}
