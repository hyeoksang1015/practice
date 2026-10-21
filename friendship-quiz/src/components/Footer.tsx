import { href, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";
import PageLink from "./PageLink";

export default function Footer({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const links = [
    { path: "/about/", label: t.nav.about },
    { path: "/privacy/", label: t.nav.privacy },
    { path: "/contact/", label: t.nav.contact },
  ];
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-3xl px-5 py-6 text-sm text-muted">
        <nav aria-label={t.nav.siteInfo} className="flex flex-wrap gap-x-2">
          {links.map((l) => (
            <PageLink key={l.path} href={href(lang, l.path)} className="flex min-h-12 items-center px-2 font-semibold hover:underline">
              {l.label}
            </PageLink>
          ))}
        </nav>
        <p className="mt-2 px-2">{t.footer.disclaimer(t.site.name)}</p>
      </div>
    </footer>
  );
}
