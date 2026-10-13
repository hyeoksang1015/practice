"use client";

import { useRef, useState } from "react";
import { copyText, shareText } from "@/lib/share";

interface Props {
  url: string;
  // 공유 창에 링크와 함께 들어가는 한 줄 설명
  text: string;
  fieldLabel: string;
}

// 링크를 항상 입력칸에 보여 주고, 공유 창 → 클립보드 복사 → 직접 복사 순으로 대체한다.
export default function ShareButtons({ url, text, fieldLabel }: Props) {
  const [status, setStatus] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function report(ok: boolean, okMessage: string) {
    setStatus(ok ? okMessage : "자동 복사를 쓸 수 없는 환경이에요. 위 칸의 링크를 길게 누르거나 선택해서 직접 복사해 주세요.");
    if (!ok) inputRef.current?.select();
  }

  async function onShare() {
    const outcome = await shareText(`${text}\n${url}`);
    if (outcome === "cancelled") return setStatus("공유를 취소했어요.");
    report(
      outcome !== "failed",
      outcome === "shared" ? "공유 창을 열었어요." : "이 기기는 공유 창을 지원하지 않아 링크를 클립보드에 복사했어요.",
    );
  }

  return (
    <div>
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
          링크 공유하기
        </button>
        <button type="button" className="btn btn-ghost" onClick={async () => report(await copyText(url), "링크를 클립보드에 복사했어요.")}>
          링크 복사
        </button>
      </div>
      <p role="status" className="mt-3 min-h-6 text-sm font-semibold text-brand">
        {status}
      </p>
    </div>
  );
}
