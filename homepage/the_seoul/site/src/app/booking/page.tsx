import type { Metadata } from "next";
import { Suspense } from "react";
import { Headset } from "lucide-react";
import BookingForm from "@/components/booking/BookingForm";
import { Accordion, Eyebrow } from "@/components/ui";
import { bookingFaq, regulations, site } from "@/data/site";

export const metadata: Metadata = { title: "대관 신청·문의", description: "온라인 대관 신청서, 대관 규약과 심의 기준, 대관 자주 묻는 질문." };

const tabs = [
  ["#apply", "신청서 작성"],
  ["#regulations", "규약 및 심의 절차"],
  ["#faq", "1:1 대관 문의 및 FAQ"],
];

export default function Booking() {
  return (
    <>
      <section className="wrap pt-space-lg pb-space-md md:pt-space-xl">
        <Eyebrow dot>Curatorial Rental & Deliberation</Eyebrow>
        <h1 className="mt-space-sm font-display text-headline-xl-mobile tracking-tight md:text-headline-xl">
          대관 신청 및 안내 <span className="text-headline-sm text-secondary md:text-headline-md">(CURATION & RENTAL)</span>
        </h1>
        <p className="mt-space-sm max-w-3xl text-body-md text-on-surface-variant">더 서울라이티움의 조형적 공간과 미학적 인프라를 통해 브랜드의 독창적인 서사와 문화 예술 프로젝트를 실현하십시오. 전문 큐레이토리얼 위원회의 심의를 거쳐 최적의 공간 솔루션을 제안합니다.</p>
        <nav aria-label="페이지 안 바로가기" className="mt-space-md flex flex-wrap gap-space-xs">
          {tabs.map(([href, label], i) => (
            <a key={href} href={href} className={`inline-flex min-h-10 items-center rounded-full px-space-md text-label-md transition-colors ${i === 0 ? "bg-secondary text-on-secondary" : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"}`}>
              {label}
            </a>
          ))}
        </nav>
      </section>

      <section id="apply" className="wrap scroll-mt-24 py-space-lg">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <BookingForm />
        </Suspense>
      </section>

      <section id="regulations" className="scroll-mt-24 bg-surface-container-lowest py-space-xl">
        <div className="wrap">
          <Eyebrow>Articles of Space Governance</Eyebrow>
          <h2 className="mt-space-xs font-display text-headline-lg-mobile md:text-headline-lg">대관 규약 주요 조항 및 심의 기준</h2>
          <p className="mt-space-xs mb-space-lg text-body-md text-on-surface-variant">공공 안전, 건축물 원형 보존 및 문화 복합 공간의 품격을 유지하기 위한 심의 조항입니다.</p>
          <div className="flex flex-col gap-space-sm">
            {regulations.map((r, i) => (
              <Accordion key={r.title} name="regulations" label={`Article 0${i + 1}`} title={r.title}>
                <ol className="list-decimal space-y-1 pl-5">
                  {r.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ol>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="wrap scroll-mt-24 py-space-xl">
        <div className="mb-space-lg flex flex-col justify-between gap-space-md md:flex-row md:items-end">
          <div>
            <Eyebrow>Inquiries & Knowledge Base</Eyebrow>
            <h2 className="mt-space-xs font-display text-headline-lg-mobile md:text-headline-lg">자주 묻는 질문 (FAQ)</h2>
          </div>
          <a href={`tel:${site.rentalPhone}`} className="inline-flex min-h-10 items-center gap-2 self-start rounded-full border border-white/15 px-space-md text-label-md transition-colors hover:border-secondary">
            <Headset className="size-4 text-secondary" aria-hidden="true" />
            담당 매니저 다이렉트 통화
          </a>
        </div>
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          {bookingFaq.map((f) => (
            <div key={f.q} className="rounded-lg bg-surface-container p-space-md md:p-space-lg">
              <span className="text-label-sm uppercase tracking-widest text-secondary">Q. {f.tag}</span>
              <h3 className="mt-space-xs font-display text-body-lg">{f.q}</h3>
              <p className="mt-space-xs text-body-sm leading-relaxed text-on-surface-variant">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
