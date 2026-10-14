// Microsoft Clarity 태그. 초대·결과 화면에는 넣지 않는다:
// Clarity는 주소 전체(# 뒤 답변 포함)와 화면 글자를 기록해 보내는데, 보내는 주소를 바꾸는 설정이 없다(측정으로 확인).
export default function ClarityTag() {
  return (
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "yxey4l844i");`,
      }}
    />
  );
}
