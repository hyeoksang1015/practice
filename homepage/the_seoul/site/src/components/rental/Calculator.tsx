"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, Calculator as CalcIcon, ChevronDown, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { venues, won } from "@/data/site";
import { clampDays, estimate, MAX_DAYS, MIN_DAYS } from "@/lib/rental";

const seasons = [
  { summer: false, label: "일반 (8시간)" },
  { summer: true, label: "하절기 (9시간)" },
];

export default function Calculator() {
  const [venue, setVenue] = useState(venues[0].id);
  const [summer, setSummer] = useState(false);
  // 입력 중에는 글자를 그대로 두고, 계산과 칸을 벗어날 때만 30–120 으로 맞춘다.
  const [text, setText] = useState(String(MIN_DAYS));
  const days = clampDays(Number(text));
  const { daily, total } = estimate([venue], days, summer);
  const v = venues.find((x) => x.id === venue)!;
  const step = (d: number) => setText(String(clampDays(days + d)));

  return (
    <div className="flex flex-col justify-between rounded-lg bg-surface-container p-space-md shadow-xl md:rounded-xl md:p-space-lg">
      <div className="mb-space-md flex items-start justify-between gap-space-sm">
        <div>
          <span className="text-label-sm uppercase tracking-widest text-secondary">Interactive Calculator</span>
          <h3 className="mt-1 font-display text-headline-sm md:text-headline-md">실시간 기본 대관료 계산기</h3>
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-secondary">
          <CalcIcon className="size-5" aria-hidden="true" />
        </div>
      </div>

      <div className="grid gap-space-md md:grid-cols-2">
        <label className="flex flex-col gap-1 text-label-md text-on-surface-variant">
          전시장 선택 (Venue)
          <span className="relative">
            <select data-testid="calc-venue" value={venue} onChange={(e) => setVenue(e.target.value as typeof venue)} className="min-h-12 w-full appearance-none rounded-full border border-white/12 bg-surface-container-lowest pr-10 pl-space-md text-body-md text-on-surface outline-none focus:border-secondary">
              {venues.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name} ({x.area.toLocaleString()}m² / {x.pyeong}평)
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-secondary" aria-hidden="true" />
          </span>
        </label>
        <fieldset className="flex flex-col gap-1">
          <legend className="mb-1 text-label-md text-on-surface-variant">운영 시즌 (Season Type)</legend>
          <div className="grid grid-cols-2 gap-space-xs">
            {seasons.map((s) => (
              <button key={s.label} type="button" aria-pressed={summer === s.summer} onClick={() => setSummer(s.summer)} className="min-h-12 rounded-full bg-surface-container-high text-label-md text-on-surface-variant transition-colors aria-pressed:bg-secondary aria-pressed:text-on-secondary">
                {s.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-space-md">
        <div className="mb-space-xs flex flex-wrap items-center justify-between gap-space-sm">
          <span>
            <label htmlFor="calc-days" className="block text-label-md text-on-surface-variant">
              대관 기간 (일수)
            </label>
            <span className="text-label-sm text-secondary">기본 규정 30일 이상 선택 가능</span>
          </span>
          <span className="flex items-center gap-space-xs">
            <button type="button" onClick={() => step(-1)} disabled={days <= MIN_DAYS} aria-label="하루 줄이기" className="flex size-10 items-center justify-center rounded-full bg-surface-container-high transition-colors hover:bg-surface-bright disabled:opacity-40">
              <Minus className="size-4" aria-hidden="true" />
            </button>
            <input id="calc-days" data-testid="calc-days" type="number" inputMode="numeric" min={MIN_DAYS} max={MAX_DAYS} value={text} onChange={(e) => setText(e.target.value)} onBlur={() => setText(String(days))} className="h-10 w-16 rounded-full bg-transparent text-center font-display text-headline-sm tabular-nums outline-none focus:bg-surface-container-lowest" />
            <span className="text-body-sm text-on-surface-variant">일</span>
            <button type="button" onClick={() => step(1)} disabled={days >= MAX_DAYS} aria-label="하루 늘리기" className="flex size-10 items-center justify-center rounded-full bg-surface-container-high transition-colors hover:bg-surface-bright disabled:opacity-40">
              <Plus className="size-4" aria-hidden="true" />
            </button>
          </span>
        </div>
        <input type="range" min={MIN_DAYS} max={MAX_DAYS} value={days} onChange={(e) => setText(e.target.value)} aria-label="대관 기간 슬라이더" className="w-full accent-secondary" />
        <div className="mt-1 flex justify-between text-label-sm text-on-surface-variant">
          <span>30일 (최소)</span>
          <span>60일</span>
          <span>90일</span>
          <span>120일 (분기)</span>
        </div>
      </div>

      <div className="mt-space-md rounded-lg bg-surface-container-lowest p-space-md">
        <span className="text-label-sm uppercase tracking-widest text-on-surface-variant">총 예상 기본 대관료 (Estimated Total)</span>
        <div className="mt-space-xs flex flex-wrap items-end justify-between gap-space-sm">
          <output data-testid="calc-total" aria-live="polite" className="font-display text-headline-lg-mobile tabular-nums text-secondary md:text-headline-lg">
            {won(total)}
          </output>
          <span className="text-right text-body-sm text-on-surface-variant">
            VAT 별도
            <br />
            일일 요율 <span className="text-on-surface tabular-nums">{won(daily)}</span> / 일
          </span>
        </div>
        <div className="mt-space-md flex flex-col gap-space-sm border-t border-outline-variant/20 pt-space-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2 text-label-md text-on-surface-variant">
            <BadgeCheck className="size-4 text-secondary" aria-hidden="true" />
            {v.name} · {days}일 · {summer ? "하절기" : "일반"} 기준
          </span>
          <Link href={`/booking/?venue=${venue}&days=${days}${summer ? "&season=summer" : ""}`} className="inline-flex min-h-10 items-center justify-center gap-1 rounded-full bg-secondary px-space-md text-label-md text-on-secondary transition-colors hover:bg-secondary-fixed">
            이 일정으로 가승인 신청 <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
