import { site } from "@/config/site";
import PageLink from "./PageLink";

const links = [
  { href: "/about/", label: "소개" },
  { href: "/privacy/", label: "개인정보 안내" },
  { href: "/contact/", label: "문의" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-3xl px-5 py-6 text-sm text-muted">
        <nav aria-label="사이트 정보" className="flex flex-wrap gap-x-2">
          {links.map((l) => (
            <PageLink key={l.href} href={l.href} className="flex min-h-12 items-center px-2 font-semibold hover:underline">
              {l.label}
            </PageLink>
          ))}
        </nav>
        <p className="mt-2 px-2">
          {site.name}의 결과는 두 사람이 고른 답을 비교한 오락용 결과이며, 심리 진단이 아니고 실제 관계를 판단하지 않습니다.
        </p>
      </div>
    </footer>
  );
}
