import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import { pageMeta } from "@/config/site";
import { categoriesFor } from "@/data/categories";
import { href, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";
import { TEMP_BASE } from "@/lib/analysis";

interface HomeText {
  metaTitle: (site: string) => string;
  heroTop: string;
  heroBottom: string;
  heroBody: string;
  cta: string;
  categoriesTitle: string;
  categoriesBody: string;
  howTitle: string;
  steps: { title: string; body: string }[];
  valueTitle: string;
  canTitle: string;
  can: string[];
  cannotTitle: string;
  cannot: string[];
  aboutLink: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}

const TEXT: Record<Locale, HomeText> = {
  ko: {
    metaTitle: (site) => `${site} - 연인·친구·가족 궁합 테스트`,
    heroTop: "우리 사이는",
    heroBottom: "지금 몇 도일까요?",
    heroBody:
      "같은 질문에 두 사람이 각자 답하면, 답이 얼마나 가까운지를 온도로 보여 드려요. 잘 맞는 부분과 다르게 느낄 수 있는 부분, 오해가 생기기 쉬운 상황과 대화 팁까지 함께 알려 주는 가벼운 관계 테스트입니다.",
    cta: "관계 고르고 시작하기",
    categoriesTitle: "어떤 사이의 온도를 재 볼까요?",
    categoriesBody: "관계마다 질문과 해석이 다릅니다. 함께할 사람과의 사이를 골라 주세요.",
    howTitle: "이용 방법",
    steps: [
      { title: "내가 먼저 답하기", body: "연인, 친구, 가족 중 관계를 고르고 질문에 답해요. 한 사람당 3분 정도면 충분합니다." },
      { title: "초대 링크 보내기", body: "답을 마치면 만들어지는 링크를 상대에게 보내요. 상대는 같은 질문에 자기 답을 고릅니다." },
      { title: "온도 함께 보기", body: "상대가 답을 마치면 두 사람의 온도와 해설이 나와요. 결과 링크로 같은 화면을 함께 볼 수 있습니다." },
    ],
    valueTitle: "결과에서 볼 수 있는 것과 하지 않는 것",
    canTitle: "볼 수 있는 것",
    can: [
      "두 사람의 온도와 서늘함·미지근함·따뜻함 구간",
      "잘 맞는 부분과 다르게 느낄 수 있는 부분",
      "오해가 생기기 쉬운 구체적인 상황",
      "바로 해 볼 수 있는 대화 팁과 함께 이야기할 질문",
    ],
    cannotTitle: "하지 않는 것",
    cannot: [
      "관계의 좋고 나쁨이나 앞날을 판정하지 않습니다.",
      "성격이나 심리 상태를 진단하지 않습니다. 검증된 심리검사가 아닙니다.",
      "어느 한쪽을 문제 있는 사람으로 설명하지 않습니다.",
    ],
    aboutLink: "온도가 계산되는 방식 자세히 보기",
    faqTitle: "자주 묻는 질문",
    faqs: [
      {
        q: "'관계의 온도'는 어떻게 정해지나요?",
        a: `연락 빈도나 약속처럼 기대가 맞아야 편한 질문에서 두 사람의 답이 가까울수록 온도가 올라갑니다. 범위는 23℃~43℃이고 ${TEMP_BASE}℃가 딱 중간이에요. 30℃ 미만은 서늘함, 30℃ 이상 36℃ 미만은 미지근함, 36℃ 이상은 따뜻함으로 보여 드립니다. 실제로 무언가를 측정한 값이 아니라 답을 비교해 만든 오락용 지표입니다.`,
      },
      {
        q: "온도가 낮게 나오면 사이가 나쁜 건가요?",
        a: "아니요. 온도가 낮다는 것은 편하게 느끼는 방식이 서로 다르다는 뜻일 뿐, 마음의 크기나 관계의 미래를 말해 주지 않습니다. 가까운 사이에서도 얼마든지 나올 수 있고, 온도가 높다고 좋은 관계가 보장되는 것도 아니에요. 결과에 나오는 대화 질문을 이야깃거리로 써 보세요.",
      },
      {
        q: "내 답변은 어디에 저장되나요?",
        a: "서버에는 저장되지 않습니다. 내 답은 초대 링크의 # 뒷부분에 담겨 상대에게 전달되고, 브라우저는 이 부분을 서버로 보내지 않아요. 진행 중인 답은 새로고침에 대비해 지금 쓰는 탭에만 임시로 보관되고 탭을 닫으면 사라집니다.",
      },
      {
        q: "초대 링크를 다른 사람이 보면 어떻게 되나요?",
        a: "링크에 담긴 답은 암호화된 것이 아니어서, 링크를 받은 사람은 내용을 확인할 수 있습니다. 그래서 이름이나 연락처는 링크에 넣지 않고, 민감한 내용은 질문하지 않아요. 링크는 함께 테스트할 사람에게만 보내 주세요.",
      },
      {
        q: "초대한 사람은 결과를 어떻게 보나요?",
        a: "결과는 나중에 답한 사람의 화면에 먼저 나옵니다. 그 화면의 '결과 링크'를 초대한 사람에게 보내면 같은 결과를 볼 수 있어요. 서버에 저장하지 않기 때문에 링크를 잃어버리면 결과를 다시 찾을 수 없습니다.",
      },
      { q: "가입하거나 돈을 내야 하나요?", a: "아니요. 회원 가입 없이 모든 테스트와 결과를 무료로 이용할 수 있습니다." },
    ],
  },
  en: {
    metaTitle: (site) => `${site} - Couple, friendship & family compatibility test`,
    heroTop: "How warm are we",
    heroBottom: "right now?",
    heroBody:
      "Two people answer the same questions separately, and we show how close their answers are as a temperature. A light relationship test that also points out where you click, where you might feel differently, situations prone to misunderstanding, and tips for talking it through.",
    cta: "Choose a relationship and start",
    categoriesTitle: "Which relationship shall we take the temperature of?",
    categoriesBody: "Each relationship has its own questions and explanations. Pick the one you share with the other person.",
    howTitle: "How it works",
    steps: [
      { title: "Answer first", body: "Choose couple, friendship or family and answer the questions. About 3 minutes per person is enough." },
      { title: "Send the invite link", body: "When you finish, send the link you get to the other person. They pick their own answers to the same questions." },
      { title: "See your temperature together", body: "When they finish, your temperature and what it means appear. The result link lets you both see the same screen." },
    ],
    valueTitle: "What the result shows, and what it doesn't",
    canTitle: "What you'll see",
    can: [
      "Your temperature and whether it's cool, lukewarm or warm",
      "Where you click and where you might feel differently",
      "Specific situations where misunderstandings can happen",
      "Conversation tips to try right away and questions to talk about",
    ],
    cannotTitle: "What it doesn't do",
    cannot: [
      "It doesn't judge whether a relationship is good or bad, or predict its future.",
      "It doesn't diagnose personality or mental state. It isn't a validated psychological test.",
      "It doesn't describe either person as the problem.",
    ],
    aboutLink: "Learn how the temperature is calculated",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "How is the 'relationship temperature' decided?",
        a: `On questions where matching expectations matter, like how often to keep in touch or how to keep plans, the closer your answers, the higher the temperature. It ranges from 23℃ to 43℃, with ${TEMP_BASE}℃ right in the middle. Below 30℃ is shown as cool, 30℃ up to 36℃ as lukewarm, and 36℃ and above as warm. It isn't a measurement of anything; it's a just-for-fun indicator made by comparing answers.`,
      },
      {
        q: "Does a low temperature mean we don't get along?",
        a: "No. A low temperature only means you're comfortable with different ways of doing things. It says nothing about how much you care or about the future of the relationship. It can happen between very close people, and a high temperature doesn't guarantee a good relationship either. Use the conversation questions in the result as things to talk about.",
      },
      {
        q: "Where are my answers stored?",
        a: "Not on any server. Your answers travel to the other person inside the part of the invite link after #, and browsers never send that part to the server. Answers in progress are kept temporarily in your current tab in case you refresh, and disappear when you close the tab.",
      },
      {
        q: "What if someone else sees the invite link?",
        a: "The answers in the link aren't encrypted, so anyone who receives the link can see them. That's why we never put names or contact details in links and don't ask sensitive questions. Only send the link to the person you're taking the test with.",
      },
      {
        q: "How does the person who invited see the result?",
        a: "The result appears first on the screen of the person who answered second. If they send the 'result link' from that screen to the inviter, both can see the same result. Because nothing is stored on a server, a lost link means the result can't be found again.",
      },
      { q: "Do I need to sign up or pay?", a: "No. All tests and results are free to use without signing up." },
    ],
  },
  ja: {
    metaTitle: (site) => `${site} - 恋人・友だち・家族の相性テスト`,
    heroTop: "わたしたちの仲は",
    heroBottom: "今、何度？",
    heroBody:
      "同じ質問にふたりがそれぞれ答えると、答えがどれくらい近いかを温度で表示します。よく合っているところ、感じ方が違うかもしれないところ、すれ違いやすい場面と会話のヒントまで教えてくれる、気軽な関係テストです。",
    cta: "関係を選んではじめる",
    categoriesTitle: "どんな関係の温度をはかってみる？",
    categoriesBody: "関係ごとに質問と解説が違います。一緒にする人との関係を選んでください。",
    howTitle: "使い方",
    steps: [
      { title: "先に答える", body: "恋人・友だち・家族から関係を選んで質問に答えます。ひとり約3分で十分です。" },
      { title: "招待リンクを送る", body: "答え終わるとできあがるリンクを相手に送ります。相手は同じ質問に自分の答えを選びます。" },
      { title: "温度を一緒に見る", body: "相手が答え終わると、ふたりの温度と解説が表示されます。結果リンクで同じ画面を一緒に見られます。" },
    ],
    valueTitle: "結果でわかること・しないこと",
    canTitle: "わかること",
    can: [
      "ふたりの温度と、ひんやり・ぬるめ・あたたかの区分",
      "よく合っているところと、感じ方が違うかもしれないところ",
      "すれ違いが起きやすい具体的な場面",
      "すぐに試せる会話のヒントと、一緒に話したい質問",
    ],
    cannotTitle: "しないこと",
    cannot: [
      "関係の良し悪しや将来を判定しません。",
      "性格や心の状態を診断しません。検証された心理検査ではありません。",
      "どちらか一方を問題のある人として説明しません。",
    ],
    aboutLink: "温度の計算方法をくわしく見る",
    faqTitle: "よくある質問",
    faqs: [
      {
        q: "「関係の温度」はどうやって決まるの？",
        a: `連絡の頻度や約束のように、期待がそろっているほど心地よい質問で、ふたりの答えが近いほど温度が上がります。範囲は23℃〜43℃で、${TEMP_BASE}℃がちょうど真ん中です。30℃未満はひんやり、30℃以上36℃未満はぬるめ、36℃以上はあたたかと表示します。実際に何かを測った値ではなく、答えを比べてつくったお楽しみ用の指標です。`,
      },
      {
        q: "温度が低いと、仲が悪いということ？",
        a: "いいえ。温度が低いのは、心地よいと感じるやり方がお互いに違うというだけで、気持ちの大きさや関係の将来を表すものではありません。仲のいいふたりでも十分ありえる結果ですし、温度が高いからよい関係が保証されるわけでもありません。結果に出てくる会話の質問を話のきっかけにしてみてください。",
      },
      {
        q: "わたしの答えはどこに保存されるの？",
        a: "サーバーには保存されません。あなたの答えは招待リンクの「#」以降に入って相手に届き、ブラウザはこの部分をサーバーに送りません。答えている途中の内容は、再読み込みに備えて今使っているタブにだけ一時的に保管され、タブを閉じると消えます。",
      },
      {
        q: "招待リンクをほかの人が見たらどうなるの？",
        a: "リンクに入っている答えは暗号化されていないので、リンクを受け取った人は内容を確認できます。そのため、名前や連絡先はリンクに入れず、デリケートな内容は質問しません。リンクは一緒にテストをする相手にだけ送ってください。",
      },
      {
        q: "招待した人はどうやって結果を見るの？",
        a: "結果は、あとから答えた人の画面に先に表示されます。その画面の「結果リンク」を招待した人に送れば、同じ結果を見られます。サーバーに保存しないため、リンクをなくすと結果をもう一度見つけることはできません。",
      },
      { q: "登録やお金は必要？", a: "いいえ。会員登録なしで、すべてのテストと結果を無料で利用できます。" },
    ],
  },
  zh: {
    metaTitle: (site) => `${site} - 恋人·朋友·家人默契度测试`,
    heroTop: "我们之间",
    heroBottom: "现在是几度？",
    heroBody:
      "两个人分别回答同样的问题，我们会用温度来表示答案有多接近。这是一个轻松的关系测试，还会告诉你们哪里很合拍、哪里感受可能不同、哪些情况容易产生误会，以及聊天的小建议。",
    cta: "选择关系并开始",
    categoriesTitle: "想测一测哪种关系的温度？",
    categoriesBody: "每种关系的问题和解读都不一样。请选择你和对方之间的关系。",
    howTitle: "使用方法",
    steps: [
      { title: "我先来回答", body: "在恋人、朋友、家人中选择一种关系并回答问题，每人大约3分钟就够了。" },
      { title: "发送邀请链接", body: "答完后会生成一个链接，把它发给对方。对方会在同样的问题上选择自己的答案。" },
      { title: "一起看温度", body: "对方答完后，就会显示你们的温度和解读。通过结果链接，两个人可以看到同样的页面。" },
    ],
    valueTitle: "结果能告诉你什么、不做什么",
    canTitle: "你能看到",
    can: [
      "两个人的温度，以及微凉·温吞·温暖的区间",
      "很合拍的地方，以及感受可能不同的地方",
      "容易产生误会的具体情况",
      "马上就能试试的聊天建议，以及可以一起聊的问题",
    ],
    cannotTitle: "不会做的事",
    cannot: [
      "不评判关系的好坏，也不预测未来。",
      "不诊断性格或心理状态，这不是经过验证的心理测验。",
      "不会把任何一方描述成有问题的人。",
    ],
    aboutLink: "详细了解温度的计算方式",
    faqTitle: "常见问题",
    faqs: [
      {
        q: "「关系温度」是怎么决定的？",
        a: `在联系频率、守约这类期待一致才舒服的问题上，两个人的答案越接近，温度就越高。范围是 23℃~43℃，${TEMP_BASE}℃ 正好在中间。低于 30℃ 显示为微凉，30℃ 以上不到 36℃ 为温吞，36℃ 以上为温暖。这不是实际测量出来的数值，而是比较答案得出的娱乐指标。`,
      },
      {
        q: "温度低就代表关系不好吗？",
        a: "不是的。温度低只说明你们觉得舒服的方式不同，并不代表心意的大小或关系的未来。很亲近的人之间也完全可能出现这个结果，温度高也不保证关系一定好。可以把结果里的聊天问题当作话题聊一聊。",
      },
      {
        q: "我的答案保存在哪里？",
        a: "不会保存在服务器上。你的答案放在邀请链接「#」后面的部分里传给对方，而浏览器不会把这部分发送给服务器。正在作答的内容会为了防止刷新丢失，临时保存在你当前的标签页里，关闭标签页就会消失。",
      },
      {
        q: "如果别人看到了邀请链接会怎样？",
        a: "链接里的答案没有加密，收到链接的人可以看到内容。所以我们不会在链接里放入姓名或联系方式，也不会问敏感的问题。请只把链接发给要一起测试的人。",
      },
      {
        q: "邀请人怎么看到结果？",
        a: "结果会先显示在后回答的人的屏幕上。把那个页面上的「结果链接」发给邀请人，就能看到同样的结果。因为不保存在服务器上，链接丢失后就无法再找到结果。",
      },
      { q: "需要注册或付费吗？", a: "不需要。无需注册，所有测试和结果都可以免费使用。" },
    ],
  },
};

