import { href, type Locale } from "@/i18n/config";
import { getDict, type Dict } from "@/i18n/ui";
import { TEMP_BASE, TEMP_MAX, TEMP_MIN, type Analysis, type Insight } from "@/lib/analysis";
import type { Band, Category } from "@/lib/types";
import PageLink from "./PageLink";
import ShareButtons from "./ShareButtons";

const BAND_ICON: Record<Band, string> = { low: "❄️", middle: "🌤️", high: "🔥" };

function Thermometer({ temperature, band, t }: { temperature: number; band: Band; t: Dict }) {
  const percent = ((temperature - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * 100;
  return (
    <div role="img" aria-label={t.result.thermometer(temperature.toFixed(1), t.bands[band], TEMP_BASE)} className="mt-5">
      <div className="relative h-5 rounded-full border-2 border-white bg-white/70">
        {/* 최저 온도에서도 막대가 보이도록 최소 폭을 둔다. */}
        <div className="temp-fill h-full rounded-full" style={{ width: `${Math.max(percent, 5)}%` }} />
        <div className="absolute -inset-y-1.5 left-1/2 w-0.5 -translate-x-1/2 bg-ink" />
      </div>
      <div className="mt-2 grid grid-cols-3 text-xs font-semibold">
        <span>{TEMP_MIN}℃</span>
        <span className="text-center">{t.result.base(TEMP_BASE)}</span>
        <span className="text-right">{TEMP_MAX}℃</span>
      </div>
    </div>
  );
}

function InsightItem({ insight, t }: { insight: Insight; t: Dict }) {
  const { question, a, b, text } = insight;
  return (
    <li>
      <p className="text-sm text-muted">{question.text}</p>
      {a === b ? (
        <p className="mt-1 font-semibold">
          {t.result.both}: {question.options[a]}
        </p>
      ) : (
        <dl className="mt-1 space-y-1">
          <div>
            <dt className="inline font-bold">{t.roles.a}: </dt>
            <dd className="inline">{question.options[a]}</dd>
          </div>
          <div>
            <dt className="inline font-bold">{t.roles.b}: </dt>
            <dd className="inline">{question.options[b]}</dd>
          </div>
        </dl>
      )}
      <p className="mt-2 leading-7">{text}</p>
    </li>
  );
}

interface Props {
  category: Category;
  analysis: Analysis;
  url: string;
  lang: Locale;
}

export default function ResultView({ category, analysis, url, lang }: Props) {
  const t = getDict(lang);
  const r = t.result;
  const { temperature, band } = analysis;
  const label = t.bands[band];

  return (
    <div data-temp={band} className="space-y-6">
      <section className="card temp-hero">
        <p className="text-sm font-bold">
          <span aria-hidden="true">{category.emoji}</span> {r.badge(category.name)}
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
        <Thermometer temperature={temperature} band={band} t={t} />
        <p className="mt-5 leading-7">{analysis.summary}</p>
      </section>

      <section className="card" aria-labelledby="meaning-heading">
        <h2 id="meaning-heading" className="text-xl font-bold">
          {r.meaningTitle}
        </h2>
        <ul className="bullets mt-3 text-muted">
          {r.meaning(TEMP_MIN, TEMP_MAX, TEMP_BASE).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="card" aria-labelledby="strength-heading">
        <h2 id="strength-heading" className="text-xl font-bold">
          {r.strengthsTitle}
        </h2>
        {analysis.strengths.length === 0 ? (
          <p className="mt-3 leading-7 text-muted">{r.strengthsEmpty}</p>
        ) : (
          <ul className="mt-4 space-y-6">
            {analysis.strengths.map((s) => (
              <InsightItem key={s.question.id} insight={s} t={t} />
            ))}
          </ul>
        )}
      </section>

      <section className="card" aria-labelledby="diff-heading">
        <h2 id="diff-heading" className="text-xl font-bold">
          {r.diffTitle}
        </h2>
        {analysis.differences.length === 0 ? (
          <p className="mt-3 leading-7 text-muted">{r.diffEmpty}</p>
        ) : (
          <ul className="mt-4 space-y-6">
            {analysis.differences.map((s) => (
              <InsightItem key={s.question.id} insight={s} t={t} />
            ))}
          </ul>
        )}
        <p className="mt-5 text-sm leading-6 text-muted">{r.diffNote}</p>
      </section>

      <section className="card" aria-labelledby="scenario-heading">
        <h2 id="scenario-heading" className="text-xl font-bold">
          {r.scenarioTitle}
        </h2>
        {analysis.scenarios.length === 0 ? (
          <p className="mt-3 leading-7 text-muted">{r.scenarioEmpty(category.questions.length)}</p>
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
          {r.tipsTitle}
        </h2>
        <ul className="bullets mt-3">
          {analysis.tips.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <h2 className="mt-8 text-xl font-bold">{r.talksTitle}</h2>
        <ul className="bullets mt-3">
          {analysis.talks.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="card" aria-labelledby="share-heading">
        <h2 id="share-heading" className="text-xl font-bold">
          {r.shareTitle}
        </h2>
        <p className="mb-4 mt-2 text-sm leading-6 text-muted">{r.shareBody}</p>
        <ShareButtons
          url={url}
          fieldLabel={r.resultLink}
          text={r.shareText(t.site.name, category.name, temperature.toFixed(1), label)}
          lang={lang}
        />
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <PageLink href={href(lang, `/tests/${category.slug}/`)} className="btn btn-primary">
          {r.restart(category.name)}
        </PageLink>
        <PageLink href={href(lang, "/tests/")} className="btn btn-ghost">
          {r.otherTests}
        </PageLink>
        <PageLink href={href(lang, "/")} className="btn btn-ghost">
          {r.home}
        </PageLink>
      </div>
    </div>
  );
}
