import { pageMeta, site } from "@/config/site";

export const metadata = pageMeta(
  "문의",
  `${site.name}의 오류 제보, 질문·해설에 대한 의견, 기타 문의 방법을 안내합니다.`,
  "/contact/",
);

export default function ContactPage() {
  return (
    <article className="prose-page">
      <h1 className="text-3xl font-bold">문의</h1>
      <p>테스트를 하다가 불편했던 점이나 고쳤으면 하는 표현이 있다면 알려 주세요. 다음과 같은 내용을 환영합니다.</p>
      <ul>
        <li>버튼이 눌리지 않거나 화면이 깨지는 등의 오류 제보 (사용한 기기와 브라우저를 함께 적어 주시면 도움이 됩니다)</li>
        <li>질문이나 결과 해설 중 어색하거나 불편하게 느껴진 표현</li>
        <li>새로 만들어졌으면 하는 테스트 주제</li>
      </ul>

      <h2>문의 방법</h2>
      {site.contactEmail ? (
        <p>
          이메일:{" "}
          <a href={`mailto:${site.contactEmail}`} className="text-link">
            {site.contactEmail}
          </a>
          <br />
          개인 운영 사이트라 답변까지 며칠 걸릴 수 있습니다.
        </p>
      ) : (
        <p>
          아직 문의 창구가 마련되지 않았습니다. 운영자가 문의용 이메일을 정하는 대로 이 페이지에 안내하겠습니다.
        </p>
      )}
    </article>
  );
}
