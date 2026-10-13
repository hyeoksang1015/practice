export default function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div>
      <p className="text-sm font-semibold text-muted">
        질문 {current} / {total}
      </p>
      <div
        role="progressbar"
        aria-label="테스트 진행률"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-valuetext={`${total}개 중 ${current}번째 질문`}
        className="mt-2 h-2 overflow-hidden rounded-full bg-line"
      >
        <div className="h-full rounded-full bg-brand transition-[width]" style={{ width: `${(current / total) * 100}%` }} />
      </div>
    </div>
  );
}
