interface StepIndicatorProps {
  step: number;
  total: number;
  label: string;
}

export function StepIndicator(props: StepIndicatorProps) {
  const { step, total, label } = props;

  return (
    <div className="flex items-center gap-2 text-xs text-muted">
      <span className="inline-flex items-center justify-center size-5 rounded-full bg-accent/15 text-accent text-[10px] font-bold">
        {step}
      </span>
      <span>
        Step {step} of {total}: {label}
      </span>
    </div>
  );
}
