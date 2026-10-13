import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import { pageMeta, site } from "@/config/site";
import { categories } from "@/data/categories";
import { TEMP_BASE } from "@/lib/analysis";

export const metadata = pageMeta(`${site.name} - 연인·친구·가족 궁합 테스트`, site.description, "/", { absoluteTitle: true });

const steps = [
  { title: "내가 먼저 답하기", body: "연인, 친구, 가족 중 관계를 고르고 질문에 답해요. 한 사람당 3분 정도면 충분합니다." },
  { title: "초대 링크 보내기", body: "답을 마치면 만들어지는 링크를 상대에게 보내요. 상대는 같은 질문에 자기 답을 고릅니다." },
  { title: "온도 함께 보기", body: "상대가 답을 마치면 두 사람의 온도와 해설이 나와요. 결과 링크로 같은 화면을 함께 볼 수 있습니다." },
];

const faqs = [
  {
    q: "'관계의 온도'는 어떻게 정해지나요?",
    a: `연락 빈도나 약속처럼 기대가 맞아야 편한 질문에서 두 사람의 답이 가까울수록 온도가 올라갑니다. 범위는 23℃~43℃이고 ${TEMP_BASE}℃가 딱 중간이에요. 30℃ 미만은 서늘함, 30℃ 이상 36℃ 미만은 미지근함, 36℃ 이상은 따뜻함으로 보여 드립니다. 실제로 무언가를 측정한 값이 아니라 답을 비교해 만든 오락용 지표입니다.`,
  },
  {
    q: "온도가 낮게 나오면 사이가 나쁜 건가요?",
    a: "아니요. 온도가 낮다는 것은 편하게 느끼는 방식이 서로 다르다는 뜻일 뿐, 마음의 크기나 관계의 미래를 말해 주지 않습니다. 가까운 사이에서도 얼마든지 나올 수 있고, 온도가 높다고 좋은 관계가 보장되는 것도 아니에요. 결과에 나오는 대화 질문을 이야깃거리로 써 보세요.",
  },
  {
    q: "내 답변은 어디에 저장되나요?",
    a: "서버에는 저장되지 않습니다. 내 답은 초대 링크의 # 뒷부분에 담겨 상대에게 전달되고, 브라우저는 이 부분을 서버로 보내지 않아요. 진행 중인 답은 새로고침에 대비해 지금 쓰는 탭에만 임시로 보관되고 탭을 닫으면 사라집니다.",
  },
  {
    q: "초대 링크를 다른 사람이 보면 어떻게 되나요?",
    a: "링크에 담긴 답은 암호화된 것이 아니어서, 링크를 받은 사람은 내용을 확인할 수 있습니다. 그래서 이름이나 연락처는 링크에 넣지 않고, 민감한 내용은 질문하지 않아요. 링크는 함께 테스트할 사람에게만 보내 주세요.",
  },
  {
    q: "초대한 사람은 결과를 어떻게 보나요?",
    a: "결과는 나중에 답한 사람의 화면에 먼저 나옵니다. 그 화면의 '결과 링크'를 초대한 사람에게 보내면 같은 결과를 볼 수 있어요. 서버에 저장하지 않기 때문에 링크를 잃어버리면 결과를 다시 찾을 수 없습니다.",
  },
  {
    q: "가입하거나 돈을 내야 하나요?",
    a: "아니요. 회원 가입 없이 모든 테스트와 결과를 무료로 이용할 수 있습니다.",
  },
];

// 화면에 실제로 보이는 FAQ와 같은 내용만 구조화 데이터로 제공한다.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl sm:leading-tight">
          우리 사이는
          <br />
          지금 몇 도일까요?
        </h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-muted">
          같은 질문에 두 사람이 각자 답하면, 답이 얼마나 가까운지를 온도로 보여 드려요. 잘 맞는 부분과 다르게 느낄 수 있는
          부분, 오해가 생기기 쉬운 상황과 대화 팁까지 함께 알려 주는 가벼운 관계 테스트입니다.
        </p>
        <a href="#categories" className="btn btn-primary mt-8 px-8 text-lg">
          관계 고르고 시작하기
        </a>
      </section>

      <section id="categories" aria-labelledby="categories-heading" className="scroll-mt-6">
        <h2 id="categories-heading" className="text-2xl font-bold">
          어떤 사이의 온도를 재 볼까요?
        </h2>
        <p className="mt-2 leading-7 text-muted">관계마다 질문과 해석이 다릅니다. 함께할 사람과의 사이를 골라 주세요.</p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <CategoryCard category={c} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-heading">
        <h2 id="how-heading" className="text-2xl font-bold">
          이용 방법
        </h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="card p-5 sm:p-5">
              <p className="grid size-8 place-items-center rounded-full bg-peach font-bold text-brand" aria-hidden="true">
                {i + 1}
              </p>
              <h3 className="mt-3 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="value-heading" className="grid gap-4 sm:grid-cols-2">
        <h2 id="value-heading" className="text-2xl font-bold sm:col-span-2">
          결과에서 볼 수 있는 것과 하지 않는 것
        </h2>
        <div className="card">
          <h3 className="font-bold">볼 수 있는 것</h3>
          <ul className="bullets mt-3 text-muted">
            <li>두 사람의 온도와 서늘함·미지근함·따뜻함 구간</li>
            <li>잘 맞는 부분과 다르게 느낄 수 있는 부분</li>
            <li>오해가 생기기 쉬운 구체적인 상황</li>
            <li>바로 해 볼 수 있는 대화 팁과 함께 이야기할 질문</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-bold">하지 않는 것</h3>
          <ul className="bullets mt-3 text-muted">
            <li>관계의 좋고 나쁨이나 앞날을 판정하지 않습니다.</li>
            <li>성격이나 심리 상태를 진단하지 않습니다. 검증된 심리검사가 아닙니다.</li>
            <li>어느 한쪽을 문제 있는 사람으로 설명하지 않습니다.</li>
          </ul>
          <Link href="/about" className="text-link mt-4 inline-flex min-h-12 items-center">
            온도가 계산되는 방식 자세히 보기
          </Link>
        </div>
      </section>

      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold">
          자주 묻는 질문
        </h2>
        <dl className="mt-4 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="card p-5 sm:p-6">
              <dt className="font-bold">{f.q}</dt>
              <dd className="mt-2 leading-7 text-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
}
