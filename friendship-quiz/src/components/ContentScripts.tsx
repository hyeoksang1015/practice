import { site } from "@/config/site";
import ClarityTag from "./ClarityTag";

// 홈·테스트 소개·안내 페이지((content) 그룹)에만 넣는 AdSense·Clarity 코드. AdSense는 React가 <head>로 올려 준다.
// 초대(/invite/)·결과(/result/) 화면은 주소의 # 뒤에 답변이 들어 있으므로 이 그룹 밖에 두어
// 광고·Clarity 스크립트가 그 주소를 읽을 일이 없게 한다(측정으로 확인한 누출을 막는 장치다).
export default function ContentScripts() {
  return (
    <>
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsenseClient}`}
        crossOrigin="anonymous"
      />
      <ClarityTag />
    </>
  );
}
