import Link from "next/link";
import { pageMeta, site } from "@/config/site";

export const metadata = pageMeta(
  "개인정보 처리방침",
  `${site.name}는 회원 가입이 없고 테스트 답변을 서버에 저장하지 않습니다. 답변이 초대 링크에 담겨 전달되는 방식과 주의할 점을 안내합니다.`,
  "/privacy/",
);

export default function PrivacyPage() {
  return (
    <article className="prose-page">
      <h1 className="text-3xl font-bold">개인정보 처리방침</h1>
      <p>최종 수정일: 2026년 10월 13일</p>
      <p>
        이 문서는 {site.name}가 현재 실제로 동작하는 방식을 그대로 설명합니다. 사이트의 기능이 바뀌면 이 문서도 함께 고칩니다.
      </p>

      <h2>수집·저장하지 않는 정보</h2>
      <ul>
        <li>회원 가입과 로그인 기능이 없습니다. 이름, 이메일, 전화번호를 묻지 않습니다.</li>
        <li>테스트 답변을 서버나 데이터베이스에 저장하지 않습니다. 결과 계산은 모두 사용자의 브라우저 안에서 이루어집니다.</li>
        <li>
          이 사이트가 직접 만드는 쿠키는 없습니다. 방문 통계, 이용 행태 분석, 광고는 아래 해당 항목을 확인해 주세요.
        </li>
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
        <li>
          수집을 원하지 않으면{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" className="text-link" rel="noopener noreferrer" target="_blank">
            Google 애널리틱스 차단 브라우저 부가기능
          </a>
          을 쓰거나 브라우저에서 쿠키를 차단할 수 있습니다.
        </li>
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
          Microsoft가 정보를 다루는 방식은{" "}
          <a href="https://privacy.microsoft.com/privacystatement" className="text-link" rel="noopener noreferrer" target="_blank">
            Microsoft 개인정보처리방침
          </a>
          에서 확인할 수 있습니다. 브라우저에서 쿠키를 차단하면 기록되지 않습니다.
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
          맞춤 광고를 원하지 않으면{" "}
          <a href="https://adssettings.google.com" className="text-link" rel="noopener noreferrer" target="_blank">
            Google 광고 설정
          </a>
          에서 끌 수 있습니다. Google이 정보를 사용하는 방식은{" "}
          <a href="https://policies.google.com/technologies/partner-sites" className="text-link" rel="noopener noreferrer" target="_blank">
            Google의 안내 페이지
          </a>
          에서 확인할 수 있습니다.
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
        <li>
          주소에서 # 뒤의 내용은 브라우저가 서버로 보내지 않습니다. 따라서 링크를 열어도 답변이 이 사이트의 서버나 접속 기록에
          전달되지 않습니다.
        </li>
        <li>
          <strong>링크의 내용은 글자를 바꿔 적은 것(인코딩)일 뿐 암호화가 아닙니다.</strong> 링크를 가진 사람은 누구나 링크를 열어
          답을 볼 수 있고, 방법을 아는 사람은 직접 해석할 수도 있습니다. 링크 자체가 접근을 막아 주지 않습니다.
        </li>
        <li>
          링크를 메신저나 SNS로 보내면 그 서비스에 링크 전체가 기록으로 남을 수 있습니다. 링크는 함께 테스트할 사람에게만 보내
          주세요.
        </li>
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
      <p>
        이 안내에 대해 궁금한 점은{" "}
        <Link href="/contact" className="text-link">
          문의 페이지
        </Link>
        에서 확인해 주세요.
      </p>
    </article>
  );
}
