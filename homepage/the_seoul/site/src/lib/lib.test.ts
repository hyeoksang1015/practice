import { describe, expect, it } from "vitest";
import { isOpenNow, isVisitDay, receiptNo, validateBooking, type BookingForm } from "./booking";
import { clampDays, daysBetween, estimate } from "./rental";

describe("rental", () => {
  it("matches the rate table", () => {
    expect(estimate(["g1"], 30).total).toBe(60_000_000);
    expect(estimate(["g1"], 31).total).toBe(62_000_000);
    expect(estimate(["g2"], 31).total).toBe(77_500_000);
    expect(estimate(["atrium"], 30)).toEqual({ daily: 1_000_000, total: 30_000_000 });
  });
  it("adds 10% in summer and sums several venues", () => {
    expect(estimate(["g3"], 30, true).daily).toBe(1_980_000);
    expect(estimate(["g1", "atrium"], 30).total).toBe(90_000_000);
    expect(estimate(["nope"], 30).total).toBe(0);
  });
  it("clamps days and counts inclusive ranges", () => {
    expect([clampDays(5), clampDays(200), clampDays(NaN), clampDays(45.4)]).toEqual([30, 120, 30, 45]);
    expect(daysBetween("2026-12-01", "2026-12-30")).toBe(30);
    expect(daysBetween("2026-12-02", "2026-12-01")).toBeNull();
    expect(daysBetween("", "2026-12-01")).toBeNull();
  });
});

describe("booking", () => {
  const ok: BookingForm = { company: "아틀리에 서울", bizNo: "123-45-67890", manager: "홍길동", dept: "", tel: "010-1234-5678", email: "a@b.co", eventType: "브랜드 팝업스토어", spaces: ["g1"], start: "2026-12-01", end: "2026-12-30", overnight: false, visitors: "500명 미만", notes: "", agreeRules: true, agreePrivacy: true };

  it("accepts a complete form", () => {
    expect(validateBooking(ok, "2026-10-28")).toEqual({});
  });
  it("flags bad fields", () => {
    const e = validateBooking({ ...ok, bizNo: "123", tel: "02-123-4567", email: "x@", spaces: [], start: "2026-10-28", agreePrivacy: false }, "2026-10-28");
    expect(Object.keys(e).sort()).toEqual(["agreePrivacy", "bizNo", "email", "spaces", "start", "tel"]);
    expect(validateBooking({ ...ok, end: "2026-11-30" }, "2026-10-28").end).toBeDefined();
  });
  it("checks attachments", () => {
    expect(validateBooking(ok, "2026-10-28", [{ name: "a.exe", size: 1 }]).files).toMatch(/PDF/);
    expect(validateBooking(ok, "2026-10-28", [{ name: "a.PDF", size: 51 * 1024 * 1024 }]).files).toMatch(/50MB/);
    expect(validateBooking(ok, "2026-10-28", [{ name: "a.zip", size: 1024 }]).files).toBeUndefined();
  });
  it("makes receipt numbers in Korean date", () => {
    expect(receiptNo(new Date("2026-10-28T16:00:00Z"), () => 0)).toBe("TS-20261029-AAAA");
  });
  it("knows opening hours in KST", () => {
    expect(isOpenNow(new Date("2026-10-28T03:00:00Z"))).toBe(true); // 수 12:00
    expect(isOpenNow(new Date("2026-10-28T12:00:00Z"))).toBe(false); // 수 21:00
    expect(isOpenNow(new Date("2026-10-26T03:00:00Z"))).toBe(false); // 월 휴관
  });
  it("limits visit days", () => {
    expect(isVisitDay("2026-11-11", "2026-11-10", "2027-02-28", "2026-10-28")).toBe(true);
    expect(isVisitDay("2026-11-16", "2026-11-10", "2027-02-28", "2026-10-28")).toBe(false); // 월
    expect(isVisitDay("2026-11-09", "2026-11-10", "2027-02-28", "2026-10-28")).toBe(false);
    expect(isVisitDay("2026-11-11", "2026-11-10", "2027-02-28", "2026-11-12")).toBe(false);
  });
});
