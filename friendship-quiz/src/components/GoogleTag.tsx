// Google tag (gtag.js) — 모든 페이지(404 포함). page_location 에서 # 뒤(답변)를 빼고 보낸다.
// 받은 태그 원본은 # 까지 보냈다(측정으로 확인). 이 처리를 지우면 초대·결과 화면의 답변이 GA로 전송된다.
export default function GoogleTag() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/next-script-for-ga -- 받은 태그를 그대로 쓰고 의존성을 늘리지 않는다 */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-EQ3K3HCXPW" />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-EQ3K3HCXPW', { page_location: location.href.split('#')[0] });`,
        }}
      />
    </>
  );
}
