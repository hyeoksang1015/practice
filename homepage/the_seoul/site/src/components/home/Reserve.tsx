"use client";

import { ArrowUpRight, CheckCircle2, X } from "lucide-react";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { exhibition, programs } from "@/data/site";
import { isTel, isVisitDay, receiptNo, todayKst } from "@/lib/booking";
import { btnGold, btnPrimary, field, FieldError } from "../ui";

type Target = { kind: "exhibition" } | { kind: "program"; id: string };
type Errors = Partial<Record<"date" | "name" | "tel" | "code", string>>;

const dot = (d: string) => d.replaceAll("-", ".");

/** 전시 관람 예매와 프로그램 신청을 같은 대화상자로 받는다. 저장 서버가 없어 접수번호만 보여 준다. */
export default function Reserve({ target, className = btnPrimary, children }: { target: Target; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<{ no: string; summary: string } | null>(null);

  const program = target.kind === "program" ? programs.find((p) => p.id === target.id) : undefined;
  const title = program ? program.title : exhibition.title;
  const max = program ? 4 : exhibition.maxTickets;

  const open = () => {
    setErrors({});
    setDone(null);
    ref.current?.showModal();
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const today = todayKst();
    const date = program ? program.date : get("date");
    const next: Errors = {};
    if (!program && !isVisitDay(date, exhibition.start, exhibition.end, today)) next.date = "전시 기간 중 오늘 이후의 화–일요일을 골라 주세요. (월요일 휴관)";
    if (!get("name")) next.name = "예약자 성함을 입력해 주세요.";
    if (!isTel(get("tel"))) next.tel = "휴대전화 번호를 확인해 주세요.";
    // shortcut: 초청 코드는 형식만 본다. 실제 운영 시 서버에서 발급 코드와 대조해야 한다.
    if (program?.invite && !/^[A-Za-z0-9]{6,12}$/.test(get("code"))) next.code = "초청장에 적힌 6–12자리 코드를 입력해 주세요.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setDone({ no: receiptNo(new Date()), summary: `${dot(date)}${program ? ` ${program.time}` : ""} · ${get("count")}명 · ${get("name")}` });
  };

  const err = (k: keyof Errors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${uid}-${k}` : undefined });

  return (
    <>
      <button type="button" onClick={open} className={className}>
        {children}
      </button>
      <dialog ref={ref} aria-labelledby={`${uid}-title`} className="m-auto w-[min(32rem,calc(100%-2rem))] rounded-lg bg-surface-container p-0 text-on-surface shadow-2xl">
        <div className="flex items-start justify-between gap-space-md p-space-md md:p-space-lg">
          <div>
            <span className="text-label-sm uppercase tracking-widest text-secondary">{program ? program.category : "Book Ticket"}</span>
            <h2 id={`${uid}-title`} className="mt-1 font-display text-headline-sm">
              {title}
            </h2>
          </div>
          <button type="button" onClick={() => ref.current?.close()} aria-label="닫기" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-bright">
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        {done ? (
          <div data-testid="reserve-done" className="flex flex-col items-center gap-space-sm px-space-md pb-space-lg text-center md:px-space-lg">
            <CheckCircle2 className="size-10 text-secondary" aria-hidden="true" />
            <p className="text-body-md">예약 신청이 접수되었습니다.</p>
            <p className="font-display text-headline-md tracking-wide text-secondary tabular-nums">{done.no}</p>
            <p className="text-body-sm text-on-surface-variant">{done.summary}</p>
            <p className="text-body-sm text-outline">입장 시 접수번호와 예약자 성함을 확인합니다.</p>
            <button type="button" onClick={() => ref.current?.close()} className={`${btnPrimary} mt-space-sm`}>
              확인
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="flex flex-col gap-space-md px-space-md pb-space-md md:px-space-lg md:pb-space-lg">
            <p className="text-body-sm text-on-surface-variant">
              {program ? `${dot(program.date)} ${program.time} · ${program.note}` : `${dot(exhibition.start)} — ${dot(exhibition.end)} · 화–일 10:00 — 20:00 (월요일 휴관)`}
            </p>
            {!program && (
              <label className="flex flex-col gap-1 text-label-md text-on-surface-variant">
                관람일
                <input name="date" type="date" min={exhibition.start} max={exhibition.end} className={field} {...err("date")} />
                <FieldError id={`${uid}-date`} msg={errors.date} />
              </label>
            )}
            <label className="flex flex-col gap-1 text-label-md text-on-surface-variant">
              인원
              <select name="count" className={field} defaultValue="1">
                {Array.from({ length: max }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}명
                  </option>
                ))}
              </select>
            </label>
            <div className="grid gap-space-md sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-label-md text-on-surface-variant">
                예약자 성함
                <input name="name" autoComplete="name" className={field} {...err("name")} />
                <FieldError id={`${uid}-name`} msg={errors.name} />
              </label>
              <label className="flex flex-col gap-1 text-label-md text-on-surface-variant">
                휴대전화
                <input name="tel" type="tel" inputMode="tel" autoComplete="tel" placeholder="010-0000-0000" className={field} {...err("tel")} />
                <FieldError id={`${uid}-tel`} msg={errors.tel} />
              </label>
            </div>
            {program?.invite && (
              <label className="flex flex-col gap-1 text-label-md text-on-surface-variant">
                초청 코드
                <input name="code" autoComplete="off" className={`${field} uppercase`} {...err("code")} />
                <FieldError id={`${uid}-code`} msg={errors.code} />
              </label>
            )}
            <button type="submit" className={`${btnGold} mt-space-xs`}>
              예약 신청 <ArrowUpRight className="size-4" aria-hidden="true" />
            </button>
          </form>
        )}
      </dialog>
    </>
  );
}
