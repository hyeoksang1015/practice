import { describe, expect, it, vi } from "vitest";
import { copyText, shareText } from "./share";

const abort = Object.assign(new Error("cancel"), { name: "AbortError" });

describe("shareText", () => {
  it("공유 API가 있으면 공유한다", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    expect(await shareText("결과", { share })).toBe("shared");
    expect(share).toHaveBeenCalledWith({ text: "결과" });
  });

  it("공유 API가 없으면 복사로 대체한다", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    expect(await shareText("결과", { clipboard: { writeText } })).toBe("copied");
    expect(writeText).toHaveBeenCalledWith("결과");
  });

  it("공유가 오류로 실패하면 복사로 대체한다", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const share = vi.fn().mockRejectedValue(new Error("NotAllowed"));
    expect(await shareText("결과", { share, clipboard: { writeText } })).toBe("copied");
  });

  it("사용자가 공유를 취소하면 복사하지 않는다", async () => {
    const writeText = vi.fn();
    const share = vi.fn().mockRejectedValue(abort);
    expect(await shareText("결과", { share, clipboard: { writeText } })).toBe("cancelled");
    expect(writeText).not.toHaveBeenCalled();
  });

  it("둘 다 안 되면 failed를 돌려준다", async () => {
    expect(await shareText("결과", {})).toBe("failed");
  });
});

describe("copyText", () => {
  it("클립보드가 없거나 거부되면 false", async () => {
    expect(await copyText("x", {})).toBe(false);
    expect(await copyText("x", { clipboard: { writeText: () => Promise.reject(new Error("denied")) } })).toBe(false);
  });
});
