import Link from "next/link";
import type { ReactNode } from "react";
import { pageMeta } from "@/config/site";
import { href, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";

// 실제 동작과 다르게 쓰면 안 되는 문서다. 추적·광고 방식이 바뀌면 네 언어 모두 함께 고친다.
const META: Record<Locale, { title: string; description: (site: string) => string }> = {
  ko: {
    title: "개인정보 처리방침",
    description: (s) =>
      `${s}는 회원 가입이 없고 테스트 답변을 서버에 저장하지 않습니다. 답변이 초대 링크에 담겨 전달되는 방식과 주의할 점을 안내합니다.`,
  },
  en: {
    title: "Privacy policy",
    description: (s) =>
      `${s} has no sign-up and doesn't store test answers on a server. Here's how answers travel inside invite links and what to keep in mind.`,
  },
  ja: {
    title: "プライバシーポリシー",
    description: (s) =>
      `「${s}」には会員登録がなく、テストの答えをサーバーに保存しません。答えが招待リンクに入って届く仕組みと注意点をご案内します。`,
  },
  zh: {
    title: "隐私政策",
    description: (s) => `「${s}」无需注册，也不会把测试答案保存在服务器上。这里说明答案如何放在邀请链接中传递，以及需要注意的地方。`,
  },
};

export function privacyMeta(lang: Locale) {
  const m = META[lang];
  return pageMeta(lang, m.title, m.description(getDict(lang).site.name), "/privacy/");
}

const ext = (url: string, text: string) => (
  <a href={url} className="text-link" rel="noopener noreferrer" target="_blank">
    {text}
  </a>
);
const GA_OPTOUT = "https://tools.google.com/dlpage/gaoptout";
const MS_PRIVACY = "https://privacy.microsoft.com/privacystatement";
const ADS_SETTINGS = "https://adssettings.google.com";
const GOOGLE_PARTNERS = "https://policies.google.com/technologies/partner-sites";

const BODY: Record<Locale, (site: string, contact: ReactNode) => ReactNode> = {
  ko: (site, contact) => (
    <>
      <p>최종 수정일: 2026년 10월 21일</p>
      <p>이 문서는 {site}가 현재 실제로 동작하는 방식을 그대로 설명합니다. 사이트의 기능이 바뀌면 이 문서도 함께 고칩니다.</p>

      <h2>수집·저장하지 않는 정보</h2>
      <ul>
        <li>회원 가입과 로그인 기능이 없습니다. 이름, 이메일, 전화번호를 묻지 않습니다.</li>
        <li>테스트 답변을 서버나 데이터베이스에 저장하지 않습니다. 결과 계산은 모두 사용자의 브라우저 안에서 이루어집니다.</li>
        <li>이 사이트가 직접 만드는 쿠키는 없습니다. 방문 통계, 이용 행태 분석, 광고는 아래 해당 항목을 확인해 주세요.</li>
      </ul>

      <h2>방문 통계(Google Analytics)</h2>
      <ul>
        <li>
          사이트 이용 현황을 파악하기 위해 모든 페이지에서 Google Analytics를 사용합니다. 방문한 페이지, 머문 시간, 버튼·양식
          이용 여부, 대략적인 지역, 기기·브라우저 정보 등이 Google에 전달되며, 이를 위해 Google Analytics 쿠키(_ga 등)가 저장될
          수 있습니다.
        </li>
        <li>
          <strong>초대·결과 화면에서도 답변은 전달하지 않습니다.</strong> Google Analytics에 보내는 페이지 주소에서 답변이 들어
          있는 # 뒷부분을 빼고 보내도록 설정했습니다.
        </li>
        <li>수집을 원하지 않으면 {ext(GA_OPTOUT, "Google 애널리틱스 차단 브라우저 부가기능")}을 쓰거나 브라우저에서 쿠키를 차단할 수 있습니다.</li>
      </ul>

      <h2>이용 행태 분석(Microsoft Clarity)</h2>
      <ul>
        <li>
          사이트를 더 쓰기 편하게 고치기 위해 Microsoft Clarity를 사용합니다. 홈, 테스트 소개, 소개·개인정보·문의 페이지와 404
          화면에서 클릭·스크롤·마우스 움직임과 화면 모습이 기록되어 Microsoft에 전달되며, 이를 위해 Clarity 쿠키가 저장될 수
          있습니다.
        </li>
        <li>
          <strong>질문에 답하는 화면과 초대 링크 칸은 기록에서 가려지며, 초대·결과 화면에는 Clarity를 넣지 않았습니다.</strong>{" "}
          Clarity는 페이지 주소 전체를 그대로 보내기 때문에, 답변이 주소에 들어 있는 두 화면에서는 아예 동작하지 않게 했습니다.
        </li>
        <li>
          Microsoft가 정보를 다루는 방식은 {ext(MS_PRIVACY, "Microsoft 개인정보처리방침")}에서 확인할 수 있습니다. 브라우저에서
          쿠키를 차단하면 기록되지 않습니다.
        </li>
      </ul>

      <h2>광고(Google AdSense)</h2>
      <ul>
        <li>
          이 사이트는 Google AdSense 광고 코드를 사용합니다. 홈, 테스트 소개, 소개·개인정보·문의 페이지를 열면 브라우저가 Google의
          광고 서버에서 스크립트를 불러오며, 이 과정에서 IP 주소, 브라우저 정보, 보고 있는 페이지 주소 등이 Google에 전달될 수
          있습니다.
        </li>
        <li>
          Google을 포함한 제3자 광고 사업자는 쿠키를 사용해 사용자가 이 사이트나 다른 사이트를 방문한 기록을 바탕으로 광고를
          보여 줄 수 있습니다.
        </li>
        <li>
          맞춤 광고를 원하지 않으면 {ext(ADS_SETTINGS, "Google 광고 설정")}에서 끌 수 있습니다. Google이 정보를 사용하는 방식은{" "}
          {ext(GOOGLE_PARTNERS, "Google의 안내 페이지")}에서 확인할 수 있습니다.
        </li>
        <li>
          <strong>초대 화면과 결과 화면에는 광고 코드를 넣지 않았습니다.</strong> 이 두 화면의 주소에는 답변이 들어 있기 때문에,
          광고 스크립트가 그 주소를 읽을 수 없도록 분리했습니다. 테스트 답변은 광고에 사용되지 않습니다.
        </li>
      </ul>

      <h2>초대 링크와 결과 링크에 담기는 내용</h2>
      <ul>
        <li>
          초대 링크의 # 뒷부분에는 테스트 종류(연인·친구·가족), 테스트 버전, 그리고 먼저 답한 사람이 질문마다 고른 선택지의
          번호가 들어 있습니다. 결과 링크에는 두 사람의 선택지 번호가 모두 들어 있습니다.
        </li>
        <li>이름, 연락처 등 누구인지 알 수 있는 정보는 링크에 넣지 않습니다.</li>
        <li>주소에서 # 뒤의 내용은 브라우저가 서버로 보내지 않습니다. 따라서 링크를 열어도 답변이 이 사이트의 서버나 접속 기록에 전달되지 않습니다.</li>
        <li>
          <strong>링크의 내용은 글자를 바꿔 적은 것(인코딩)일 뿐 암호화가 아닙니다.</strong> 링크를 가진 사람은 누구나 링크를 열어
          답을 볼 수 있고, 방법을 아는 사람은 직접 해석할 수도 있습니다. 링크 자체가 접근을 막아 주지 않습니다.
        </li>
        <li>링크를 메신저나 SNS로 보내면 그 서비스에 링크 전체가 기록으로 남을 수 있습니다. 링크는 함께 테스트할 사람에게만 보내 주세요.</li>
      </ul>

      <h2>브라우저에 임시로 보관하는 정보</h2>
      <p>
        질문에 답하는 도중 새로고침을 해도 이어서 할 수 있도록, 진행 중인 답변을 지금 쓰는 브라우저 탭의 임시 저장소
        (sessionStorage)에 보관합니다. 이 정보는 사용자의 기기 밖으로 나가지 않고, 탭을 닫으면 삭제됩니다.
      </p>

      <h2>공유 기능을 사용할 때</h2>
      <p>
        &lsquo;링크 공유하기&rsquo;나 &lsquo;링크 복사&rsquo; 버튼을 누르면 링크와 한 줄 설명이 기기의 공유 창 또는 클립보드로
        전달됩니다. 어떤 앱으로 누구에게 보낼지는 사용자가 직접 정하며, 보낸 뒤에는 해당 앱의 정책이 적용됩니다.
      </p>

      <h2>웹사이트 접속 기록</h2>
      <p>
        이 사이트가 올라가 있는 호스팅 서비스는 일반적인 웹 서버와 마찬가지로 접속 시각, IP 주소, 브라우저 종류, 요청한 페이지
        주소 같은 접속 기록을 보안과 안정적인 운영을 위해 남길 수 있습니다. 앞에서 설명한 것처럼 여기에 답변(# 뒤의 내용)은
        포함되지 않습니다.
      </p>

      <h2>앞으로 바뀔 수 있는 부분</h2>
      <p>
        결과 저장이나 기록 조회 같은 기능을 추가하면 서버에 정보를 저장하게 됩니다. 이처럼 정보를 다루는 방식이 바뀌면 도입 전에
        이 문서에 사용하는 기술과 목적, 선택 방법을 먼저 적겠습니다.
      </p>

      <h2>문의</h2>
      <p>이 안내에 대해 궁금한 점은 {contact}에서 확인해 주세요.</p>
    </>
  ),
  en: (site, contact) => (
    <>
      <p>Last updated: October 21, 2026</p>
      <p>This document describes exactly how {site} works today. When the site&rsquo;s features change, we update this document too.</p>

      <h2>Information we don&rsquo;t collect or store</h2>
      <ul>
        <li>There is no sign-up or login. We never ask for your name, email or phone number.</li>
        <li>Test answers are not stored on any server or database. All result calculations happen inside your browser.</li>
        <li>This site doesn&rsquo;t set any cookies of its own. For visit statistics, usage analytics and ads, see the sections below.</li>
      </ul>

      <h2>Visit statistics (Google Analytics)</h2>
      <ul>
        <li>
          We use Google Analytics on every page to understand how the site is used. Pages visited, time spent, use of buttons and
          forms, approximate location, and device and browser information are sent to Google, and Google Analytics cookies (such as
          _ga) may be stored for this.
        </li>
        <li>
          <strong>Your answers are not sent, even on the invite and result pages.</strong> We configured it so that the page address
          sent to Google Analytics leaves out the part after #, where the answers are.
        </li>
        <li>If you don&rsquo;t want to be measured, use the {ext(GA_OPTOUT, "Google Analytics opt-out browser add-on")} or block cookies in your browser.</li>
      </ul>

      <h2>Usage analytics (Microsoft Clarity)</h2>
      <ul>
        <li>
          We use Microsoft Clarity to make the site easier to use. On the home page, test introduction pages, the about, privacy and
          contact pages and the 404 page, clicks, scrolling, mouse movement and what the screen looks like are recorded and sent to
          Microsoft, and Clarity cookies may be stored for this.
        </li>
        <li>
          <strong>The question form and the invite link box are masked in recordings, and Clarity is not on the invite and result
          pages at all.</strong> Clarity sends the full page address as it is, so it doesn&rsquo;t run on the two pages whose address
          contains answers.
        </li>
        <li>
          See the {ext(MS_PRIVACY, "Microsoft Privacy Statement")} for how Microsoft handles information. Blocking cookies in your
          browser stops recording.
        </li>
      </ul>

      <h2>Advertising (Google AdSense)</h2>
      <ul>
        <li>
          This site uses Google AdSense ad code. When you open the home page, test introduction pages, or the about, privacy and
          contact pages, your browser loads a script from Google&rsquo;s ad servers, and information such as your IP address, browser
          details and the address of the page you&rsquo;re viewing may be sent to Google.
        </li>
        <li>
          Third-party vendors, including Google, use cookies to serve ads based on your previous visits to this site or other sites.
        </li>
        <li>
          You can turn off personalized ads in {ext(ADS_SETTINGS, "Google Ads Settings")}. See{" "}
          {ext(GOOGLE_PARTNERS, "Google's explanation")} for how Google uses information.
        </li>
        <li>
          <strong>There is no ad code on the invite and result pages.</strong> Because the addresses of those two pages contain
          answers, we kept them separate so ad scripts can&rsquo;t read them. Test answers are not used for ads.
        </li>
      </ul>

      <h2>What&rsquo;s inside invite and result links</h2>
      <ul>
        <li>
          The part of an invite link after # contains the test type (couple, friendship or family), the test version, and the number
          of the option the first person chose for each question. A result link contains both people&rsquo;s option numbers.
        </li>
        <li>No information that identifies a person, like names or contact details, goes into links.</li>
        <li>
          Browsers never send the part of an address after # to the server. So opening a link doesn&rsquo;t send answers to this
          site&rsquo;s server or access logs.
        </li>
        <li>
          <strong>The link content is only encoded, not encrypted.</strong> Anyone with the link can open it and see the answers, and
          someone who knows how can decode it directly. The link itself doesn&rsquo;t restrict access.
        </li>
        <li>
          If you send a link through a messenger or social media, that service may keep a record of the whole link. Only send links
          to the person you&rsquo;re taking the test with.
        </li>
      </ul>

      <h2>Information kept temporarily in your browser</h2>
      <p>
        So you can continue after refreshing while answering, answers in progress are kept in your current browser tab&rsquo;s
        temporary storage (sessionStorage). This information never leaves your device and is deleted when you close the tab.
      </p>

      <h2>When you use sharing</h2>
      <p>
        When you press &lsquo;Share link&rsquo; or &lsquo;Copy link&rsquo;, the link and a one-line description are passed to your
        device&rsquo;s share sheet or clipboard. You decide which app to use and who to send it to, and that app&rsquo;s policies apply
        once it&rsquo;s sent.
      </p>

      <h2>Website access logs</h2>
      <p>
        Like any web server, the hosting service this site runs on may keep access logs, such as access time, IP address, browser type
        and requested page address, for security and stable operation. As explained above, these logs never include answers (the part
        after #).
      </p>

      <h2>Things that may change</h2>
      <p>
        If we add features like saving results or viewing history, information would be stored on a server. Before any such change to
        how information is handled, we&rsquo;ll first describe the technology, its purpose and your choices in this document.
      </p>

      <h2>Contact</h2>
      <p>If you have questions about this policy, please see the {contact}.</p>
    </>
  ),
  ja: (site, contact) => (
    <>
      <p>最終更新日：2026年10月21日</p>
      <p>この文書は、「{site}」が現在実際にどのように動いているかをそのまま説明するものです。サイトの機能が変われば、この文書もあわせて更新します。</p>

      <h2>収集・保存しない情報</h2>
      <ul>
        <li>会員登録やログインの機能はありません。名前・メールアドレス・電話番号をたずねることはありません。</li>
        <li>テストの答えをサーバーやデータベースに保存しません。結果の計算はすべて利用者のブラウザの中で行われます。</li>
        <li>このサイト自身が作るCookieはありません。アクセス統計・利用状況の分析・広告については、下の各項目をご覧ください。</li>
      </ul>

      <h2>アクセス統計（Google Analytics）</h2>
      <ul>
        <li>
          サイトの利用状況を把握するため、すべてのページでGoogle Analyticsを使用しています。閲覧したページ、滞在時間、ボタンやフォームの利用状況、
          おおよその地域、端末・ブラウザの情報などがGoogleに送られ、そのためにGoogle AnalyticsのCookie（_gaなど）が保存されることがあります。
        </li>
        <li>
          <strong>招待・結果画面でも、答えは送りません。</strong>Google Analyticsに送るページのアドレスから、答えが入っている「#」以降を除いて送るように設定しています。
        </li>
        <li>計測を望まない場合は、{ext(GA_OPTOUT, "Google アナリティクス オプトアウト アドオン")}を使うか、ブラウザでCookieをブロックしてください。</li>
      </ul>

      <h2>利用状況の分析（Microsoft Clarity）</h2>
      <ul>
        <li>
          サイトをもっと使いやすくするため、Microsoft Clarityを使用しています。ホーム、テスト紹介、サイトについて・プライバシー・お問い合わせの各ページと404画面で、
          クリック・スクロール・マウスの動きと画面の様子が記録されてMicrosoftに送られ、そのためにClarityのCookieが保存されることがあります。
        </li>
        <li>
          <strong>質問に答える画面と招待リンクの欄は記録から隠され、招待・結果画面にはClarityを入れていません。</strong>
          Clarityはページのアドレスをそのまますべて送るため、答えがアドレスに入っているふたつの画面では動かないようにしています。
        </li>
        <li>Microsoftによる情報の取り扱いは{ext(MS_PRIVACY, "Microsoft プライバシーに関する声明")}で確認できます。ブラウザでCookieをブロックすると記録されません。</li>
      </ul>

      <h2>広告（Google AdSense）</h2>
      <ul>
        <li>
          このサイトはGoogle AdSenseの広告コードを使用しています。ホーム、テスト紹介、サイトについて・プライバシー・お問い合わせの各ページを開くと、
          ブラウザがGoogleの広告サーバーからスクリプトを読み込み、その際にIPアドレス、ブラウザの情報、閲覧中のページのアドレスなどがGoogleに送られることがあります。
        </li>
        <li>Googleなどの第三者配信事業者は、Cookieを使って、利用者がこのサイトやほかのサイトを訪れた記録に基づいて広告を表示することがあります。</li>
        <li>
          パーソナライズ広告を望まない場合は{ext(ADS_SETTINGS, "Google 広告設定")}でオフにできます。Googleによる情報の使い方は
          {ext(GOOGLE_PARTNERS, "Google の案内ページ")}で確認できます。
        </li>
        <li>
          <strong>招待画面と結果画面には広告コードを入れていません。</strong>このふたつの画面のアドレスには答えが入っているため、
          広告スクリプトがそのアドレスを読めないように分けています。テストの答えが広告に使われることはありません。
        </li>
      </ul>

      <h2>招待リンクと結果リンクに入る内容</h2>
      <ul>
        <li>
          招待リンクの「#」以降には、テストの種類（恋人・友だち・家族）、テストのバージョン、そして先に答えた人が各質問で選んだ選択肢の番号が入っています。
          結果リンクには、ふたり分の選択肢の番号が入っています。
        </li>
        <li>名前や連絡先など、誰なのかがわかる情報はリンクに入れません。</li>
        <li>アドレスの「#」以降は、ブラウザがサーバーに送りません。そのため、リンクを開いても答えがこのサイトのサーバーやアクセス記録に届くことはありません。</li>
        <li>
          <strong>リンクの内容は文字を置き換えただけ（エンコード）で、暗号化ではありません。</strong>リンクを持っている人は誰でもリンクを開いて答えを見ることができ、
          方法を知っている人は自分で読み解くこともできます。リンクそのものがアクセスを制限するわけではありません。
        </li>
        <li>リンクをメッセンジャーやSNSで送ると、そのサービスにリンク全体が記録として残ることがあります。リンクは一緒にテストをする相手にだけ送ってください。</li>
      </ul>

      <h2>ブラウザに一時的に保管する情報</h2>
      <p>
        質問に答えている途中で再読み込みしても続けられるように、答えている途中の内容を、今使っているブラウザのタブの一時保存領域（sessionStorage）に保管します。
        この情報は利用者の端末の外には出ず、タブを閉じると削除されます。
      </p>

      <h2>共有機能を使うとき</h2>
      <p>
        「リンクを共有」や「リンクをコピー」ボタンを押すと、リンクとひとことの説明が端末の共有画面またはクリップボードに渡されます。
        どのアプリで誰に送るかは利用者自身が決め、送ったあとはそのアプリのポリシーが適用されます。
      </p>

      <h2>ウェブサイトのアクセス記録</h2>
      <p>
        このサイトを置いているホスティングサービスは、一般的なウェブサーバーと同じように、アクセス時刻、IPアドレス、ブラウザの種類、リクエストされたページのアドレスなどのアクセス記録を、
        セキュリティと安定運用のために残すことがあります。前に説明したとおり、ここに答え（「#」以降の内容）は含まれません。
      </p>

      <h2>今後変わる可能性があること</h2>
      <p>
        結果の保存や履歴の閲覧のような機能を追加すると、サーバーに情報を保存することになります。このように情報の扱い方が変わる場合は、導入前に、
        使う技術と目的、選択の方法をまずこの文書に記載します。
      </p>

      <h2>お問い合わせ</h2>
      <p>このポリシーについてのご質問は、{contact}をご覧ください。</p>
    </>
  ),
  zh: (site, contact) => (
    <>
      <p>最后更新日期：2026年10月21日</p>
      <p>本文件如实说明「{site}」目前的实际运作方式。网站功能有变化时，本文件也会一起更新。</p>

      <h2>不收集、不保存的信息</h2>
      <ul>
        <li>没有注册和登录功能，不会询问你的姓名、邮箱或电话号码。</li>
        <li>不会把测试答案保存在服务器或数据库中。结果的计算全部在你的浏览器里完成。</li>
        <li>本网站自身不设置任何 Cookie。关于访问统计、使用行为分析和广告，请看下面的相关条目。</li>
      </ul>

      <h2>访问统计（Google Analytics）</h2>
      <ul>
        <li>
          为了解网站的使用情况，我们在所有页面使用 Google Analytics。访问的页面、停留时间、按钮和表单的使用情况、大致地区、设备和浏览器信息等会发送给 Google，
          为此可能会保存 Google Analytics 的 Cookie（如 _ga）。
        </li>
        <li>
          <strong>即使在邀请和结果页面，也不会发送答案。</strong>我们设置为：发送给 Google Analytics 的页面地址会去掉包含答案的「#」后面的部分。
        </li>
        <li>如果不希望被统计，可以使用 {ext(GA_OPTOUT, "Google Analytics 停用浏览器插件")}，或在浏览器中屏蔽 Cookie。</li>
      </ul>

      <h2>使用行为分析（Microsoft Clarity）</h2>
      <ul>
        <li>
          为了让网站更好用，我们使用 Microsoft Clarity。在首页、测试介绍、关于、隐私、联系页面以及 404 页面，点击、滚动、鼠标移动和页面外观会被记录并发送给 Microsoft，
          为此可能会保存 Clarity 的 Cookie。
        </li>
        <li>
          <strong>作答页面和邀请链接输入框在记录中会被遮挡，邀请和结果页面则完全没有加入 Clarity。</strong>
          Clarity 会原样发送完整的页面地址，所以在地址中包含答案的这两个页面上，我们让它完全不运行。
        </li>
        <li>Microsoft 如何处理信息，请参阅 {ext(MS_PRIVACY, "Microsoft 隐私声明")}。在浏览器中屏蔽 Cookie 后将不会被记录。</li>
      </ul>

      <h2>广告（Google AdSense）</h2>
      <ul>
        <li>
          本网站使用 Google AdSense 广告代码。打开首页、测试介绍、关于、隐私、联系页面时，浏览器会从 Google 的广告服务器加载脚本，
          在此过程中，IP 地址、浏览器信息、正在浏览的页面地址等可能会发送给 Google。
        </li>
        <li>包括 Google 在内的第三方广告商会使用 Cookie，根据你访问本网站或其他网站的记录来展示广告。</li>
        <li>
          如果不希望看到个性化广告，可以在 {ext(ADS_SETTINGS, "Google 广告设置")} 中关闭。Google 如何使用信息，请参阅 {ext(GOOGLE_PARTNERS, "Google 的说明页面")}。
        </li>
        <li>
          <strong>邀请页面和结果页面没有放广告代码。</strong>因为这两个页面的地址里包含答案，我们把它们分开，让广告脚本无法读取这些地址。测试答案不会被用于广告。
        </li>
      </ul>

      <h2>邀请链接和结果链接里包含的内容</h2>
      <ul>
        <li>
          邀请链接「#」后面的部分包含测试类型（恋人·朋友·家人）、测试版本，以及先回答的人在每道题上所选选项的编号。结果链接里包含两个人的选项编号。
        </li>
        <li>链接里不会放入姓名、联系方式等能识别身份的信息。</li>
        <li>浏览器不会把地址中「#」后面的内容发送给服务器。因此即使打开链接，答案也不会传到本网站的服务器或访问记录中。</li>
        <li>
          <strong>链接内容只是经过编码，并没有加密。</strong>任何持有链接的人都能打开链接看到答案，懂方法的人也可以直接解读。链接本身并不能限制访问。
        </li>
        <li>通过聊天软件或社交平台发送链接时，该服务可能会留存完整的链接记录。请只把链接发给要一起测试的人。</li>
      </ul>

      <h2>临时保存在浏览器中的信息</h2>
      <p>
        为了在作答途中刷新后也能继续，正在作答的内容会保存在你当前浏览器标签页的临时存储（sessionStorage）中。这些信息不会离开你的设备，关闭标签页后就会删除。
      </p>

      <h2>使用分享功能时</h2>
      <p>
        点击「分享链接」或「复制链接」按钮时，链接和一句说明会传给设备的分享面板或剪贴板。用哪个应用、发给谁由你自己决定，发送后适用该应用的政策。
      </p>

      <h2>网站访问记录</h2>
      <p>
        与一般的网站服务器一样，托管本网站的服务可能会为了安全和稳定运行，留存访问时间、IP 地址、浏览器类型、请求的页面地址等访问记录。
        如前所述，其中不包含答案（「#」后面的内容）。
      </p>

      <h2>今后可能发生的变化</h2>
      <p>
        如果增加保存结果、查看记录等功能，就需要在服务器上保存信息。像这样信息处理方式发生变化时，我们会在引入之前，先在本文件中写明所用技术、目的和你的选择方式。
      </p>

      <h2>联系我们</h2>
      <p>对本政策有疑问的话，请查看{contact}。</p>
    </>
  ),
};

const CONTACT_LINK: Record<Locale, string> = { ko: "문의 페이지", en: "contact page", ja: "お問い合わせページ", zh: "联系页面" };

export default function PrivacyPage({ lang }: { lang: Locale }) {
  const contact = (
    <Link href={href(lang, "/contact/")} className="text-link">
      {CONTACT_LINK[lang]}
    </Link>
  );
  return (
    <article className="prose-page">
      <h1 className="text-3xl font-bold">{META[lang].title}</h1>
      {BODY[lang](getDict(lang).site.name, contact)}
    </article>
  );
}
