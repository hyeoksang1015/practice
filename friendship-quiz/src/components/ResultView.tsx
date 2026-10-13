import { ROLE_A, ROLE_B, site } from "@/config/site";
import { BAND_LABEL, TEMP_BASE, TEMP_MAX, TEMP_MIN, type Analysis, type Insight } from "@/lib/analysis";
import type { Band, Category } from "@/lib/types";
import PageLink from "./PageLink";
import ShareButtons from "./ShareButtons";

const BAND_ICON: Record<Band, string> = { low: "❄️", middle: "🌤️", high: "🔥" };

function Thermometer({ temperature, band }: { temperature: number; band: Band }) {
  const percent = ((temperature - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * 100;
  return (
    <div
      role="img"
      aria-label={`관계의 온도 ${temperature.toFixed(1)}도, ${BAND_LABEL[band]}. 기준은 ${TEMP_BASE}도입니다.`}
      className="mt-5"
    >
      <div className="relative h-5 rounded-full border-2 border-white bg-white/70">
        {/* 최저 온도에서도 막대가 보이도록 최소 폭을 둔다. */}
        <div className="temp-fill h-full rounded-full" style={{ width: `${Math.max(percent, 5)}%` }} />
        <div className="absolute -inset-y-1.5 left-1/2 w-0.5 -translate-x-1/2 bg-ink" />
      </div>
      <div className="mt-2 grid grid-cols-3 text-xs font-semibold">
        <span>{TEMP_MIN}℃</span>
        <span className="text-center">기준 {TEMP_BASE}℃</span>
        <span className="text-right">{TEMP_MAX}℃</span>
      </div>
    </div>
  );
}

function InsightItem({ insight }: { insight: Insight }) {
  const { question, a, b, text } = insight;
  return (
    <li>
      <p className="text-sm text-muted">{question.text}</p>
      {a === b ? (
        <p className="mt-1 font-semibold">두 사람 모두: {question.options[a]}</p>
      ) : (
        <dl className="mt-1 space-y-1">
          <div>
            <dt className="inline font-bold">{ROLE_A}: </dt>
            <dd className="inline">{question.options[a]}</dd>
          </div>
          <div>
            <dt className="inline font-bold">{ROLE_B}: </dt>
            <dd className="inline">{question.options[b]}</dd>
          </div>
        </dl>
      )}
      <p className="mt-2 leading-7">{text}</p>
    </li>
  );
}

export default function ResultView({ category, analysis, url }: { category: Category; analysis: Analysis; url: string }) {
  const { temperature, band } = analysis;
  const label = BAND_LABEL[band];

  return (
    <div data-temp={band} className="space-y-6">
      <section className="card temp-hero">
        <p className="text-sm font-bold">
          <span aria-hidden="true">{category.emoji}</span> {category.name} 궁합 결과
        </p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{analysis.title}</h1>
        <p className="mt-5 flex flex-wrap items-end gap-3">
          {/* 제목용 글꼴에는 ℃ 글자가 없어 단위만 본문 글꼴로 그린다. */}
          <span className="temp-accent text-4xl leading-none">
            <span className="font-display text-6xl">{temperature.toFixed(1)}</span>℃
          </span>
          <span className="temp-chip rounded-full px-3 py-1 text-sm font-bold">
            <span aria-hidden="true">{BAND_ICON[band]}</span> {label}
          </span>
        </p>
        <Thermometer temperature={temperature} band={band} />
        <p className="mt-5 leading-7">{analysis.summary}</p>
      </section>

      <section className="card" aria-labelledby="meaning-heading">
        <h2 id="meaning-heading" className="text-xl font-bold">
          이 온도는 이렇게 읽어 주세요
        </h2>
        <ul className="bullets mt-3 text-muted">
          <li>
            연락 빈도나 약속처럼 기대가 맞아야 편한 질문에서 두 사람의 답이 가까울수록 온도가 올라가요. 범위는 {TEMP_MIN}℃~{TEMP_MAX}
            ℃이고 딱 중간이 {TEMP_BASE}℃입니다.
          </li>
          <li>취향처럼 달라도 괜찮은 질문은 온도에 넣지 않았어요.</li>
          <li>
            실제로 무언가를 측정한 값이 아닌 오락용 지표이며, 과학적·임상적 심리 진단이 아닙니다. 온도가 낮다고 사이가 나쁜 것도,
            높다고 좋은 관계가 보장되는 것도 아니에요.
          </li>
        </ul>
      </section>

      <section className="card" aria-labelledby="strength-heading">
        <h2 id="strength-heading" className="text-xl font-bold">
          잘 맞는 부분
        </h2>
        {analysis.strengths.length === 0 ? (
          <p className="mt-3 leading-7 text-muted">
            이번 답에서는 가깝게 고른 질문이 눈에 띄지 않았어요. 그만큼 서로에게 새로 알게 될 부분이 많다는 뜻이기도 합니다.
          </p>
        ) : (
          <ul className="mt-4 space-y-6">
            {analysis.strengths.map((s) => (
              <InsightItem key={s.question.id} insight={s} />
            ))}
          </ul>
        )}
      </section>

      <section className="card" aria-labelledby="diff-heading">
        <h2 id="diff-heading" className="text-xl font-bold">
          다르게 느낄 수 있는 부분
        </h2>
        {analysis.differences.length === 0 ? (
          <p className="mt-3 leading-7 text-muted">
            크게 엇갈린 질문은 없었어요. 답이 달랐더라도 바로 옆의 선택지를 고른 정도였습니다.
          </p>
        ) : (
          <ul className="mt-4 space-y-6">
            {analysis.differences.map((s) => (
              <InsightItem key={s.question.id} insight={s} />
            ))}
          </ul>
        )}
        <p className="mt-5 text-sm leading-6 text-muted">답이 다른 것은 어느 한쪽이 틀렸다는 뜻이 아니라, 편하게 느끼는 방식이 다르다는 뜻이에요.</p>
      </section>

      <section className="card" aria-labelledby="scenario-heading">
        <h2 id="scenario-heading" className="text-xl font-bold">
          오해가 생길 수 있는 상황
        </h2>
        {analysis.scenarios.length === 0 ? (
          <p className="mt-3 leading-7 text-muted">
            이번 답에서는 특별히 엇갈리기 쉬운 상황이 보이지 않았어요. 다만 질문 {category.questions.length}개로 모든 상황을 알 수는
            없으니, 평소에 서운했던 순간이 있었다면 아래 질문을 계기로 이야기해 보세요.
          </p>
        ) : (
          <ul className="bullets mt-3">
            {analysis.scenarios.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="card" aria-labelledby="tip-heading">
        <h2 id="tip-heading" className="text-xl font-bold">
          이렇게 해 보세요
        </h2>
        <ul className="bullets mt-3">
          {analysis.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <h2 className="mt-8 text-xl font-bold">함께 이야기해 볼 질문</h2>
        <ul className="bullets mt-3">
          {analysis.talks.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="card" aria-labelledby="share-heading">
        <h2 id="share-heading" className="text-xl font-bold">
          결과 함께 보기
        </h2>
        <p className="mb-4 mt-2 text-sm leading-6 text-muted">
          초대한 사람도 이 링크를 열면 같은 결과를 볼 수 있어요. 링크에는 두 사람이 고른 답이 담겨 있고 암호화된 것이 아니니, 보여
          주고 싶은 사람에게만 보내 주세요. 링크가 길어서 일부 메신저에서는 잘릴 수 있으니 전체가 전달됐는지 확인해 주세요.
        </p>
        <ShareButtons
          url={url}
          fieldLabel="결과 링크"
          text={`[${site.name}] 우리의 ${category.name} 온도는 ${temperature.toFixed(1)}℃ (${label})`}
        />
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <PageLink href={`/tests/${category.slug}/`} className="btn btn-primary">
          {category.name} 테스트 새로 시작하기
        </PageLink>
        <PageLink href="/tests/" className="btn btn-ghost">
          다른 관계 테스트 보기
        </PageLink>
        <PageLink href="/" className="btn btn-ghost">
          홈으로
        </PageLink>
      </div>
    </div>
  );
}
