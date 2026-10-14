import type { ReactNode } from "react";
import ClarityTag from "@/components/ClarityTag";
import { site } from "@/config/site";

// 홈·테스트 소개·안내 페이지에만 AdSense 코드를 넣는다(React가 <head>로 올려 준다).
// 초대(/invite/)·결과(/result/) 화면은 주소의 # 뒤에 답변이 들어 있으므로 이 그룹 밖에 두어
// 광고 스크립트가 그 주소를 읽을 일이 없게 한다. 404 화면에도 넣지 않는다.
// Microsoft Clarity도 같은 이유로 이 그룹(과 404 화면)에만 넣는다.
export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsenseClient}`}
        crossOrigin="anonymous"
      />
      <ClarityTag />
      {children}
    </>
  );
}
