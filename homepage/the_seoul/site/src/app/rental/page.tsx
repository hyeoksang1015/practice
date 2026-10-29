import type { Metadata } from "next";
import Image from "next/image";
import { BellRing, BookOpen, Box, CalendarCheck, Clock, Construction, Download, ExternalLink, FileArchive, Hammer, Headset, Info, ShieldCheck, Table2, Timer, Zap } from "lucide-react";
import Calculator from "@/components/rental/Calculator";
import { Accordion, Eyebrow, SectionHead } from "@/components/ui";
import { rentalFaq, site, techRates, venues, won } from "@/data/site";

export const metadata: Metadata = { title: "대관 안내", description: "2026년 전시장 기본 사용료, 기술 지원 요율, 실시간 대관료 계산기와 대관 FAQ." };

const visuals = [
  { src: "/images/rental-pavilion.webp", tag: "Gallery 01 / 02", title: "Main Pavilion", spec: "Total 2,879m²" },
  { src: "/images/rental-void.webp", tag: "Gallery Atrium", title: "Centric Void", spec: "High Ceiling 12m" },
  { src: "/images/rental-media.webp", tag: "Gallery 03 / 05", title: "Acoustic & Media", spec: "Full Acoustic Damping" },
];

const policies = [
  { icon: Clock, title: "운영 시간 기준", body: "전시장 운영시간은 11:00 ~ 19:00 (8시간), 하절기 기준 11:00 ~ 20:00 (9시간) 기준입니다." },
  { icon: Construction, title: "전시 준비 및 철수", body: "운영시간 외 조기/야간 추가 작업 시 사전 서면 승인이 필수이며, 소정의 시간외 추가비용이 발생합니다." },
  { icon: Timer, title: "추가대관료 산정단위", body: "추가대관료는 3시간을 기본단위로 산정하며 일일 기본시설 사용료의 시간당 단가를 적용합니다." },
  { icon: Zap, title: "공과금 실사용 정산", body: "일반관리비는 기본 대관료에 포함되며, 전기료 및 냉/난방비는 계량기 실사용량 기준으로 행사 종료 후 실비 부과됩니다." },
];

const kits = [
  { icon: FileArchive, tag: "DWG / DXF / Vector", title: "공간별 CAD 도면 패키지", desc: "각 전시장 및 아트리움의 레이아웃, 조명 배선, 바닥 하중 및 천고 상세 측량 도면 세트.", meta: "ZIP", action: "다운로드", ActionIcon: Download },
  { icon: BookOpen, tag: "Official Guidebook", title: "2026 대관 규정 및 가이드북", desc: "반입/반출 규정, 화재 및 안전 관리 매뉴얼, 폐기물 처리 기준, 현장 인력 운용 및 홍보 가이드라인.", meta: "PDF", action: "PDF 열기", ActionIcon: Download },
  { icon: Box, tag: "Digital Twin 3D", title: "3D 가상 공간 시뮬레이터", desc: "실제 조도 및 동선을 미리 체험할 수 있는 웹 기반 3D 가상 뷰어. 부스 및 파티션 가상 배치가 가능합니다.", meta: "Web 3D", action: "뷰어 실행", ActionIcon: ExternalLink },
];

