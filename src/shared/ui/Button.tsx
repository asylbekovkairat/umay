"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  "aria-label"?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      loading = false,
      disabled,
      className = "",
      children,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled ?? loading;

    const base =
      "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-60";

    const variants = {
      primary:
        "bg-foreground text-background hover:opacity-90 focus:ring-foreground",
      secondary:
        "border border-border bg-card-bg text-foreground shadow-sm hover:bg-muted-bg focus:ring-ring",
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-busy={loading}
        className={`${base} ${variants[variant]} ${className}`.trim()}
        {...props}
      >
        {loading ? (
          <>
            <span
              className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden
            />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
