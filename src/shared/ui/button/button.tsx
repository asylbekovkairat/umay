"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-accent text-accent-foreground hover:opacity-90 focus:ring-accent",
  secondary:
    "border-border bg-card text-foreground shadow-sm hover:bg-muted-bg focus:ring-ring",
  ghost:
    "border-transparent bg-transparent text-foreground hover:bg-muted-bg focus:ring-ring",
  danger:
    "border-transparent bg-negative text-white hover:opacity-90 focus:ring-negative",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled ?? loading;

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        aria-busy={loading}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-60",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading && (
          <span
            className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
