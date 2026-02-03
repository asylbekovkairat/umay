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
        <span className="text-gray-500">Progress</span>
        <span className="font-medium text-gray-700">
          {Math.round((Number(value) / Number(max)) * 100)}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={Number(value)}
        aria-valuemin={0}
        aria-valuemax={Number(max)}
        aria-label={ariaLabel}
        className={`h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
      >
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
