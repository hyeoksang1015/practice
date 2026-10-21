import { pageMeta, site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";

interface ContactText {
  title: string;
  description: (site: string) => string;
  intro: string;
  items: string[];
  howTitle: string;
  email: string;
  replyNote: string;
  notReady: string;
}

const TEXT: Record<Locale, ContactText> = {
  ko: {
    title: "문의",
    description: (s) => `${s}의 오류 제보, 질문·해설에 대한 의견, 기타 문의 방법을 안내합니다.`,
    intro: "테스트를 하다가 불편했던 점이나 고쳤으면 하는 표현이 있다면 알려 주세요. 다음과 같은 내용을 환영합니다.",
    items: [
      "버튼이 눌리지 않거나 화면이 깨지는 등의 오류 제보 (사용한 기기와 브라우저를 함께 적어 주시면 도움이 됩니다)",
      "질문이나 결과 해설 중 어색하거나 불편하게 느껴진 표현",
      "새로 만들어졌으면 하는 테스트 주제",
    ],
    howTitle: "문의 방법",
    email: "이메일",
    replyNote: "개인 운영 사이트라 답변까지 며칠 걸릴 수 있습니다.",
    notReady: "아직 문의 창구가 마련되지 않았습니다. 운영자가 문의용 이메일을 정하는 대로 이 페이지에 안내하겠습니다.",
  },
  en: {
    title: "Contact",
    description: (s) => `How to report bugs, share feedback on questions and explanations, or get in touch with ${s}.`,
    intro: "If something was inconvenient while taking a test, or there's wording you'd like changed, please let us know. We welcome:",
    items: [
      "Bug reports, such as buttons that don't respond or broken layouts (mentioning your device and browser helps)",
      "Wording in the questions or results that felt awkward or uncomfortable",
      "Ideas for new test topics",
    ],
    howTitle: "How to contact us",
    email: "Email",
    replyNote: "This site is run by an individual, so replies may take a few days.",
    notReady: "A contact channel isn't available yet. We'll post an email address on this page as soon as the operator sets one up.",
  },
  ja: {
    title: "お問い合わせ",
    description: (s) => `「${s}」への不具合の報告、質問や解説へのご意見、その他のお問い合わせ方法をご案内します。`,
    intro: "テスト中に不便だったことや、直してほしい表現があれば教えてください。次のような内容を歓迎します。",
    items: [
      "ボタンが押せない、画面が崩れるなどの不具合の報告（使った端末とブラウザも書いていただけると助かります）",
      "質問や結果の解説で、不自然・不快に感じた表現",
      "新しく作ってほしいテストのテーマ",
    ],
    howTitle: "お問い合わせ方法",
    email: "メール",
    replyNote: "個人で運営しているサイトのため、お返事まで数日かかることがあります。",
    notReady: "まだお問い合わせ窓口は用意できていません。運営者が問い合わせ用のメールアドレスを決めしだい、このページでお知らせします。",
  },
  zh: {
    title: "联系我们",
    description: (s) => `介绍向「${s}」反馈错误、对问题和解读提出意见，以及其他联系方式。`,
    intro: "如果在测试中遇到不便，或有希望修改的表达，欢迎告诉我们。我们欢迎以下内容：",
    items: [
      "按钮无法点击、页面显示错乱等错误反馈（注明所用设备和浏览器会很有帮助）",
      "问题或结果解读中让你觉得别扭或不舒服的表达",
      "希望新增的测试主题",
    ],
    howTitle: "联系方式",
    email: "邮箱",
    replyNote: "本网站由个人运营，回复可能需要几天时间。",
    notReady: "目前还没有设立联系渠道。运营者确定联系邮箱后，会在本页面公布。",
  },
};

export function contactMeta(lang: Locale) {
  const t = TEXT[lang];
  return pageMeta(lang, t.title, t.description(getDict(lang).site.name), "/contact/");
}

export default function ContactPage({ lang }: { lang: Locale }) {
  const t = TEXT[lang];
  return (
    <article className="prose-page">
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <p>{t.intro}</p>
      <ul>
        {t.items.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <h2>{t.howTitle}</h2>
      {site.contactEmail ? (
        <p>
          {t.email}:{" "}
          <a href={`mailto:${site.contactEmail}`} className="text-link">
            {site.contactEmail}
          </a>
          <br />
          {t.replyNote}
        </p>
      ) : (
        <p>{t.notReady}</p>
      )}
    </article>
  );
}
