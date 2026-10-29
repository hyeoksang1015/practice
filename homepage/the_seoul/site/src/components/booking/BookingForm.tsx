"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, CircleAlert, Clapperboard, CloudUpload, Gavel, ListChecks, Lock, Moon, Network, Palette, Phone, Clock, Sparkles, Store, X } from "lucide-react";
import { useRef, useState, type DragEvent, type FormEvent, type ReactNode } from "react";
import { eventTypes, site, venueById, venues, visitorRanges, won } from "@/data/site";
import { receiptNo, todayKst, UPLOAD_EXT, validateBooking, type BookingErrors, type BookingForm as Form } from "@/lib/booking";
import { daysBetween, estimate, MIN_DAYS } from "@/lib/rental";
import { useNow } from "@/lib/useNow";
import { btnGold, btnPrimary, field, FieldError } from "../ui";

const eventIcons = [Store, Palette, Network, Clapperboard, Sparkles];
const stepCard = "rounded-lg bg-surface-container p-space-md md:rounded-xl md:p-space-lg";
// 오류가 난 칸 중 화면 위쪽부터 초점을 옮기기 위한 순서
const order: (keyof BookingErrors)[] = ["company", "bizNo", "manager", "tel", "email", "eventType", "spaces", "start", "end", "files", "agreeRules", "agreePrivacy"];

const addDays = (day: string, n: number) => new Date(Date.parse(day) + n * 86_400_000).toISOString().slice(0, 10);
const mb = (n: number) => `${(n / 1024 / 1024).toFixed(1)}MB`;

function Step({ no, title, desc, children, aside }: { no: string; title: string; desc: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <fieldset className={stepCard}>
      <div className="mb-space-md flex flex-wrap items-start justify-between gap-space-sm">
        <div className="flex items-start gap-space-sm">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-container-highest font-display text-body-md text-secondary">{no}</span>
          <div>
            <legend className="font-display text-headline-sm md:text-headline-md">{title}</legend>
            <p className="text-body-sm text-on-surface-variant">{desc}</p>
          </div>
        </div>
        {aside}
      </div>
      {children}
    </fieldset>
  );
}

