import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, CalendarDays, Car, Check, Handshake, Layers, Maximize, MoveVertical, Palette, ParkingSquare, Sparkles, TrainFront, Users, MapPin, ExternalLink } from "lucide-react";
import FloorGuide from "@/components/spaces/FloorGuide";
import { btnGold, btnSoft, Eyebrow, SectionHead } from "@/components/ui";
import { mapLinks, site } from "@/data/site";

export const metadata: Metadata = { title: "공간 소개", description: "4,800㎡ 규모 다섯 개 전시 공간의 층별 안내, 큐레이토리얼 서비스, 오시는 길과 주차 안내." };

const metrics = [
  { icon: Maximize, label: "Metric 01 • Scale", value: "4,800", unit: "㎡", title: "총 연면적 (Total Space)", desc: "성수동 최대 규모의 복합 문화예술 하이브리드 공간 인프라" },
  { icon: MoveVertical, label: "Metric 02 • Clearance", value: "8.5", unit: "M", title: "무주 천장고 (Ceiling Height)", desc: "기둥 없는 개방형 구조로 대형 조형물 및 무대 리깅 최적화" },
  { icon: Layers, label: "Metric 03 • Zoning", value: "05", unit: " Zones", title: "독립 갤러리 및 아트리움", desc: "개별 관람 동선 분리 및 동시 다중 기획전/프라이빗 세션 수용" },
  { icon: Users, label: "Metric 04 • Capacity", value: "3,200", unit: " Pax", title: "동시 수용 인원 (Capacity)", desc: "스탠딩 패션쇼, 글로벌 서밋 및 전시 VIP 오프닝 나이트 지원" },
];

const services = [
  { icon: Palette, title: ["기획전시 및", "아트 디렉팅"], desc: "국내외 큐레이터 및 크리에이티브 디렉터진이 참여하여 전시 서사 기획부터 공간 연출, 작품 운송, 보험, 설치까지 완결된 턴키 솔루션을 제안합니다.", points: ["공간 연출 & 시노그래피 설계", "글로벌 아티스트 섭외 연계"] },
  { icon: Building2, title: ["프리미엄", "복합 대관 솔루션"], desc: "럭셔리 브랜드 론칭 쇼, 글로벌 테크 컨퍼런스, 미디어 쇼케이스 등 대규모 인원이 집결하는 이벤트를 위한 유연한 공간 구획 및 전용 하역 라인을 제공합니다.", points: ["5톤 화물 리프트 직통 연결", "독립된 VIP 및 스태프 동선"] },
  { icon: Handshake, title: ["문화예술", "브랜드 제휴"], desc: "패션, 뷰티, 모빌리티 브랜드와 동시대 아트 씬의 전략적 콜라보레이션을 중개하고 팝업 및 아트 굿즈 머천다이징, VIP 프라이빗 프리뷰를 주관합니다.", points: ["브랜드 맞춤형 컬래버 매칭", "프라이빗 패트런 살롱 운영"] },
  { icon: Sparkles, title: ["미디어 & 테크", "인스톨레이션"], desc: "360도 몰입형 프로젝션 맵핑, Dolby Atmos 서라운드 사운드 랩, 키네틱 인스톨레이션을 위한 전용 전력 인프라와 네트워크 환경을 완비했습니다.", points: ["4K 초단초점 프로젝션 지원", "공간 음향 엔지니어링 상주"] },
];

const desk = [
  ["일반 갤러리 관람 시간", "화 — 일 10:00 — 20:00 (월 휴관)"],
  ["프라이빗 대관 세션 운용", "24시간 연속 운용 가능 (야간 셋업 지원)"],
  ["1:1 현장 공간 투어 상담", "사전 예약제 • 평일 11:00 — 18:00"],
];

