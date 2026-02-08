/* External dependencies */
import { type ReactNode } from "react";

export type BadgeVariant = "active" | "inactive" | "warning" | "neutral";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  active: "bg-positive/15 text-positive border-positive/25",
  inactive: "bg-muted-bg text-muted border-border",
  warning: "bg-warning/15 text-warning border-warning/25",
  neutral: "bg-muted-bg text-foreground border-border",
};

export function Badge({
  children,
  variant = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
