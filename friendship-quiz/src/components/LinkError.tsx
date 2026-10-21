import { href, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";
import type { LinkErrorReason } from "@/lib/payload";
import PageLink from "./PageLink";

type Reason = LinkErrorReason | "incomplete";

// 잘못된 초대·결과 링크 안내. 이유를 알려 주고 돌아갈 길을 준다.
export default function LinkError({ reason, inviteHref, lang }: { reason: Reason; inviteHref?: string; lang: Locale }) {
  const t = getDict(lang).linkError;
  const { title, body } = t[reason];
  return (
    <div className="card text-center" role="alert">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-3 leading-7 text-muted">{body}</p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        {inviteHref && (
          <PageLink href={inviteHref} className="btn btn-primary">
            {t.answerInvite}
          </PageLink>
        )}
        <PageLink href={href(lang, "/tests/")} className={`btn ${inviteHref ? "btn-ghost" : "btn-primary"}`}>
          {t.newTest}
        </PageLink>
        <PageLink href={href(lang, "/")} className="btn btn-ghost">
          {t.home}
        </PageLink>
      </div>
    </div>
  );
}
