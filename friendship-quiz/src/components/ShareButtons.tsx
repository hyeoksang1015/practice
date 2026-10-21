"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";
import { copyText, shareText } from "@/lib/share";

interface Props {
  url: string;
  // 공유 창에 링크와 함께 들어가는 한 줄 설명
  text: string;
  fieldLabel: string;
  lang: Locale;
}

// 링크를 항상 입력칸에 보여 주고, 공유 창 → 클립보드 복사 → 직접 복사 순으로 대체한다.
export default function ShareButtons({ url, text, fieldLabel, lang }: Props) {
  const t = getDict(lang).share;
  const [status, setStatus] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function report(ok: boolean, okMessage: string) {
    setStatus(ok ? okMessage : t.failed);
    if (!ok) inputRef.current?.select();
  }

  async function onShare() {
    const outcome = await shareText(`${text}\n${url}`);
    if (outcome === "cancelled") return setStatus(t.cancelled);
    report(
      outcome !== "failed",
      outcome === "shared" ? t.shared : t.sharedByCopy,
    );
  }

  // data-clarity-mask: 링크(# 뒤 답변 포함)를 Clarity 화면 녹화에서 가린다.
  return (
    <div data-clarity-mask="true">
      <label className="block text-sm font-semibold">
        {fieldLabel}
        <input
          ref={inputRef}
          type="text"
          readOnly
          value={url}
          onFocus={(e) => e.currentTarget.select()}
          className="mt-2 block min-h-12 w-full rounded-2xl border-2 border-line bg-white px-4 text-sm font-normal"
        />
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <button type="button" className="btn btn-primary" onClick={onShare}>
          {t.share}
        </button>
        <button type="button" className="btn btn-ghost" onClick={async () => report(await copyText(url), t.copied)}>
          {t.copy}
        </button>
      </div>
      <p role="status" className="mt-3 min-h-6 text-sm font-semibold text-brand">
        {status}
      </p>
    </div>
  );
}
