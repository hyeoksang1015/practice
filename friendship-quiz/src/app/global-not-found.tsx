import type { Metadata } from "next";
import ClarityTag from "@/components/ClarityTag";
import PageLink from "@/components/PageLink";
import RootShell from "@/components/RootShell";
import { HTML_LANG, LOCALES, href } from "@/i18n/config";
import { getDict } from "@/i18n/ui";

// 어느 라우트에도 맞지 않는 주소의 404 화면(루트 레이아웃이 둘이라 전역 404를 따로 둔다).
// 어느 언어 사용자가 들어올지 모르므로 네 언어 안내를 모두 보여 준다. 광고 코드는 넣지 않는다(GA·Clarity는 넣는다).
export const metadata: Metadata = {
  title: `404 | ${getDict("ko").site.name}`,
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <RootShell lang="ko">
      <ClarityTag />
      <div className="card space-y-8 text-center">
        <p className="text-sm font-bold text-brand">404</p>
        {LOCALES.map((lang) => {
          const t = getDict(lang).notFound;
          return (
            <section key={lang} lang={HTML_LANG[lang]}>
              <h1 className="text-2xl font-bold">{t.title}</h1>
              <p className="mt-2 leading-7 text-muted">{t.body}</p>
              <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
                <PageLink href={href(lang, "/")} className="btn btn-primary">
                  {t.home}
                </PageLink>
                <PageLink href={href(lang, "/tests/")} className="btn btn-ghost">
                  {t.tests}
                </PageLink>
              </div>
            </section>
          );
        })}
      </div>
    </RootShell>
  );
}
