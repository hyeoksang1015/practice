import Link from "next/link";
import type { ReactNode } from "react";
import { pageMeta } from "@/config/site";
import { href, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";
import { HIGH_FROM, LOW_BELOW, TEMP_BASE, TEMP_MAX, TEMP_MIN } from "@/lib/analysis";

const META: Record<Locale, { title: string; description: (site: string) => string }> = {
  ko: {
    title: "서비스 소개와 온도 해석 안내",
    description: (s) => `${s}가 어떤 서비스인지, 온도가 어떻게 계산되는지, 결과를 어떻게 받아들이면 좋은지 설명합니다.`,
  },
  en: {
    title: "About the site and how to read the temperature",
    description: (s) => `What ${s} is, how the temperature is calculated, and how to take the result.`,
  },
  ja: {
    title: "サイトについてと温度の読み方",
    description: (s) => `「${s}」がどんなサービスか、温度がどう計算されるか、結果をどう受け止めればいいかを説明します。`,
  },
  zh: {
    title: "网站介绍与温度解读说明",
    description: (s) => `介绍「${s}」是什么样的服务、温度如何计算，以及如何看待结果。`,
  },
};

export function aboutMeta(lang: Locale) {
  const m = META[lang];
  return pageMeta(lang, m.title, m.description(getDict(lang).site.name), "/about/");
}

const BODY: Record<Locale, (site: string) => ReactNode> = {
  ko: (site) => (
    <>
      <p>
        {site}는 연인, 친구, 가족처럼 가까운 두 사람이 같은 질문에 각자 답한 뒤 서로의 답을 비교해 보는 테스트 사이트입니다.
        가까운 사이일수록 &ldquo;당연히 나와 같겠지&rdquo; 하고 넘어가는 것들이 있습니다. 그런 주제를 가볍게 꺼내 볼 계기를
        만들고 싶어 시작했습니다.
      </p>

      <h2>왜 링크로 주고받나요?</h2>
      <p>
        두 사람의 답을 비교하려면 먼저 답한 사람의 답을 어딘가에 두어야 합니다. 이 사이트는 서버나 회원 정보에 저장하는 대신,
        답을 초대 링크의 # 뒷부분에 담아 상대에게 직접 전달합니다. 브라우저는 이 부분을 서버로 보내지 않기 때문에 답이 사이트
        운영자에게도 전달되지 않고, 가입 절차도 필요 없습니다. 대신 링크를 잃어버리면 결과를 다시 찾을 수 없고, 링크를 받은
        사람은 답을 확인할 수 있다는 한계가 있습니다.
      </p>

      <h2>&lsquo;관계의 온도&rsquo;는 이렇게 계산해요</h2>
      <ul>
        <li>
          각 질문의 선택지 네 개는 한 방향으로 나란히 놓여 있습니다. 예를 들어 연락에 대한 질문은 &lsquo;용건이 있을 때만&rsquo;에서
          &lsquo;수시로&rsquo;까지 이어집니다. 순서는 좋고 나쁨이 아니라 방향일 뿐입니다.
        </li>
        <li>
          질문은 두 종류입니다. 연락 빈도나 약속처럼 <strong>기대가 맞아야 편한 질문</strong>은 두 사람의 답이 가까울수록 온도를
          올립니다. 취미나 위로하는 방식처럼 <strong>달라도 괜찮은 질문</strong>은 온도에 넣지 않고, 다르면 서로 보완되는 점으로
          설명합니다.
        </li>
        <li>
          온도의 범위는 {TEMP_MIN}℃~{TEMP_MAX}℃이고 딱 중간이 {TEMP_BASE}℃입니다. 모든 답이 같으면 {TEMP_MAX}℃, 모든 답이 양 끝으로
          갈리면 {TEMP_MIN}℃가 됩니다.
        </li>
        <li>
          {LOW_BELOW}℃ 미만은 &lsquo;서늘함&rsquo;, {LOW_BELOW}℃ 이상 {HIGH_FROM}℃ 미만은 &lsquo;미지근함&rsquo;, {HIGH_FROM}℃ 이상은
          &lsquo;따뜻함&rsquo;으로 나누고, 결과 화면의 색과 분위기도 그에 맞춰 바뀝니다.
        </li>
        <li>같은 답을 넣으면 언제나 같은 결과가 나옵니다. 무작위 요소는 없습니다.</li>
      </ul>

      <h2>결과를 읽을 때 기억해 주세요</h2>
      <ul>
        <li>이 테스트는 검증된 심리검사가 아니며, 온도는 실제로 무언가를 측정한 값이 아닙니다. 과학적·임상적 진단으로 쓸 수 없습니다.</li>
        <li>온도가 낮다고 사이가 나쁘거나 맞지 않는다는 뜻이 아닙니다. 편하게 느끼는 방식이 다르다는 뜻입니다.</li>
        <li>
          온도가 높다고 좋은 관계가 보장되는 것도 아닙니다. 둘 다 서운함을 말하지 않는 편이라면 답은 같아도 이야기가 쌓일 수
          있습니다. 그래서 같은 답에도 주의할 점을 함께 알려 드립니다.
        </li>
        <li>질문 열두 개로는 사람도 관계도 다 알 수 없습니다. 결과 자체보다 결과를 보며 나누는 대화가 이 테스트의 쓸모입니다.</li>
      </ul>

      <h2>콘텐츠를 만드는 원칙</h2>
      <p>
        질문과 해설은 관계마다 따로, 직접 작성합니다. 특정 답을 더 바람직한 것처럼 보이게 하지 않고, 민감하거나 지나치게 사적인
        내용은 묻지 않으며, 어느 한쪽을 탓하거나 관계를 끝내라고 권하는 표현을 쓰지 않습니다.
      </p>
    </>
  ),
  en: (site) => (
    <>
      <p>
        {site} is a test site where two close people, such as partners, friends or family, each answer the same questions and then
        compare their answers. The closer we are, the more we assume &ldquo;surely they feel the same as me.&rdquo; We started this
        to give people an easy way to bring those topics up.
      </p>

      <h2>Why use links?</h2>
      <p>
        To compare two people&rsquo;s answers, the first person&rsquo;s answers have to be kept somewhere. Instead of storing them on
        a server or in an account, this site puts them in the part of the invite link after # and passes them directly to the
        other person. Browsers never send that part to the server, so the answers don&rsquo;t reach the site operator either, and no
        sign-up is needed. The trade-offs: if you lose the link, the result can&rsquo;t be found again, and anyone who receives the
        link can see the answers.
      </p>

      <h2>How the &lsquo;relationship temperature&rsquo; is calculated</h2>
      <ul>
        <li>
          The four options for each question sit side by side in one direction. For example, a question about keeping in touch runs
          from &lsquo;only when there&rsquo;s a reason&rsquo; to &lsquo;throughout the day&rsquo;. The order is just a direction, not
          better or worse.
        </li>
        <li>
          There are two kinds of questions. On <strong>questions where matching expectations matter</strong>, like how often to keep in
          touch or keeping plans, the closer your answers, the higher the temperature. <strong>Questions where it&rsquo;s fine to
          differ</strong>, like hobbies or ways of comforting someone, don&rsquo;t count toward the temperature; if you differ, it&rsquo;s
          described as a way you complement each other.
        </li>
        <li>
          The temperature ranges from {TEMP_MIN}℃ to {TEMP_MAX}℃, with {TEMP_BASE}℃ right in the middle. If all answers match it&rsquo;s{" "}
          {TEMP_MAX}℃; if every answer is at opposite ends it&rsquo;s {TEMP_MIN}℃.
        </li>
        <li>
          Below {LOW_BELOW}℃ is &lsquo;cool&rsquo;, {LOW_BELOW}℃ up to {HIGH_FROM}℃ is &lsquo;lukewarm&rsquo;, and {HIGH_FROM}℃ and above is
          &lsquo;warm&rsquo;. The colors and mood of the result screen change to match.
        </li>
        <li>The same answers always give the same result. There is nothing random.</li>
      </ul>

      <h2>Please keep in mind when reading the result</h2>
      <ul>
        <li>
          This is not a validated psychological test, and the temperature is not a measurement of anything. It can&rsquo;t be used as a
          scientific or clinical assessment.
        </li>
        <li>A low temperature doesn&rsquo;t mean you don&rsquo;t get along. It means you&rsquo;re comfortable with different ways of doing things.</li>
        <li>
          A high temperature doesn&rsquo;t guarantee a good relationship either. If you both tend not to mention hurt feelings, your
          answers may match while things quietly pile up. That&rsquo;s why we also point out cautions for matching answers.
        </li>
        <li>
          Twelve questions can&rsquo;t capture a person or a relationship. The real value of this test is the conversation you have while
          looking at the result.
        </li>
      </ul>

      <h2>How we make the content</h2>
      <p>
        The questions and explanations are written separately for each relationship. We don&rsquo;t make any answer look more
        desirable, we don&rsquo;t ask sensitive or overly personal questions, and we never blame either person or suggest ending a
        relationship.
      </p>
    </>
  ),
  ja: (site) => (
    <>
      <p>
        「{site}」は、恋人・友だち・家族のように身近なふたりが同じ質問にそれぞれ答え、お互いの答えを比べてみるテストサイトです。
        近い関係ほど「きっと自分と同じだろう」と流してしまうことがあります。そんなテーマを気軽に話すきっかけをつくりたくてはじめました。
      </p>

      <h2>なぜリンクでやり取りするの？</h2>
      <p>
        ふたりの答えを比べるには、先に答えた人の答えをどこかに置いておく必要があります。このサイトはサーバーや会員情報に保存する代わりに、
        答えを招待リンクの「#」以降に入れて相手に直接届けます。ブラウザはこの部分をサーバーに送らないので、答えはサイトの運営者にも届かず、
        登録も必要ありません。その代わり、リンクをなくすと結果をもう一度見つけられないこと、リンクを受け取った人は答えを確認できることが制約です。
      </p>

      <h2>「関係の温度」の計算方法</h2>
      <ul>
        <li>
          各質問の4つの選択肢は、ひとつの方向に並んでいます。たとえば連絡についての質問は「用があるときだけ」から「こまめに」まで続きます。
          順番は良し悪しではなく、方向を表しているだけです。
        </li>
        <li>
          質問は2種類あります。連絡の頻度や約束のように<strong>期待がそろっているほど心地いい質問</strong>は、ふたりの答えが近いほど温度が上がります。
          趣味やなぐさめ方のように<strong>違っていても問題ない質問</strong>は温度に含めず、違う場合はお互いを補い合う点として説明します。
        </li>
        <li>
          温度の範囲は{TEMP_MIN}℃〜{TEMP_MAX}℃で、ちょうど真ん中が{TEMP_BASE}℃です。すべての答えが同じなら{TEMP_MAX}℃、すべての答えが両端に分かれると
          {TEMP_MIN}℃になります。
        </li>
        <li>
          {LOW_BELOW}℃未満は「ひんやり」、{LOW_BELOW}℃以上{HIGH_FROM}℃未満は「ぬるめ」、{HIGH_FROM}℃以上は「あたたか」に分け、結果画面の色や雰囲気もそれに合わせて変わります。
        </li>
        <li>同じ答えを入れれば、いつでも同じ結果になります。ランダムな要素はありません。</li>
      </ul>

      <h2>結果を読むときに覚えておいてください</h2>
      <ul>
        <li>このテストは検証された心理検査ではなく、温度は実際に何かを測った値ではありません。科学的・臨床的な診断には使えません。</li>
        <li>温度が低いからといって、仲が悪い・合わないという意味ではありません。心地いいと感じるやり方が違うということです。</li>
        <li>
          温度が高いからといって、よい関係が保証されるわけでもありません。ふたりとも不満を口にしないタイプなら、答えは同じでも話がたまっていくことがあります。
          だから同じ答えにも注意点をあわせてお伝えしています。
        </li>
        <li>12問の質問で人や関係のすべてはわかりません。結果そのものより、結果を見ながら交わす会話がこのテストの役割です。</li>
      </ul>

      <h2>コンテンツをつくる方針</h2>
      <p>
        質問と解説は関係ごとに別々に作成しています。特定の答えをより望ましく見せたりせず、デリケートな内容や個人的すぎる内容は聞かず、
        どちらか一方を責めたり関係を終わらせるようすすめたりする表現は使いません。
      </p>
    </>
  ),
  zh: (site) => (
    <>
      <p>
        「{site}」是一个测试网站：恋人、朋友、家人这样亲近的两个人，各自回答同样的问题，然后比较彼此的答案。越是亲近，越容易觉得「对方肯定和我一样」就不再多问。
        我们希望为这些话题提供一个轻松聊起来的契机。
      </p>

      <h2>为什么要用链接来传递？</h2>
      <p>
        要比较两个人的答案，先回答的人的答案需要先放在某个地方。本网站不把答案保存在服务器或账户里，而是放在邀请链接「#」后面的部分，直接传给对方。
        浏览器不会把这部分发送给服务器，所以答案也不会传到网站运营者手里，而且无需注册。相应的局限是：链接丢失后就无法再找到结果，收到链接的人也能看到答案。
      </p>

      <h2>「关系温度」是这样计算的</h2>
      <ul>
        <li>
          每道题的四个选项沿着同一个方向排列。比如关于联系的问题，从「有事才联系」一直到「随时分享」。顺序只表示方向，不代表好坏。
        </li>
        <li>
          问题分为两种。像联系频率、守约这类<strong>期待一致才舒服的问题</strong>，两个人的答案越接近，温度越高。像兴趣爱好、安慰方式这类<strong>不同也没关系的问题</strong>，
          不计入温度，答案不同时会被解读为彼此互补的地方。
        </li>
        <li>
          温度范围是 {TEMP_MIN}℃~{TEMP_MAX}℃，正中间是 {TEMP_BASE}℃。所有答案都相同就是 {TEMP_MAX}℃，所有答案都分在两端就是 {TEMP_MIN}℃。
        </li>
        <li>
          低于 {LOW_BELOW}℃ 为「微凉」，{LOW_BELOW}℃ 以上不到 {HIGH_FROM}℃ 为「温吞」，{HIGH_FROM}℃ 以上为「温暖」，结果页面的颜色和氛围也会随之变化。
        </li>
        <li>输入同样的答案，永远会得到同样的结果，没有任何随机因素。</li>
      </ul>

      <h2>看结果时请记住</h2>
      <ul>
        <li>这不是经过验证的心理测验，温度也不是实际测量出来的数值，不能用作科学或临床诊断。</li>
        <li>温度低并不代表关系不好或不合适，只是说明你们觉得舒服的方式不同。</li>
        <li>
          温度高也不保证关系一定好。如果两个人都习惯不说出失落，答案虽然相同，心里的话却可能越积越多。所以即使答案相同，我们也会一起提醒需要注意的地方。
        </li>
        <li>十二道题无法了解一个人或一段关系的全部。比结果本身更有意义的，是看着结果展开的对话。</li>
      </ul>

      <h2>内容制作原则</h2>
      <p>
        问题和解读按关系分别编写。我们不会让某个答案显得更理想，不会问敏感或过于私人的问题，也不会使用责怪任何一方或劝人结束关系的表达。
      </p>
    </>
  ),
};

const LINK: Record<Locale, string> = {
  ko: "관계별 테스트 보러 가기",
  en: "See the relationship tests",
  ja: "関係別のテストを見る",
  zh: "查看各种关系测试",
};

export default function AboutPage({ lang }: { lang: Locale }) {
  return (
    <article className="prose-page">
      <h1 className="text-3xl font-bold">{META[lang].title}</h1>
      {BODY[lang](getDict(lang).site.name)}
      <p className="pt-4">
        <Link href={href(lang, "/tests/")} className="text-link">
          {LINK[lang]}
        </Link>
      </p>
    </article>
  );
}
