import type { Locale } from "@/i18n/config";
import { getDict } from "@/i18n/ui";

export default function ProgressBar({ current, total, lang }: { current: number; total: number; lang: Locale }) {
  const t = getDict(lang).quiz;
  return (
    <div>
      <p className="text-sm font-semibold text-muted">
        {t.progress(current, total)}
      </p>
      <div
        role="progressbar"
        aria-label={t.progressLabel}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-valuetext={t.progressValue(current, total)}
        className="mt-2 h-2 overflow-hidden rounded-full bg-line"
      >
        <div className="h-full rounded-full bg-brand transition-[width]" style={{ width: `${(current / total) * 100}%` }} />
      </div>
    </div>
  );
}
