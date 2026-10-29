import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Calculator, CalendarDays, ChevronRight, Clock, ConciergeBell, ExternalLink, Headphones, MapPin, TrainFront } from "lucide-react";
import Reserve from "@/components/home/Reserve";
import { CopyAddress, OpenBadge } from "@/components/home/VisitInfo";
import { btnGold, btnSoft, SectionHead } from "@/components/ui";
import { exhibition, hours, mapLinks, programs, site, venues } from "@/data/site";

const stats = [
  { label: "Total Scale", value: "4,800", unit: "㎡", desc: "서울 성수 권역 최대 규모의 복합 문화 전시 컴플렉스" },
  { label: "Max Ceiling Height", value: "8.5", unit: "M", desc: "대형 키네틱 아트 및 오뜨쿠튀르 런웨이 최적화" },
  { label: "Galleries", value: "5", unit: "Vessels", desc: "독립적이면서 유기적으로 결합 가능한 5개 전시장" },
  { label: "Simultaneous Capacity", value: "3,200", unit: "Guests", desc: "최첨단 공조 및 하중 설계를 갖춘 안전한 하이엔드 공간" },
];

const dot = (d: string) => d.replaceAll("-", ".");
const weekday = (d: string) => ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][new Date(`${d}T00:00:00Z`).getUTCDay()];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 opacity-40">
          <Image src="/images/hero.webp" alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/30 to-transparent" />
        </div>
        <div className="wrap relative flex min-h-[calc(100svh-5rem)] flex-col justify-between gap-space-lg py-space-lg md:py-space-xl">
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-high/80 px-space-md py-space-xs text-label-sm uppercase tracking-widest text-secondary backdrop-blur-md">
              <span className="size-1.5 animate-pulse rounded-full bg-secondary" aria-hidden="true" />
              Now Curating • Season 2026
            </span>
            <span className="hidden text-label-sm tabular-nums text-on-surface-variant md:inline">{site.coords}</span>
          </div>
          <div className="flex max-w-5xl flex-col gap-space-sm">
            <span className="text-label-md uppercase tracking-[0.3em] text-secondary">Architectural Void & Resonance</span>
            <h1 className="font-display text-headline-xl-mobile uppercase leading-[0.95] tracking-tighter md:text-headline-xl md:leading-[0.95]">
              Space of
              <br />
              <span className="font-light text-secondary italic">Infinite</span> Inspiration
            </h1>
            <p className="mt-space-sm max-w-2xl text-body-md leading-relaxed text-on-surface-variant md:text-body-lg">서울숲의 고요한 자연과 거대한 미니멀리즘 건축이 조우하는 무경계 문화 예술 컴플렉스. 보이드와 빛의 조형미 속에서 동시대 가장 진보된 전시와 하이엔드 이벤트를 전개합니다.</p>
          </div>
          <div className="flex flex-col items-stretch justify-between gap-space-lg rounded-lg bg-surface-container/90 p-space-md shadow-xl backdrop-blur-2xl md:rounded-xl md:p-space-lg lg:flex-row">
            <div className="max-w-xl">
              <div className="mb-space-xs flex flex-wrap items-center gap-space-xs">
                <span className="rounded-full bg-secondary-container px-space-sm py-space-xs text-label-sm uppercase text-on-secondary-container">{exhibition.badge}</span>
                <span className="text-label-sm tracking-widest text-secondary">{exhibition.where}</span>
              </div>
              <h2 className="mt-space-xs font-display text-headline-md tracking-tight">{exhibition.title}</h2>
              <p className="mt-space-xs text-body-sm leading-relaxed text-on-surface-variant">{exhibition.desc}</p>
              <div className="mt-space-md flex flex-wrap items-center gap-space-md text-label-md">
                <span className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-secondary" aria-hidden="true" />
                  {dot(exhibition.start)} — {dot(exhibition.end)}
                </span>
                <span className="flex items-center gap-2 text-on-surface-variant">
                  <Clock className="size-4 text-secondary" aria-hidden="true" />
                  {hours.open}:00 — {hours.close}:00 (입장마감 {hours.lastEntry})
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-end gap-space-sm sm:flex-row sm:items-center lg:flex-col lg:items-end">
              <Reserve target={{ kind: "exhibition" }}>
                예매하기 (Book Ticket) <ArrowRight className="size-4 -rotate-45" aria-hidden="true" />
              </Reserve>
              <Link href="/spaces/" className={btnSoft}>
                도슨트 & 전시 가이드 <Headphones className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-surface-container-low py-space-lg">
        <div className="wrap grid grid-cols-2 gap-space-sm md:gap-space-md lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col rounded-lg bg-surface-container/60 p-space-md transition-colors hover:bg-surface-container">
              <span className="mb-1 text-label-sm uppercase tracking-widest text-secondary">{s.label}</span>
              <span className="flex flex-wrap items-baseline gap-x-1">
                <span className="font-display text-headline-lg-mobile font-bold tabular-nums md:text-headline-lg">{s.value}</span>
                <span className="font-display text-body-lg text-on-surface-variant md:text-headline-md">{s.unit}</span>
              </span>
              <p className="mt-space-xs text-body-sm text-on-surface-variant">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SPACES */}
      <section className="py-space-xl">
        <div className="wrap">
          <SectionHead eyebrow="Architectural Portfolio" dot title="CURATED SPACES" desc="빛의 각도와 층고의 스케일, 그리고 완벽한 차음 성능을 갖춘 더 서울라이티움의 5개 베뉴를 탐색하십시오.">
            <span className="text-label-sm uppercase tracking-wider text-on-surface-variant">Spatial Index: 01 — 05</span>
          </SectionHead>
        </div>
        {/* 모바일은 가로로 넘겨 보고(시안 모바일), md 이상은 격자 */}
        <div className="wrap">
          <ul className="-mx-5 flex snap-x snap-mandatory gap-space-md overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
            {venues.map((v, i) => (
              <li key={v.id} className={`w-[82%] shrink-0 snap-start md:w-auto ${i === venues.length - 1 ? "lg:col-span-2" : ""}`}>
                <Link href={`/spaces/#floor-${v.floor}`} className="group flex h-full flex-col overflow-hidden rounded-xl bg-surface-container shadow-lg transition-shadow hover:shadow-2xl">
                  <div className="relative h-56 overflow-hidden md:h-64">
                    <Image src={v.image} alt={`${v.name} 전경`} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 82vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 rounded-full bg-surface-container-lowest/80 px-space-md py-space-xs text-label-sm uppercase tracking-widest text-secondary backdrop-blur-md">{v.tag}</span>
                    <span className="absolute right-4 bottom-4 rounded-full bg-surface-container-high/90 px-space-sm py-0.5 text-label-sm">{v.area.toLocaleString()} ㎡</span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-space-md">
                    <div>
                      <h3 className="font-display text-headline-sm tracking-tight transition-colors group-hover:text-secondary md:text-headline-md">
                        {v.name} ({v.en})
                      </h3>
                      <p className="mt-space-xs text-body-sm leading-relaxed text-on-surface-variant">{v.desc}</p>
                    </div>
                    <div className="mt-space-md flex items-center justify-between pt-space-sm text-label-sm text-on-surface-variant">
                      <span>수용인원: {v.capacity.toLocaleString()}명</span>
                      <span>천장고: {v.ceiling.toFixed(1)}M</span>
                      <ArrowRight className="size-5 text-secondary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RENTAL CALLOUT */}
      <section className="wrap py-space-lg">
        <div className="relative flex flex-col items-center justify-between gap-space-lg overflow-hidden rounded-lg bg-surface-container-high p-space-md shadow-2xl md:rounded-xl md:p-space-xl lg:flex-row">
          <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-secondary/10 blur-3xl" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <span className="rounded-full bg-surface-container px-space-md py-space-xs text-label-sm uppercase tracking-widest text-secondary">Spatial Rental Service</span>
            <h2 className="mt-space-md font-display text-headline-lg-mobile leading-tight tracking-tight md:text-headline-lg">Global Brands & Premier Arts Venue</h2>
            <p className="mt-space-xs text-body-md leading-relaxed text-on-surface-variant">서울패션위크, 아트 위크 갈라, 글로벌 럭셔리 팝업 및 첨단 테크 쇼케이스를 위한 맞춤형 대관 인프라. 전담 테크니컬 디렉터와 VIP 라운지가 최상의 호스피탈리티를 지원합니다.</p>
            <ul className="mt-space-md flex flex-wrap gap-x-6 gap-y-2 text-label-md">
              {["중대형 화물 리프트 완비 (5 Ton)", "단독 VIP 대기실 & 미팅 스위트", "3상 380V 대용량 전시 전력"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-secondary" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex w-full shrink-0 flex-col gap-space-sm sm:flex-row lg:w-auto lg:flex-col">
            <Link href="/rental/" className={btnGold}>
              대관 요율 & 규정 보기 <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/rental/#calculator" className={btnSoft}>
              실시간 대관 견적 시뮬레이터 <Calculator className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="wrap py-space-xl">
        <SectionHead eyebrow="Calendar & Events" title="UPCOMING PROGRAMS" />
        <ul className="grid grid-cols-1 gap-space-md md:grid-cols-3">
          {programs.map((p) => (
            <li key={p.id} className="flex flex-col overflow-hidden rounded-xl bg-surface-container shadow-md transition-colors hover:bg-surface-container-high">
              <div className="relative h-48 overflow-hidden">
                <Image src={p.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                <span className="absolute top-4 left-4 rounded-full bg-surface-container-lowest/80 px-space-sm py-1 text-label-sm backdrop-blur-md">
                  {dot(p.date)} ({weekday(p.date)}) {p.time}
                </span>
                <span className={`absolute bottom-4 left-4 rounded-full px-space-sm py-0.5 text-label-sm uppercase tracking-wider ${p.invite ? "bg-surface-container-highest text-on-surface-variant" : "bg-secondary font-semibold text-on-secondary"}`}>{p.invite ? "초청 한정 (By Invitation)" : "접수 중 (Available)"}</span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-space-md">
                <div>
                  <span className="text-label-sm uppercase text-secondary">{p.category}</span>
                  <h3 className="mt-1 font-display text-headline-sm tracking-tight md:text-headline-md">{p.title}</h3>
                  <p className="mt-space-xs text-body-sm leading-relaxed text-on-surface-variant">{p.desc}</p>
                </div>
                <div className="mt-space-md flex items-center justify-between pt-space-sm">
                  <span className="text-label-sm text-on-surface-variant">{p.note}</span>
                  <Reserve target={{ kind: "program", id: p.id }} className={`inline-flex min-h-10 items-center rounded-full px-space-md text-label-sm uppercase transition-colors ${p.invite ? "bg-surface-container-highest text-on-surface hover:bg-surface-bright" : "bg-on-background text-surface hover:bg-secondary"}`}>
                    {p.invite ? "초청 코드 입력" : "예약 신청"}
                  </Reserve>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* VISIT */}
      <section className="bg-surface-container-lowest py-space-xl">
        <div className="wrap grid grid-cols-1 items-stretch gap-space-lg lg:grid-cols-12">
          <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-xl bg-surface-container p-space-md shadow-xl lg:col-span-6">
            <Image src="/images/map.webp" alt="서울숲 일대 지도" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-65" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent" />
            <div className="relative flex items-start justify-between gap-space-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-high/90 px-space-md py-space-xs text-label-sm uppercase backdrop-blur-md">
                <MapPin className="size-4 text-secondary" aria-hidden="true" />
                Seoul Forest Cultural Belt
              </span>
              <span className="rounded-full bg-surface-container-lowest/80 px-space-sm py-1 text-label-sm tabular-nums text-secondary">Exit 4 • 180m</span>
            </div>
            <div className="relative mt-auto pt-space-xl">
              <h3 className="font-display text-headline-md">
                {site.nameKo} ({site.name})
              </h3>
              <p className="mt-1 text-body-md text-on-surface-variant">
                {site.address} ({site.addressDetail})
              </p>
              <div className="mt-space-md flex flex-wrap items-center gap-space-sm">
                <CopyAddress />
                {[
                  ["카카오맵", mapLinks.kakao],
                  ["네이버 지도", mapLinks.naver],
                ].map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-surface-container-high px-space-md text-label-sm transition-colors hover:bg-surface-bright">
                    {label} <ExternalLink className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">(새 창)</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-space-md lg:col-span-6">
            <div className="flex items-start gap-space-md rounded-xl bg-surface-container p-space-md shadow-md">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-secondary">
                <Clock className="size-6" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-space-sm">
                  <h3 className="font-display text-headline-sm tracking-tight md:text-headline-md">관람 및 운영 시간</h3>
                  <OpenBadge />
                </div>
                <dl className="mt-space-sm space-y-1 text-body-sm text-on-surface-variant">
                  <div className="flex flex-wrap justify-between gap-x-space-sm">
                    <dt>화요일 — 일요일</dt>
                    <dd className="font-medium text-on-surface">
                      {hours.open}:00 — {hours.close}:00 (입장 마감 {hours.lastEntry})
                    </dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-space-sm">
                    <dt>매주 월요일</dt>
                    <dd className="font-medium text-secondary">정기 휴관</dd>
                  </div>
                </dl>
                <p className="mt-1 pt-1 text-[12px] text-outline">* 대관 행사 및 기획전 성격에 따라 관람 시간이 상이할 수 있습니다.</p>
              </div>
            </div>
            <div className="flex items-start gap-space-md rounded-xl bg-surface-container p-space-md shadow-md">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-secondary">
                <TrainFront className="size-6" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-headline-sm tracking-tight md:text-headline-md">대중교통 및 주차 안내</h3>
                <div className="mt-space-sm space-y-2 text-body-sm text-on-surface-variant">
                  <p>
                    <span className="block font-medium text-on-surface">지하철 이용 시</span>
                    수인분당선 서울숲역 4번 출구 도보 2분 / 2호선 뚝섬역 8번 출구 도보 8분
                  </p>
                  <p>
                    <span className="block font-medium text-on-surface">주차 안내</span>
                    지하 자주식 주차장 완비 (전시 관람객 2시간 할인권 지급)
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-space-md rounded-xl bg-surface-container-high p-space-md shadow-md">
              <div className="flex items-center gap-space-sm">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-on-secondary">
                  <ConciergeBell className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-label-sm uppercase tracking-widest text-secondary">VIP Desk & Inquiries</div>
                  <a href={`tel:${site.phone}`} className="block text-body-md font-medium hover:text-secondary">
                    {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`} className="block text-body-sm text-on-surface-variant hover:text-on-surface">
                    {site.email}
                  </a>
                </div>
              </div>
              <Link href="/booking/#faq" className="inline-flex min-h-10 items-center gap-1 rounded-full bg-surface px-space-md text-label-sm uppercase transition-colors hover:bg-surface-bright">
                1:1 문의 접수 <ChevronRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
