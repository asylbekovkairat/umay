export interface ProgressBarProps {
  value: bigint;
  max: bigint;
  className?: string;
  "aria-label"?: string;
}

export function ProgressBar(props: ProgressBarProps) {
  const {
    value,
    max,
    className = "",
    "aria-label": ariaLabel = "Progress",
  } = props;

  const percent =
    max > 0 ? Math.min(100, (Number(value) / Number(max)) * 100) : 0;

  return (
    <div className="mt-6">
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-muted">Progress</span>
        <span className="font-medium text-foreground">
          {Math.round((Number(value) / Number(max)) * 100)}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={Number(value)}
        aria-valuemin={0}
        aria-valuemax={Number(max)}
        aria-label={ariaLabel}
        className={`h-2 w-full overflow-hidden rounded-full bg-muted-bg ${className}`}
      >
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
