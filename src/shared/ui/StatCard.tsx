import { type ReactNode } from "react";

export interface StatCardProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export function StatCard({ label, value, className = "" }: StatCardProps) {
  return (
    <div
      className={`
        flex flex-col gap-1
        ${className}
      `.trim()}
    >
      <span className="text-sm text-muted">{label}</span>
      <span className="text-base font-medium text-foreground">{value}</span>
    </div>
  );
}
