import { site } from "@/config/site";
import { href, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";
import LanguageSwitcher from "./LanguageSwitcher";
import PageLink from "./PageLink";

export default function Header({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-4 px-5 py-2">
        <PageLink href={href(lang, "/")} className="flex min-h-12 items-center gap-2 text-xl font-display">
          <span aria-hidden="true">{site.logoMark}</span>
          {t.site.name}
        </PageLink>
        <div className="flex flex-wrap items-center gap-x-1">
          <nav aria-label={t.nav.main} className="flex gap-1 text-sm font-semibold">
            <PageLink href={href(lang, "/tests/")} className="flex min-h-12 items-center rounded-full px-3 hover:bg-peach">
              {t.nav.tests}
            </PageLink>
            <PageLink href={href(lang, "/about/")} className="flex min-h-12 items-center rounded-full px-3 hover:bg-peach">
              {t.nav.about}
            </PageLink>
          </nav>
          <LanguageSwitcher lang={lang} label={t.nav.language} />
        </div>
      </div>
    </header>
  );
}