export function homeMeta(lang: Locale) {
  const site = getDict(lang).site;
  return pageMeta(lang, TEXT[lang].metaTitle(site.name), site.description, "/", { absoluteTitle: true });
}

export default function HomePage({ lang }: { lang: Locale }) {
  const t = TEXT[lang];
  // 화면에 실제로 보이는 FAQ와 같은 내용만 구조화 데이터로 제공한다.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl sm:leading-tight">
          {t.heroTop}
          <br />
          {t.heroBottom}
        </h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-muted">{t.heroBody}</p>
        <a href="#categories" className="btn btn-primary mt-8 px-8 text-lg">
          {t.cta}
        </a>
      </section>

      <section id="categories" aria-labelledby="categories-heading" className="scroll-mt-6">
        <h2 id="categories-heading" className="text-2xl font-bold">
          {t.categoriesTitle}
        </h2>
        <p className="mt-2 leading-7 text-muted">{t.categoriesBody}</p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {categoriesFor(lang).map((c) => (
            <li key={c.slug}>
              <CategoryCard category={c} lang={lang} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-heading">
        <h2 id="how-heading" className="text-2xl font-bold">
          {t.howTitle}
        </h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {t.steps.map((s, i) => (
            <li key={s.title} className="card p-5 sm:p-5">
              <p className="grid size-8 place-items-center rounded-full bg-peach font-bold text-brand" aria-hidden="true">
                {i + 1}
              </p>
              <h3 className="mt-3 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="value-heading" className="grid gap-4 sm:grid-cols-2">
        <h2 id="value-heading" className="text-2xl font-bold sm:col-span-2">
          {t.valueTitle}
        </h2>
        <div className="card">
          <h3 className="font-bold">{t.canTitle}</h3>
          <ul className="bullets mt-3 text-muted">
            {t.can.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="font-bold">{t.cannotTitle}</h3>
          <ul className="bullets mt-3 text-muted">
            {t.cannot.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <Link href={href(lang, "/about/")} className="text-link mt-4 inline-flex min-h-12 items-center">
            {t.aboutLink}
          </Link>
        </div>
      </section>

      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold">
          {t.faqTitle}
        </h2>
        <dl className="mt-4 space-y-4">
          {t.faqs.map((f) => (
            <div key={f.q} className="card p-5 sm:p-6">
              <dt className="font-bold">{f.q}</dt>
              <dd className="mt-2 leading-7 text-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
}