export default function BookingForm() {
  const q = useSearchParams();
  const now = useNow();
  const preVenue = venueById(q.get("venue") ?? "")?.id;
  const hintDays = Number(q.get("days")) >= MIN_DAYS ? Number(q.get("days")) : null;
  const summer = q.get("season") === "summer";

  const [f, setF] = useState<Form>({
    company: "", bizNo: "", manager: "", dept: "", tel: "", email: "",
    eventType: eventTypes[0].value, spaces: [preVenue ?? "g1"], start: "", end: "",
    overnight: false, visitors: visitorRanges[2], notes: "", agreeRules: false, agreePrivacy: false,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [drag, setDrag] = useState(false);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [done, setDone] = useState<{ no: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));
  const toggleSpace = (id: string) => set("spaces", f.spaces.includes(id) ? f.spaces.filter((s) => s !== id) : [...f.spaces, id]);
  const onStart = (v: string) => setF((p) => ({ ...p, start: v, end: !p.end && hintDays && v ? addDays(v, hintDays - 1) : p.end }));
  // 목록을 바로 배열로 옮긴다. input 값을 비우면 FileList 도 비워지기 때문이다.
  const addFiles = (list: FileList | null) => {
    const picked = Array.from(list ?? []);
    setFiles((p) => [...p, ...picked]);
  };
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    addFiles(e.dataTransfer.files);
  };

  const today = now ? todayKst(now) : "";
  const days = daysBetween(f.start, f.end);
  const quote = days ? estimate(f.spaces, days, summer) : null;
  const filled = [f.company && f.bizNo && f.manager && f.tel && f.email, f.eventType, f.spaces.length, f.start && f.end, f.agreeRules && f.agreePrivacy].filter(Boolean).length;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = validateBooking(f, todayKst(), files);
    setErrors(next);
    const first = order.find((k) => next[k]);
    if (first) {
      document.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    // 서버가 없는 시안이라 여기서 접수번호만 만든다. 실제 운영 시 이 자리에서 API 로 보낸다.
    setDone({ no: receiptNo(new Date()) });
    topRef.current?.scrollIntoView({ block: "start" });
  };

  const err = (k: keyof BookingErrors) => ({ "data-field": k, "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `bk-${k}-err` : undefined });
  const text = (k: "company" | "bizNo" | "manager" | "dept" | "tel" | "email", label: string, extra: object = {}, required = true) => (
    <label className="flex flex-col gap-1 text-label-md text-on-surface-variant">
      <span>
        {label} {required && <span className="text-secondary">*</span>}
      </span>
      <input value={f[k]} onChange={(e) => set(k, e.target.value)} className={field} {...(required ? err(k) : {})} {...extra} />
      <FieldError id={`bk-${k}-err`} msg={errors[k]} />
    </label>
  );

  const pickedNames = f.spaces.map((id) => venueById(id)).filter((v) => v !== undefined);

  return (
    <div ref={topRef} className="grid scroll-mt-24 grid-cols-1 items-start gap-space-lg lg:grid-cols-12">
      {/* 접수 요약: 데스크톱은 왼쪽에 붙어 따라오고, 모바일은 폼 아래에 둔다 */}
      <aside className="order-last flex flex-col gap-space-md lg:sticky lg:top-24 lg:order-first lg:col-span-4">
        <div className="rounded-lg bg-surface-container-high p-space-md shadow-xl md:rounded-xl md:p-space-lg">
          <div className="mb-space-sm flex items-center justify-between text-label-sm">
            <span className="uppercase tracking-widest text-secondary">Protocol 01-05</span>
            <span data-testid="progress" className="rounded-full bg-surface-container-highest px-space-sm py-0.5 text-on-surface">
              진행률 {done ? 100 : filled * 20}%
            </span>
          </div>
          <div className="font-display text-headline-sm md:text-headline-md">접수 요약</div>
          <p className="text-body-sm text-on-surface-variant">심의 위원회 접수를 위한 단계별 정보</p>
          <dl className="mt-space-md flex flex-col gap-space-sm rounded-lg bg-surface-container-lowest p-space-md text-body-sm">
            <div>
              <dt className="flex justify-between text-label-sm text-on-surface-variant">
                선택 공간 <span className="text-secondary">{f.spaces.length}개 공간 선택됨</span>
              </dt>
              <dd className="mt-space-xs flex flex-wrap gap-1">
                {pickedNames.length ? (
                  pickedNames.map((v) => (
                    <span key={v.id} className="rounded-full bg-surface-container-high px-space-sm py-0.5 text-label-sm">
                      {v.name} ({v.area.toLocaleString()}㎡)
                    </span>
                  ))
                ) : (
                  <span className="text-on-surface-variant">선택된 공간이 없습니다</span>
                )}
              </dd>
            </div>
            <div className="flex justify-between gap-space-sm border-t border-white/6 pt-space-sm">
              <dt className="text-on-surface-variant">행사 목적</dt>
              <dd className="text-right">{f.eventType}</dd>
            </div>
            <div className="flex justify-between gap-space-sm">
              <dt className="text-on-surface-variant">일일 예상 객수</dt>
              <dd className="text-right">{f.visitors}</dd>
            </div>
            <div className="flex justify-between gap-space-sm">
              <dt className="text-on-surface-variant">점유 기간</dt>
              <dd className="text-right tabular-nums">{days ? `${days}일` : hintDays ? `${hintDays}일 (견적 기준)` : "—"}</dd>
            </div>
            <div className="border-t border-white/6 pt-space-sm">
              <dt className="text-label-sm text-on-surface-variant">예상 기본 대관료 (VAT 별도{summer ? " · 하절기" : ""})</dt>
              <dd data-testid="booking-quote" className="mt-1 font-display text-headline-sm tabular-nums text-secondary">
                {quote && days! >= MIN_DAYS ? won(quote.total) : days ? "30일 미만은 별도 문의" : "일정을 선택해 주세요"}
              </dd>
            </div>
          </dl>
          <div className="mt-space-md">
            <span className="text-label-sm uppercase tracking-widest text-on-surface-variant">심의 절차 안내 (Review Timeline)</span>
            <ol className="mt-space-sm flex flex-col gap-space-sm text-body-sm">
              {[
                { icon: Clock, t: "신청 접수 및 서류 검토", d: "영업일 기준 48시간 내 1차 적합성 회신" },
                { icon: Gavel, t: "공간 심의 위원회 심사", d: "기획 의도, 안전 관리 계획, 공간 가치 평가" },
                { icon: ListChecks, t: "대관 계약 체결 및 현장 답사", d: "계약금 30% 납부 및 전담 테크니컬 매니저 배정" },
              ].map((s) => (
                <li key={s.t} className="flex gap-space-sm">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-secondary">
                    <s.icon className="size-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block">{s.t}</span>
                    <span className="block text-label-sm text-on-surface-variant">{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-space-md flex items-center justify-between gap-space-sm rounded-lg bg-surface-container p-space-sm">
            <span className="flex items-center gap-space-sm">
              <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-on-secondary">
                <Phone className="size-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-label-sm text-on-surface-variant">대관 총괄 직통 지원</span>
                <a href={`tel:${site.rentalPhone}`} className="font-display text-headline-sm hover:text-secondary">
                  {site.rentalPhone}
                </a>
              </span>
            </span>
            <span className="text-right text-label-sm text-on-surface-variant">
              평일 10:00 - 18:00
              <br />
              점심 12:30 - 13:30
            </span>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-surface-container md:rounded-xl">
          <div className="relative h-44">
            <Image src="/images/booking-dock.webp" alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
          </div>
          <div className="p-space-md">
            <span className="text-label-sm uppercase tracking-widest text-secondary">Seoul Forest Cultural Core</span>
            <p className="mt-1 text-body-sm text-on-surface-variant">서울숲과 직결된 대형 하역 데크(11t 윙바디 진입 가능)와 독립된 VIP 전용 로비 및 드롭오프 존을 완비하고 있습니다.</p>
          </div>
        </div>
      </aside>

      <div className="lg:col-span-8">
        {done ? (
          <div data-testid="booking-done" className={`${stepCard} flex flex-col items-center gap-space-md py-space-xl text-center`}>
            <CheckCircle2 className="size-12 text-secondary" aria-hidden="true" />
            <h2 className="font-display text-headline-md">대관 신청서가 접수되었습니다</h2>
            <p className="font-display text-headline-lg-mobile tracking-wide text-secondary tabular-nums md:text-headline-lg">{done.no}</p>
            <p className="max-w-lg text-body-md text-on-surface-variant">
              {f.company} ({f.manager} 님)의 대관 심의 신청서를 받았습니다. 영업일 기준 48시간 안에 {f.email} 로 1차 심의 결과와 전담 매니저 연락처를 보내 드립니다.
            </p>
            <p className="text-body-sm text-outline">
              {pickedNames.map((v) => v.name).join(", ")} · {f.start.replaceAll("-", ".")} — {f.end.replaceAll("-", ".")} ({days}일)
            </p>
            <button
              type="button"
              onClick={() => {
                setDone(null);
                setFiles([]);
                set("agreeRules", false);
                set("agreePrivacy", false);
              }}
              className={btnPrimary}
            >
              새 신청서 작성
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="flex flex-col gap-space-md" aria-label="대관 신청서">
            <Step no="01" title="신청자 및 주관사 정보" desc="대관 계약 및 심의 회신을 수신할 공식 담당자 명의를 기입하십시오.">
              <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
                {text("company", "기업 / 단체명", { placeholder: "예: (주)아틀리에 서울", autoComplete: "organization" })}
                {text("bizNo", "사업자등록번호", { placeholder: "000-00-00000", inputMode: "numeric" })}
                {text("manager", "담당자 성함", { placeholder: "홍길동", autoComplete: "name" })}
                {text("dept", "직책 / 소속 부서", { placeholder: "예: 브랜드 익스피리언스팀 팀장", autoComplete: "organization-title" }, false)}
                {text("tel", "연락처 (휴대전화)", { placeholder: "010-0000-0000", type: "tel", inputMode: "tel", autoComplete: "tel" })}
                {text("email", "공식 회신 이메일", { placeholder: "curator@brand.co.kr", type: "email", autoComplete: "email" })}
              </div>
            </Step>

            <Step no="02" title="행사 유형 및 목적" desc="프로젝트 성격에 맞는 카테고리를 선택해 주십시오. (단일 선택)">
              <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2 lg:grid-cols-3">
                {eventTypes.map((t, i) => {
                  const Icon = eventIcons[i];
                  const on = f.eventType === t.value;
                  return (
                    <label key={t.value} className={`relative flex cursor-pointer flex-col gap-space-xs rounded-lg border p-space-md transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-secondary ${on ? "border-secondary/60 bg-surface-container-high" : "border-white/8 hover:bg-surface-container-high"}`}>
                      <input type="radio" name="eventType" value={t.value} checked={on} onChange={() => set("eventType", t.value)} className="sr-only" {...(i === 0 ? err("eventType") : {})} />
                      <span className="flex items-center justify-between">
                        <Icon className="size-5 text-secondary" aria-hidden="true" />
                        <span className={`flex size-5 items-center justify-center rounded-full ${on ? "bg-secondary" : "bg-surface-container-highest"}`} aria-hidden="true">
                          {on && <span className="size-2 rounded-full bg-on-secondary" />}
                        </span>
                      </span>
                      <span className="text-body-md font-medium">{t.value}</span>
                      <span className="text-label-sm text-on-surface-variant">{t.desc}</span>
                    </label>
                  );
                })}
              </div>
            </Step>

            <Step no="03" title="희망 대관 공간" desc="다중 선택이 가능하며, 전체 복합 대관도 지원합니다." aside={<span className="rounded-full bg-surface-container-highest px-space-sm py-1 text-label-sm text-secondary">전관 {venues.reduce((s, v) => s + v.area, 0).toLocaleString()}㎡ 통합 연계 가능</span>}>
              <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2 lg:grid-cols-3">
                {venues.map((v, i) => {
                  const on = f.spaces.includes(v.id);
                  return (
                    <label key={v.id} className={`flex cursor-pointer flex-col gap-1 rounded-lg border p-space-md transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-secondary ${on ? "border-secondary/60 bg-surface-container-high" : "border-white/8 hover:bg-surface-container-high"}`}>
                      <input type="checkbox" checked={on} onChange={() => toggleSpace(v.id)} className="sr-only" {...(i === 0 ? err("spaces") : {})} />
                      <span className="flex items-center justify-between">
                        <span className="text-label-sm uppercase tracking-wider text-secondary">{v.floor} · {v.en}</span>
                        <span className={`flex size-5 items-center justify-center rounded-md text-[12px] ${on ? "bg-secondary text-on-secondary" : "bg-surface-container-highest text-transparent"}`} aria-hidden="true">
                          ✓
                        </span>
                      </span>
                      <span className="font-display text-body-lg">{v.name}</span>
                      <span className="text-label-sm text-on-surface-variant">
                        면적 {v.area.toLocaleString()}㎡ (약 {v.pyeong}평)
                      </span>
                      <span className="mt-1 flex justify-between text-label-sm text-on-surface-variant">
                        <span>층고 {v.ceiling}m</span>
                        <span>수용 {v.capacity.toLocaleString()}명</span>
                      </span>
                    </label>
                  );
                })}
              </div>
              <FieldError id="bk-spaces-err" msg={errors.spaces} />
            </Step>

            <Step no="04" title="일정 및 관람 인원 규모" desc="설치(셋업) 및 철수 기간을 포함한 전체 점유 일정을 설정하십시오.">
              <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
                <label className="flex flex-col gap-1 text-label-md text-on-surface-variant">
                  <span>
                    행사 개시(설치 시작) 희망일 <span className="text-secondary">*</span>
                  </span>
                  <input type="date" value={f.start} min={today ? addDays(today, 1) : undefined} onChange={(e) => onStart(e.target.value)} className={field} {...err("start")} />
                  <FieldError id="bk-start-err" msg={errors.start} />
                </label>
                <label className="flex flex-col gap-1 text-label-md text-on-surface-variant">
                  <span>
                    행사 종료(원상 복구) 희망일 <span className="text-secondary">*</span>
                  </span>
                  <input type="date" value={f.end} min={f.start || undefined} onChange={(e) => set("end", e.target.value)} className={field} {...err("end")} />
                  <FieldError id="bk-end-err" msg={errors.end} />
                </label>
              </div>
              {hintDays && <p className="mt-space-xs px-space-sm text-label-sm text-secondary">계산기에서 고른 {hintDays}일 기준으로 종료일이 자동 입력됩니다. 필요하면 바꿔 주세요.</p>}
              <label className="mt-space-md flex cursor-pointer items-center justify-between gap-space-md rounded-full bg-surface-container-lowest px-space-md py-space-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-secondary">
                <span className="flex items-center gap-space-xs text-body-sm">
                  <Moon className="size-4 text-secondary" aria-hidden="true" />
                  야간 셋업 및 특수 철수 사전 협의 필요
                </span>
                <input type="checkbox" role="switch" checked={f.overnight} onChange={(e) => set("overnight", e.target.checked)} className="peer sr-only" />
                <span className="relative h-6 w-11 shrink-0 rounded-full bg-surface-container-highest transition-colors peer-checked:bg-secondary after:absolute after:top-1 after:left-1 after:size-4 after:rounded-full after:bg-on-surface after:transition-transform peer-checked:after:translate-x-5" aria-hidden="true" />
              </label>
              <fieldset className="mt-space-md">
                <legend className="mb-space-xs text-label-md text-on-surface-variant">일일 예상 방문객 수</legend>
                <div className="grid grid-cols-2 gap-space-xs md:grid-cols-4">
                  {visitorRanges.map((r) => (
                    <label key={r} className="flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-surface-container-high px-space-sm text-center text-label-md text-on-surface-variant transition-colors has-[:checked]:bg-secondary has-[:checked]:text-on-secondary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-secondary">
                      <input type="radio" name="visitors" value={r} checked={f.visitors === r} onChange={() => set("visitors", r)} className="sr-only" />
                      {r}
                    </label>
                  ))}
                </div>
              </fieldset>
            </Step>

            <Step no="05" title="기획서 첨부 및 부대시설 요청" desc="행사 제안서, 공간 배치안, 기술 사양서를 첨부하십시오.">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDrag(true);
                }}
                onDragLeave={() => setDrag(false)}
                onDrop={onDrop}
                className={`flex flex-col items-center gap-space-xs rounded-lg border border-dashed p-space-lg text-center transition-colors ${drag ? "border-secondary bg-surface-container-high" : "border-white/15 bg-surface-container-lowest"}`}
              >
                <CloudUpload className="size-8 text-secondary" aria-hidden="true" />
                <span className="text-body-md">행사 기획서 / 공간 배치도</span>
                <span className="text-body-sm text-on-surface-variant">{UPLOAD_EXT.join(", ").toUpperCase()} · 합계 최대 50MB · 여러 파일 가능</span>
                <button type="button" onClick={() => fileRef.current?.click()} data-field="files" aria-describedby={errors.files ? "bk-files-err" : undefined} className="mt-space-xs inline-flex min-h-10 items-center rounded-full bg-surface-container-highest px-space-md text-label-md text-secondary hover:bg-surface-bright">
                  내 컴퓨터에서 파일 선택
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  accept={UPLOAD_EXT.join(",")}
                  onChange={(e) => {
                    addFiles(e.target.files);
                    e.target.value = "";
                  }}
                  className="sr-only"
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </div>
              {files.length > 0 && (
                <ul data-testid="file-list" className="mt-space-sm flex flex-wrap gap-space-xs">
                  {files.map((file, i) => (
                    <li key={`${file.name}-${i}`} className="flex items-center gap-1 rounded-full bg-surface-container-highest py-1 pr-1 pl-space-sm text-label-sm text-secondary">
                      {file.name} ({mb(file.size)})
                      <button type="button" onClick={() => setFiles((p) => p.filter((_, j) => j !== i))} aria-label={`${file.name} 빼기`} className="flex size-7 items-center justify-center rounded-full hover:bg-surface-bright">
                        <X className="size-3.5" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <FieldError id="bk-files-err" msg={errors.files} />
              <p className="mt-space-xs px-space-sm text-label-sm text-outline">시안에서는 파일 이름과 크기만 확인하며, 파일은 어디에도 전송되지 않습니다.</p>

              <label className="mt-space-md flex flex-col gap-1 text-label-md text-on-surface-variant">
                특수 전력, VIP 케이터링 및 시설 지원 요청사항
                <textarea value={f.notes} onChange={(e) => set("notes", e.target.value)} rows={4} placeholder="예: 삼상 380V 80kW 추가 간선 포설 요청, 테라스 구역 핑거푸드 케이터링 부스 운영..." className="w-full rounded-lg border border-white/12 bg-surface-container-lowest p-space-md text-base text-on-surface outline-none placeholder:text-outline focus:border-secondary sm:text-body-md" />
              </label>

              <div className="mt-space-md flex flex-col gap-space-sm">
                {(
                  [
                    ["agreeRules", <>[필수] <strong className="text-on-surface">더 서울라이티움 대관 규약</strong> 및 시설 보전 지침을 확인하였으며 이에 동의합니다.</>],
                    ["agreePrivacy", <>[필수] 심의 안내 및 계약 진행을 위한 <strong className="text-on-surface">개인정보 수집 및 이용(3년 보관)</strong>에 동의합니다.</>],
                  ] as const
                ).map(([k, label]) => (
                  <div key={k}>
                    <label className="flex cursor-pointer items-start gap-space-sm text-body-sm text-on-surface-variant">
                      <input type="checkbox" checked={f[k]} onChange={(e) => set(k, e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-secondary" {...err(k)} />
                      <span>{label}</span>
                    </label>
                    <FieldError id={`bk-${k}-err`} msg={errors[k]} />
                  </div>
                ))}
                <a href="#regulations" className="self-start text-label-sm text-secondary underline-offset-4 hover:underline">
                  대관 규약 전문 보기
                </a>
              </div>

              <div className="mt-space-lg flex flex-col gap-space-sm border-t border-white/6 pt-space-md sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-2 text-label-sm text-on-surface-variant">
                  <Lock className="size-4 text-secondary" aria-hidden="true" />
                  시안용 접수 화면 · 입력 내용은 저장되지 않습니다
                </span>
                <button type="submit" className={btnGold}>
                  대관 신청서 공식 접수하기 <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
              {Object.keys(errors).length > 0 && (
                <p role="alert" className="mt-space-sm flex items-center gap-2 text-body-sm text-error">
                  <CircleAlert className="size-4" aria-hidden="true" />
                  입력하지 않았거나 확인이 필요한 항목이 {Object.keys(errors).length}개 있습니다.
                </p>
              )}
            </Step>
          </form>
        )}
      </div>
    </div>
  );
}
