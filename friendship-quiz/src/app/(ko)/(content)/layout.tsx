import type { ReactNode } from "react";
import ContentScripts from "@/components/ContentScripts";

// 홈·테스트 소개·안내 페이지 그룹. 광고·Clarity는 이 그룹에만 넣는다(초대·결과 화면은 그룹 밖).
export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ContentScripts />
      {children}
    </>
  );
}
