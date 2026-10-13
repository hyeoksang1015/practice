import type { ComponentProps } from "react";

// 문서를 통째로 새로 불러오는 내부 링크(next/link 를 쓰지 않는다).
// 초대·결과 화면과 광고 코드가 있는 화면이 한 문서 안에서 이어지지 않게 해서,
// 뒤로 가기를 해도 광고 스크립트가 답변이 담긴 주소(# 뒤)를 볼 수 없게 한다.
// 초대·결과 화면에서 보이는 링크(헤더, 푸터, 결과, 링크 오류)는 모두 이것을 쓴다.
export default function PageLink(props: ComponentProps<"a">) {
  return <a {...props} />;
}
