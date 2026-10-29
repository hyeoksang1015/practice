import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

/** 박물관 명판처럼 대문자·넓은 자간으로 쓰는 작은 라벨 (DESIGN.md label-sm) */
export function Eyebrow({ children, dot = false, className = "" }: { children: ReactNode; dot?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-label-sm uppercase tracking-widest text-secondary ${className}`}>
      {dot && <span className="size-2 rounded-full bg-secondary" aria-hidden="true" />}
      {children}
    </span>
  );
}

export function SectionHead({ eyebrow, title, desc, dot, children }: { eyebrow: string; title: ReactNode; desc?: ReactNode; dot?: boolean; children?: ReactNode }) {
  return (
    <div className="mb-space-lg flex flex-col justify-between gap-space-md md:flex-row md:items-end">
      <div className="max-w-2xl">
        <Eyebrow dot={dot}>{eyebrow}</Eyebrow>
        <h2 className="mt-space-xs font-display text-headline-lg-mobile tracking-tight text-on-surface md:text-headline-lg">{title}</h2>
        {desc && <p className="mt-space-xs text-body-md text-on-surface-variant">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

/** 접고 펴는 질문·조항. 브라우저 기본 details 라 키보드·스크린리더가 그대로 동작한다. 같은 name 끼리는 하나만 열린다. */
export function Accordion({ label, title, children, name, className = "" }: { label?: string; title: ReactNode; children: ReactNode; name?: string; className?: string }) {
  return (
    <details name={name} className={`group rounded-lg bg-surface-container transition-colors open:bg-surface-container-high ${className}`}>
      <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-space-md px-space-md py-space-sm">
        <span className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-space-md">
          {label && <span className="text-label-sm uppercase tracking-widest text-secondary">{label}</span>}
          <span className="text-body-md font-medium text-on-surface">{title}</span>
        </span>
        <ChevronDown className="size-5 shrink-0 text-secondary transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="px-space-md pb-space-md text-body-sm leading-relaxed text-on-surface-variant">{children}</div>
    </details>
  );
}

const pill = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-space-lg text-label-md uppercase tracking-wider transition-colors disabled:cursor-not-allowed disabled:opacity-50";
/** 흰 알약 → 호버 시 샴페인 브론즈 (DESIGN.md Buttons Primary) */
export const btnPrimary = `${pill} bg-on-background text-surface hover:bg-secondary`;
export const btnGold = `${pill} bg-secondary text-on-secondary hover:bg-secondary-fixed`;
export const btnSoft = `${pill} bg-surface-container-high text-on-surface hover:bg-surface-bright`;

export const field =
  "min-h-12 w-full rounded-full border border-white/12 bg-surface-container-lowest px-space-md text-base text-on-surface outline-none transition-colors placeholder:text-outline focus:border-secondary aria-[invalid=true]:border-error sm:text-body-md";

export function FieldError({ id, msg }: { id: string; msg?: string }) {
  return msg ? (
    <p id={id} role="alert" className="mt-1 px-space-sm text-body-sm text-error">
      {msg}
    </p>
  ) : null;
}
