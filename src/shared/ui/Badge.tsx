import { type HTMLAttributes } from "react";

export type BadgeVariant = "success" | "neutral" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  success:
    "bg-emerald-50 text-emerald-700 border-emerald-200",
  neutral: "bg-muted-bg text-muted border-border",
  danger: "bg-red-50 text-red-700 border-red-200",
};

export function Badge({
  variant = "neutral",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      role="status"
      aria-label={typeof children === "string" ? children : undefined}
      className={`
        inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium
        ${variantStyles[variant]}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
