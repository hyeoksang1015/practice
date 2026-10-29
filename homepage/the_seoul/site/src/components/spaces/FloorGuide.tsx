"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { floors, type Floor } from "@/data/site";

type Id = Floor["id"];

const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

// 아이소메트릭 단면도의 층별 좌표 (시안 SVG 그대로). y 는 윗면 꼭짓점 기준.
const blocks: { id: Id; y: number; fill: string; side: [string, string]; stroke: string; text: string }[] = [
  { id: "3F", y: 50, fill: "#20201f", side: ["#181817", "#131313"], stroke: "#e0c298", text: "#e0c298" },
  { id: "2F", y: 150, fill: "#20201f", side: ["#181817", "#131313"], stroke: "#8e9192", text: "#e5e2e1" },
  { id: "1F", y: 250, fill: "#2a2a2a", side: ["#20201f", "#181817"], stroke: "#e0c298", text: "#e0c298" },
  { id: "B1", y: 360, fill: "#111111", side: ["#0e0e0e", "#0a0a0a"], stroke: "#8e9192", text: "#cac6c3" },
];

/** 단면도의 층을 누르거나 목록의 층을 누르면 같은 층이 함께 열린다. 주소 끝의 #floor-1F 같은 해시로도 열 수 있다. */
export default function FloorGuide() {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash, () => "");
  const fromHash = floors.find((f) => hash === `#floor-${f.id}`)?.id;
  const [picked, setPicked] = useState<Id | null>(null);
  const active = picked ?? fromHash ?? "1F";

  // 다른 페이지 링크로 해시가 바뀌면 그 층을 우선한다.
  useEffect(() => subscribe(() => setPicked(null)), []);

  const onKey = (id: Id) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setPicked(id);
    }
  };

  return (
    <div className="grid grid-cols-1 items-start gap-space-lg lg:grid-cols-12">
      <div className="rounded-xl bg-surface-container-low p-space-md shadow-xl md:p-space-lg lg:col-span-5">
        <div className="mb-space-md flex items-center justify-between border-b border-outline-variant/20 pb-space-xs text-label-sm">
          <span className="uppercase tracking-widest text-secondary">Isometric Schematic Section</span>
          <span className="text-on-surface-variant">AXONOMETRIC • 1:200</span>
        </div>
        <svg viewBox="0 0 420 480" className="mx-auto h-auto w-full max-w-sm" role="group" aria-label="층별 단면도">
          <path d="M40 80L380 80M40 180L380 180M40 280L380 280M40 380L380 380" stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.08" />
          <path d="M120 40L120 440M210 40L210 440M300 40L300 440" stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.08" />
          {blocks.map((b) => {
            const f = floors.find((x) => x.id === b.id)!;
            const on = active === b.id;
            const y = b.y;
            const h = b.id === "1F" ? 30 : 20;
            return (
              <g
                key={b.id}
                role="button"
                tabIndex={0}
                aria-label={`${b.id} ${f.title} 보기`}
                aria-pressed={on}
                data-testid={`iso-${b.id}`}
                onClick={() => setPicked(b.id)}
                onKeyDown={onKey(b.id)}
                className="cursor-pointer outline-none [&:focus-visible>polygon:first-child]:stroke-[3]"
              >
                <polygon points={`210,${y} 360,${y + 55} 210,${y + 95} 60,${y + 40}`} fill={on ? "#393939" : b.fill} stroke={b.stroke} strokeWidth={on ? 2 : 1.2} className="transition-colors hover:fill-[#2a2a2a]" />
                <polygon points={`60,${y + 40} 210,${y + 95} 210,${y + 95 + h} 60,${y + 40 + h}`} fill={b.side[0]} stroke={b.stroke} strokeWidth="1" />
                <polygon points={`210,${y + 95} 360,${y + 55} 360,${y + 55 + h} 210,${y + 95 + h}`} fill={b.side[1]} stroke={b.stroke} strokeWidth="1" />
                <text x="210" y={y + 55} fill={b.text} fontFamily="var(--font-syne)" fontSize="11" fontWeight="600" letterSpacing="1" textAnchor="middle" className="pointer-events-none">
                  {f.diagram}
                </text>
              </g>
            );
          })}
          <line x1="60" x2="60" y1="90" y2="420" stroke="#e0c298" strokeDasharray="4 2" />
          {[90, 190, 290, 400].map((cy) => (
            <circle key={cy} cx="60" cy={cy} r="3" fill="#e0c298" />
          ))}
        </svg>
        <div className="mt-space-md flex flex-wrap items-center justify-between gap-2 border-t border-outline-variant/20 pt-space-xs text-label-sm text-on-surface-variant">
          * 층을 누르면 상세 정보가 열립니다
          <span className="text-secondary">Core Service Lift Direct Access</span>
        </div>
      </div>

      <div className="flex flex-col gap-space-sm lg:col-span-7">
        {floors.map((f) => {
          const on = active === f.id;
          return (
            <div key={f.id} id={`floor-${f.id}`} className={`scroll-mt-28 overflow-hidden rounded-lg transition-colors ${on ? "bg-surface-container-high shadow-md" : "bg-surface-container"}`}>
              <button type="button" onClick={() => setPicked(f.id)} aria-expanded={on} aria-controls={`floor-panel-${f.id}`} className="flex w-full items-center justify-between gap-space-sm p-space-md text-left transition-colors hover:bg-surface-container-high">
                <span className="flex items-center gap-space-md">
                  <span className="font-display text-headline-md text-secondary">{f.id}</span>
                  <span>
                    <span className="block font-display text-body-lg md:text-headline-sm">{f.title}</span>
                    <span className={`block text-label-sm uppercase tracking-wider ${on ? "text-secondary" : "text-on-surface-variant"}`}>{f.sub}</span>
                  </span>
                </span>
                <ChevronDown className={`size-5 shrink-0 text-secondary transition-transform ${on ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              <div id={`floor-panel-${f.id}`} hidden={!on} className="px-space-md pt-space-xs pb-space-md">
                <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
                  <div className="relative h-48 overflow-hidden rounded-lg bg-surface-container-lowest">
                    <Image src={f.image} alt={`${f.id} ${f.title}`} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-between text-body-sm text-on-surface-variant">
                    <p>{f.desc}</p>
                    <dl className="mt-space-sm flex flex-col gap-1 rounded-lg bg-surface-container-lowest p-space-sm text-label-sm text-on-surface">
                      {f.specs.map(([k, v], i) => (
                        <div key={k} className="flex justify-between gap-space-sm">
                          <dt>{k}</dt>
                          <dd className={`text-right ${i === 0 ? "text-label-md text-secondary" : ""}`}>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