export default function Spaces() {
  return (
    <>
      {/* DOSSIER */}
      <section className="wrap pt-space-xl pb-space-lg">
        <div className="mb-space-xl flex flex-col gap-space-md">
          <Eyebrow dot>Editorial Dossier 01 / Architectural Sanctuary</Eyebrow>
          <h1 className="max-w-5xl font-display text-headline-xl-mobile tracking-tighter md:text-headline-xl">도심 속 침묵과 영감의 성소</h1>
          <p className="text-label-md uppercase tracking-widest text-on-surface-variant">Spaces, Void & Curatorial Architecture • Seongsu, Seoul Forest</p>
        </div>
        <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12">
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <span className="mb-space-sm block text-label-sm uppercase tracking-widest text-secondary">[ 01. Spatial Chiaroscuro ]</span>
              <p className="text-body-lg leading-relaxed">더 서울라이티움(THE SEOULITEUM)은 서울숲의 유기적 생명력과 성수동의 인더스트리얼 헤리티지가 교차하는 지점에 구축된 4,800㎡ 규모의 조형적 문화예술 성소입니다.</p>
            </div>
            <blockquote className="mt-space-lg rounded-lg bg-surface-container-low p-space-md">
              <Eyebrow className="mb-space-xs">Spatial Philosophy</Eyebrow>
              <p className="text-body-sm text-on-surface-variant">“빛이 존재하기 위해 어둠이 선행하듯, 온전한 몰입은 비워진 보이드(Void)에서 출발한다.” — Curatorial Board Manifesto</p>
            </blockquote>
          </div>
          <div className="flex flex-col gap-space-md lg:col-span-7">
            <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
              {[
                ["빛과 그림자의 극적인 대비(Chiaroscuro)를 공간 문법으로 차용하여, 관람객이 경계를 넘어서는 순간 도심의 소음은 소거되고 전위적 예술과 오롯이 독대하는 경험을 선사합니다.", "Void Volume Index • 92.4%"],
                ["자연광이 절제된 암실의 순수성과 아트리움의 유연한 투광성은 현대 미술, 패션 프리젠테이션, 미디어 인스톨레이션, 그리고 글로벌 브랜드의 헤리티지 서사를 담아내는 정교한 무대가 됩니다.", "Light Transition • 100 to 0 LUX"],
              ].map(([text, tag]) => (
                <div key={tag} className="flex flex-col justify-between rounded-lg bg-surface-container-low p-space-md md:rounded-xl md:p-space-lg">
                  <p className="mb-space-md text-body-md leading-relaxed text-on-surface-variant">{text}</p>
                  <span className="flex items-center gap-space-xs text-label-sm uppercase tracking-widest text-on-surface-variant">
                    <span className="size-1.5 rounded-full bg-secondary" aria-hidden="true" />
                    {tag}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative h-80 overflow-hidden rounded-xl bg-surface-container shadow-xl">
              <Image src="/images/light-chasm.webp" alt="빛이 떨어지는 제1전시장 내부" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
              <div className="absolute right-space-md bottom-space-md left-space-md flex flex-wrap items-end justify-between gap-space-sm">
                <div>
                  <Eyebrow className="mb-space-xs">Grand Atrium Void</Eyebrow>
                  <div className="font-display text-headline-sm md:text-headline-md">The Light Chasm, Gallery 01</div>
                </div>
                <span className="rounded-full bg-surface-container-lowest/80 px-space-md py-space-xs text-label-md text-secondary-fixed backdrop-blur-md">8.5M Clear Height</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="wrap py-space-xl">
        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="group flex flex-col justify-between rounded-lg bg-surface-container-low p-space-md shadow-sm transition-colors hover:bg-surface-container md:rounded-xl md:p-space-lg">
              <div className="mb-space-md flex items-center justify-between">
                <span className="text-label-sm uppercase tracking-widest text-on-surface-variant transition-colors group-hover:text-secondary">{m.label}</span>
                <m.icon className="size-5 text-secondary" aria-hidden="true" />
              </div>
              <div className="font-display text-headline-lg tracking-tight transition-colors group-hover:text-secondary">
                {m.value}
                <span className="text-headline-sm font-normal text-on-surface-variant">{m.unit}</span>
              </div>
              <div className="mt-space-xs text-body-md">{m.title}</div>
              <p className="mt-space-xs text-body-sm text-on-surface-variant">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-surface-container-lowest py-space-xl">
        <div className="wrap">
          <SectionHead eyebrow="Curatorial & Venue Services" title="핵심 큐레이토리얼 서비스">
            <p className="max-w-md text-body-md text-on-surface-variant">공간의 단순 대여를 넘어, 건축과 테크놀로지, 동시대 예술이 융합된 종합적인 예술 프로덕션 솔루션을 제공합니다.</p>
          </SectionHead>
          <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <div key={s.title.join()} className="group flex flex-col justify-between rounded-lg bg-surface-container p-space-md shadow-md transition-colors hover:bg-surface-container-high md:rounded-xl md:p-space-lg">
                <div>
                  <div className="mb-space-lg flex size-12 items-center justify-center rounded-full bg-surface-container-highest text-secondary transition-colors group-hover:bg-secondary group-hover:text-on-secondary">
                    <s.icon className="size-6" aria-hidden="true" />
                  </div>
                  <Eyebrow className="mb-space-xs">Service 0{i + 1}</Eyebrow>
                  <h3 className="mb-space-sm font-display text-headline-sm leading-tight md:text-headline-md">
                    {s.title[0]}
                    <br />
                    {s.title[1]}
                  </h3>
                  <p className="mb-space-md text-body-sm leading-relaxed text-on-surface-variant">{s.desc}</p>
                </div>
                <ul className="flex flex-col gap-space-xs border-t border-outline-variant/20 pt-space-md text-label-sm text-on-surface-variant">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-space-xs">
                      <Check className="size-3.5 text-secondary" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOOR GUIDE */}
      <section id="floors" className="wrap scroll-mt-24 py-space-xl">
        <SectionHead eyebrow="Architectural Matrix (B1 — 3F)" title="공간 인터랙티브 층별 가이드" desc="지하 1층 미디어 암실부터 지상 3층 펜트하우스 살롱까지, 용도에 따라 유기적으로 분할 및 결합되는 4단계 입체 스페이스." />
        <FloorGuide />
      </section>

      {/* ACCESS */}
      <section className="bg-surface-container-lowest py-space-xl">
        <div className="wrap">
          <SectionHead eyebrow="Access, Transit & Operation Protocol" title="위치 안내 및 VIP 주차 서비스" desc="서울숲역에서 도보 3분, 강남 압구정에서 차량 10분. 서울 도심과 가장 긴밀하게 연결된 문화 랜드마크." />
          <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12">
            <div className="flex flex-col gap-space-md lg:col-span-6">
              <div className="relative h-80 overflow-hidden rounded-xl bg-surface-container shadow-md">
                <Image src="/images/map.webp" alt="서울숲 일대 지도" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-70" />
                <span className="absolute top-space-md left-space-md rounded-full bg-surface-container-lowest/90 px-space-md py-space-xs text-label-sm uppercase tracking-wider text-secondary backdrop-blur-md">Seoul Forest Cultural District</span>
                <div className="absolute right-space-md bottom-space-md left-space-md flex flex-wrap items-center justify-between gap-space-xs rounded-lg bg-surface-container-lowest/90 p-space-sm backdrop-blur-md">
                  <span className="flex items-center gap-space-xs text-body-sm">
                    <MapPin className="size-5 shrink-0 text-secondary" aria-hidden="true" />
                    {site.address} ({site.addressDetail})
                  </span>
                  <a href={mapLinks.naver} target="_blank" rel="noreferrer" className="flex min-h-10 items-center gap-1 px-2 text-label-sm text-secondary hover:underline">
                    지도 앱 <ExternalLink className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">(새 창)</span>
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-space-md text-body-sm sm:grid-cols-2">
                {[
                  { icon: TrainFront, label: "Subway Network", rows: [["수인분당선 서울숲역", "4번 출구 도보 3분"], ["2호선 뚝섬역", "8번 출구 도보 8분"]] },
                  { icon: Car, label: "Road & Highway", rows: [["성수대교 진입", "압구정/청담 8분 소요"], ["강변북로/동부간선", "성수 진출로에서 3분"]] },
                ].map((c) => (
                  <div key={c.label} className="rounded-lg bg-surface-container p-space-md">
                    <div className="mb-space-xs flex items-center gap-space-xs text-secondary">
                      <c.icon className="size-4" aria-hidden="true" />
                      <span className="text-label-sm uppercase tracking-wider">{c.label}</span>
                    </div>
                    {c.rows.map(([k, v]) => (
                      <p key={k} className="text-on-surface-variant">
                        <strong className="font-medium text-on-surface">{k}:</strong> {v}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between gap-space-md lg:col-span-6">
              <div className="rounded-lg bg-surface-container p-space-md md:rounded-xl md:p-space-lg">
                <div className="mb-space-md flex items-center justify-between gap-space-sm">
                  <div>
                    <Eyebrow className="mb-space-xs">Exclusive Logistics</Eyebrow>
                    <h3 className="font-display text-headline-sm md:text-headline-md">VIP 발렛 및 180대 동시 주차 시설</h3>
                  </div>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                    <ParkingSquare className="size-5" aria-hidden="true" />
                  </div>
                </div>
                <div className="my-space-sm grid grid-cols-2 gap-space-md rounded-lg bg-surface-container-low p-space-md text-body-sm">
                  <div>
                    <div className="text-label-sm uppercase text-on-surface-variant">지하 주차 수용량</div>
                    <div className="mt-1 font-display text-headline-md text-secondary">180 대</div>
                    <div className="mt-1 text-[11px] text-on-surface-variant">대형 SUV 및 의전 차량 전용 광폭 구획 완비</div>
                  </div>
                  <div>
                    <div className="text-label-sm uppercase text-on-surface-variant">VIP 드롭존 & 발렛</div>
                    <div className="mt-1 font-display text-headline-md">Dedicated</div>
                    <div className="mt-1 text-[11px] text-on-surface-variant">지하 1층 VIP 라운지 엘리베이터 다이렉트 도킹</div>
                  </div>
                </div>
                <p className="text-body-sm text-on-surface-variant">전시 주최사 및 대관 파트너사를 위한 무료 주차권 지원, 대형 버스 정차 구역, 미술품 운송 전용 5톤 무진동 화물 차량 도크를 운영합니다.</p>
              </div>
              <div className="rounded-lg bg-surface-container p-space-md md:rounded-xl md:p-space-lg">
                <Eyebrow className="mb-space-xs">Desk & Curatorial Hours</Eyebrow>
                <h3 className="mb-space-md font-display text-headline-sm md:text-headline-md">운영 시간 및 큐레이토리얼 데스크</h3>
                <dl className="flex flex-col text-body-sm">
                  {desk.map(([k, v], i) => (
                    <div key={k} className={`flex flex-wrap items-center justify-between gap-x-space-sm py-space-xs ${i < desk.length - 1 ? "border-b border-outline-variant/20" : ""}`}>
                      <dt>{k}</dt>
                      <dd className="text-label-md text-secondary">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wrap py-space-xl">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-surface-container-lowest via-surface-container to-surface-container-high p-space-md shadow-2xl md:rounded-xl md:p-space-xl">
          <div className="relative flex flex-col gap-space-lg lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow dot className="mb-space-sm">Partnership Inquiry • Dossier Archive</Eyebrow>
              <h2 className="mb-space-sm font-display text-headline-lg-mobile tracking-tight md:text-headline-lg">당신의 예술적 비전을 서울라이티움에서 실현하세요</h2>
              <p className="text-body-md leading-relaxed text-on-surface-variant">전시, 브랜드 익스피리언스, 하이엔드 런칭 쇼를 위한 최적의 공간 솔루션. 전담 시니어 큐레이터가 테크니컬 라이더 검토 및 일정 조율을 도와드립니다.</p>
            </div>
            <div className="flex shrink-0 flex-col gap-space-md sm:flex-row sm:items-center">
              <Link href="/rental/" className={btnSoft}>
                대관 요율 보기
              </Link>
              <Link href="/booking/" className={btnGold}>
                <CalendarDays className="size-4" aria-hidden="true" />
                1:1 전담 큐레이터 상담 신청
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