export default function Rental() {
  return (
    <>
      {/* HEADER */}
      <section className="wrap pt-space-lg pb-space-xl md:pt-space-xl">
        <div className="mb-space-lg flex flex-wrap items-center justify-between gap-space-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-high px-space-md py-space-xs text-label-sm uppercase tracking-widest text-secondary">
            <span className="size-1.5 animate-pulse rounded-full bg-secondary" aria-hidden="true" />
            2026 Regular Rental Schedule Open
          </span>
          <span className="text-label-sm uppercase tracking-widest text-on-surface-variant">Minimum 30 Days / Curated Venue Specification</span>
        </div>
        <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>The Seouliteum Spatial Archive</Eyebrow>
            <h1 className="mt-space-sm font-display text-headline-xl-mobile tracking-tight md:text-headline-xl">
              공간과 예술의
              <br />
              <span className="text-secondary">독보적인 공명</span>
            </h1>
            <p className="mt-space-md max-w-2xl text-body-md text-on-surface-variant md:text-body-lg">VENUE RENTAL & OFFICIAL RATES 2026. 서울숲의 정제된 빛과 하이엔드 건축 볼륨이 결합된 다섯 개의 독창적 전시 공간 공식 대관 요율 안내입니다.</p>
          </div>
          <div className="grid grid-cols-2 gap-space-sm lg:col-span-4 lg:grid-cols-1">
            {[
              { k: "정기 대관 승인 주기", v: "격월 심사제", icon: CalendarCheck },
              { k: "대관 문의 대응", v: "1:1 전담제", icon: Headset },
            ].map((x) => (
              <div key={x.k} className="flex items-center justify-between gap-space-sm rounded-lg bg-surface-container p-space-md">
                <div>
                  <div className="text-label-sm text-on-surface-variant">{x.k}</div>
                  <div className="mt-1 font-display text-headline-sm">{x.v}</div>
                </div>
                <x.icon className="hidden size-6 text-secondary sm:block" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-space-lg grid grid-cols-1 gap-space-md md:grid-cols-3">
          {visuals.map((x) => (
            <div key={x.title} className="relative h-56 overflow-hidden rounded-lg md:h-64">
              <Image src={x.src} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/20 to-transparent" />
              <div className="absolute right-space-md bottom-space-md left-space-md flex items-end justify-between gap-space-sm">
                <div>
                  <span className="text-label-sm uppercase tracking-widest text-secondary">{x.tag}</span>
                  <div className="font-display text-headline-sm">{x.title}</div>
                </div>
                <span className="rounded-full bg-surface-container-lowest/80 px-space-sm py-1 text-label-sm backdrop-blur-md">{x.spec}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RATE TABLE */}
      <section className="bg-surface-container-lowest py-space-xl">
        <div className="wrap">
          <SectionHead eyebrow="Official Curated Pricing Matrix" title="2026년 기준 전시장 기본 사용료">
            <span className="flex items-center gap-2 text-label-sm text-on-surface-variant">
              <Table2 className="size-4 text-secondary" aria-hidden="true" />
              부가세(VAT) 별도 | 단위: 원 (KRW)
            </span>
          </SectionHead>
          {/* 좁은 화면에서는 표만 가로로 넘긴다 */}
          <div className="overflow-x-auto rounded-lg bg-surface-container">
            <table className="w-full min-w-[720px] text-left text-body-sm">
              <caption className="sr-only">전시장별 기본 대관료</caption>
              <thead className="text-label-sm uppercase tracking-wider text-on-surface-variant">
                <tr className="border-b border-white/6">
                  <th scope="col" className="p-space-md font-semibold">전시장 (Venue)</th>
                  <th scope="col" className="p-space-md font-semibold">전용면적 (m² / 평)</th>
                  <th scope="col" className="p-space-md text-right font-semibold">1일 대관료</th>
                  <th scope="col" className="p-space-md text-right font-semibold">30일 기준 (기본 대관)</th>
                  <th scope="col" className="p-space-md text-right font-semibold">31일 기준 (월간 단위)</th>
                </tr>
              </thead>
              <tbody>
                {venues.map((v) => (
                  <tr key={v.id} className="border-b border-white/6 last:border-0 hover:bg-surface-container-high">
                    <th scope="row" className="p-space-md font-normal">
                      <span className="flex items-center gap-space-sm">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-label-sm text-secondary">{v.no}</span>
                        <span>
                          <span className="flex items-center gap-2 font-display text-body-md">
                            {v.name}
                            {v.id === "g2" && <span className="rounded-full bg-secondary-container px-2 py-0.5 text-label-sm text-on-secondary-container">최대 규모</span>}
                          </span>
                          <span className="block text-label-sm text-on-surface-variant">{v.en}</span>
                        </span>
                      </span>
                    </th>
                    <td className="p-space-md tabular-nums">
                      {v.area.toLocaleString()}m² <span className="text-on-surface-variant">({v.pyeong}평)</span>
                    </td>
                    <td className="p-space-md text-right tabular-nums">{won(v.daily)}</td>
                    <td className="p-space-md text-right tabular-nums">{won(v.daily * 30)}</td>
                    <td className="p-space-md text-right tabular-nums text-secondary">{won(v.daily * 31)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-space-md flex items-start gap-space-sm rounded-lg border border-secondary/30 bg-secondary-container/20 p-space-md">
            <BellRing className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden="true" />
            <p className="text-body-sm">
              <strong className="mb-1 block text-label-md text-secondary">대관 기준 필수 공지사항</strong>위 대관료는 최소 30일 대관 시 적용되는 금액이며, 30일 미만 대관료는 별도 문의 바랍니다.
            </p>
          </div>
          <div className="mt-space-md grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4">
            {policies.map((p) => (
              <div key={p.title} className="rounded-lg bg-surface-container p-space-md">
                <div className="mb-space-xs flex items-center gap-2 text-label-md text-secondary">
                  <p.icon className="size-4" aria-hidden="true" />
                  {p.title}
                </div>
                <p className="text-body-sm text-on-surface-variant">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section id="calculator" className="wrap scroll-mt-24 py-space-xl">
        <SectionHead eyebrow="Real-time Simulation & Specs" title="견적 간편 산출 및 기술 지원 요율" desc="대관 기간 및 옵션별 예상 총비용을 즉시 시뮬레이션하고 필수 기술 지원 항목을 확인하세요." />
        <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12">
          <div className="flex flex-col rounded-lg bg-surface-container-low p-space-md md:rounded-xl md:p-space-lg lg:col-span-5">
            <div className="mb-space-md flex items-start justify-between gap-space-sm">
              <div>
                <h3 className="font-display text-headline-sm md:text-headline-md">전문 기술·운영 지원 요율</h3>
                <span className="text-label-md text-on-surface-variant">전문 테크니션 및 하드웨어 시설 지원</span>
              </div>
              <Hammer className="size-5 shrink-0 text-secondary" aria-hidden="true" />
            </div>
            <ul className="flex flex-col">
              {techRates.map((t) => (
                <li key={t.name} className="flex items-center justify-between gap-space-sm border-b border-white/6 py-space-sm last:border-0">
                  <span>
                    <span className="block font-display text-body-md">{t.name}</span>
                    <span className="block text-label-sm text-on-surface-variant">{t.desc}</span>
                  </span>
                  <span className="shrink-0 text-right tabular-nums">
                    <span className="font-display text-body-md text-secondary">{won(t.price)}</span>
                    <span className="block text-label-sm text-on-surface-variant">/ {t.unit}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-auto flex items-center gap-2 pt-space-md text-label-sm text-on-surface-variant">
              <Info className="size-4 shrink-0 text-secondary" aria-hidden="true" />
              장기 대관(60일 이상) 시 기술 지원 패키지 별도 감면 협의 가능
            </p>
          </div>
          <div className="lg:col-span-7">
            <Calculator />
          </div>
        </div>
      </section>

      {/* RESOURCE KIT */}
      <section className="bg-surface-container-lowest py-space-xl">
        <div className="wrap">
          <SectionHead eyebrow="Technical Resources" title="대관 실무 디지털 리소스 키트" desc="성공적인 큐레이션 및 공간 기획을 위한 CAD 도면과 가이드북은 대관 신청 후 담당 매니저가 전달해 드립니다.">
            <span className="flex items-center gap-2 text-label-sm text-on-surface-variant">
              <ShieldCheck className="size-4 text-secondary" aria-hidden="true" />
              2026 공식 아카이브 패키지
            </span>
          </SectionHead>
          <div className="grid grid-cols-1 gap-space-md md:grid-cols-3">
            {kits.map((k) => (
              <div key={k.title} className="flex flex-col justify-between rounded-lg bg-surface-container p-space-md md:rounded-xl md:p-space-lg">
                <div>
                  <div className="mb-space-md flex items-center gap-space-sm">
                    <span className="flex size-11 items-center justify-center rounded-full bg-surface-container-highest text-secondary">
                      <k.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-label-sm uppercase tracking-widest text-secondary">{k.tag}</span>
                  </div>
                  <h3 className="font-display text-headline-sm">{k.title}</h3>
                  <p className="mt-space-xs text-body-sm text-on-surface-variant">{k.desc}</p>
                </div>
                <div className="mt-space-md flex items-center justify-between border-t border-white/6 pt-space-sm">
                  <span className="text-label-sm text-on-surface-variant">{k.meta}</span>
                  {/* 실제 파일이 아직 없어 버튼을 막아 둔다. 파일을 받으면 public/ 에 두고 a download 로 바꾼다. */}
                  <button type="button" disabled className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-surface-container-high px-space-md text-label-sm text-on-surface-variant disabled:cursor-not-allowed">
                    <k.ActionIcon className="size-3.5" aria-hidden="true" />
                    {k.action} · 준비 중
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap py-space-xl">
        <div className="mx-auto max-w-3xl">
          <div className="mb-space-lg text-center">
            <Eyebrow>Inquiries & Clarifications</Eyebrow>
            <h2 className="mt-space-xs font-display text-headline-lg-mobile md:text-headline-lg">대관 자주 묻는 질문 (FAQ)</h2>
            <p className="mt-space-xs text-body-md text-on-surface-variant">
              대관 신청 및 정기 심사 절차에 대해 자주 문의하시는 사항입니다. 그 밖의 문의는 대관 사무국 {site.rentalPhone} 으로 연락 주세요.
            </p>
          </div>
          <div className="flex flex-col gap-space-sm">
            {rentalFaq.map((f) => (
              <Accordion key={f.q} name="rental-faq" title={f.q}>
                <p>{f.a}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
