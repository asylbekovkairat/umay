export interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  "aria-label"?: string;
}

export function ProgressBar({
  value,
  max,
  className = "",
  "aria-label": ariaLabel = "Progress",
}: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, (value / max) * 100) : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
      className={`h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
    >
      <div
        className="h-full rounded-full bg-green-500 transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
