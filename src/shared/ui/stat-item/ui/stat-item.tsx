import { type ReactNode } from "react";

export interface StatItemProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export function StatItem({ label, value, className = "" }: StatItemProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-lg font-semibold text-gray-900">{value}</span>
    </div>
  );
}
