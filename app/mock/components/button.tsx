import { type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "disabled";
export type ButtonVisualState = "default" | "loading";

export interface MockButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: ButtonVariant;
  visualState?: ButtonVisualState;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500 border-transparent",
  secondary:
    "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
  disabled:
    "cursor-not-allowed bg-gray-200 text-gray-500 border-transparent pointer-events-none",
};

export function MockButton({
  variant = "primary",
  visualState = "default",
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: MockButtonProps) {
  const isDisabled = disabled || variant === "disabled";

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-busy={visualState === "loading"}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60",
        variantStyles[variant],
        fullWidth && "w-full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {visualState === "loading" && (
        <span
          className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      )}
      {children}
    </button>
  );
}
