// 테스트에서 가짜 navigator를 넣을 수 있도록 필요한 부분만 타입으로 받는다.
export interface ShareNavigator {
  share?: (data: { text: string }) => Promise<void>;
  clipboard?: { writeText: (text: string) => Promise<void> };
}

export type ShareOutcome = "shared" | "copied" | "cancelled" | "failed";

export async function copyText(text: string, nav: ShareNavigator = navigator): Promise<boolean> {
  try {
    if (!nav.clipboard) return false;
    await nav.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// 공유 시트 → (미지원·오류 시) 클립보드 복사 → 둘 다 안 되면 "failed"
export async function shareText(text: string, nav: ShareNavigator = navigator): Promise<ShareOutcome> {
  if (nav.share) {
    try {
      await nav.share({ text });
      return "shared";
    } catch (e) {
      if ((e as Error)?.name === "AbortError") return "cancelled";
    }
  }
  return (await copyText(text, nav)) ? "copied" : "failed";
}
