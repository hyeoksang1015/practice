import Link from "next/link";
import { site } from "@/data/site";

const cols = [
  { title: "Spaces", links: [["제1·제2전시장", "/spaces/#floor-1F"], ["아트리움", "/spaces/#floor-1F"], ["Forest Pavilion", "/spaces/#floor-2F"]] },
  { title: "Inquiries", links: [["대관 규정 및 요율", "/rental/"], ["실시간 견적 계산기", "/rental/#calculator"], ["온라인 대관 접수", "/booking/"]] },
];

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest pb-20 lg:pb-0">
      <div className="wrap flex flex-col gap-space-lg py-space-xl">
        <div className="flex flex-col items-start justify-between gap-space-lg lg:flex-row">
          <div className="max-w-md">
            <div className="mb-space-sm font-display text-headline-md tracking-wider text-on-surface">{site.name}</div>
            <p className="text-body-sm leading-relaxed text-on-surface-variant">서울 성수동 서울숲의 자연과 동시대 전위적 문화 예술이 교차하는 복합 문화 예술 컴플렉스. 조형적 공간 미학과 엄선된 큐레이션을 통해 새로운 예술적 영감을 제시합니다.</p>
          </div>
          <div className="grid grid-cols-2 gap-space-lg text-body-sm">
            {cols.map((c) => (
              <div key={c.title} className="flex flex-col gap-space-xs">
                <span className="mb-space-xs text-label-sm uppercase tracking-widest text-secondary">{c.title}</span>
                {c.links.map(([label, href]) => (
                  <Link key={label} href={href} className="text-on-surface-variant transition-colors hover:text-on-surface">
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-outline-variant/30" />
        <div className="flex flex-col items-start justify-between gap-space-sm text-label-sm text-on-surface-variant md:flex-row md:items-center">
          <div className="flex flex-wrap gap-x-space-md gap-y-space-xs leading-normal">
            <span>
              주소: {site.address} {site.nameKo}
            </span>
            <span>대표전화: {site.phone}</span>
            <span>사업자등록번호: {site.bizNo}</span>
            <span>통신판매업신고: {site.mailOrderNo}</span>
          </div>
          <span>© 2026 {site.name}</span>
        </div>
      </div>
    </footer>
  );
}
