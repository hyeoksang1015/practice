import InviteFlow from "@/components/InviteFlow";
import ResultFlow from "@/components/ResultFlow";
import { pageMeta } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";

// 초대·결과 화면. 답변은 주소의 # 뒤에만 있어 서버·검색엔진에 전달되지 않는다. 페이지 자체도 색인하지 않는다.
// 제목·설명은 링크를 메신저에 붙였을 때 받는 사람이 보게 되는 문구다.
export function inviteMeta(lang: Locale) {
  const t = getDict(lang).invitePage;
  return pageMeta(lang, t.title, t.description, "/invite/", { noindex: true });
}

export function resultMeta(lang: Locale) {
  const t = getDict(lang).resultPage;
  return pageMeta(lang, t.title, t.description, "/result/", { noindex: true });
}

export const InvitePage = ({ lang }: { lang: Locale }) => <InviteFlow lang={lang} />;
export const ResultPage = ({ lang }: { lang: Locale }) => <ResultFlow lang={lang} />;
