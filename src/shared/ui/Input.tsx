"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  errorText?: string;
  id?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorText,
      id: idProp,
      className = "",
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const id = idProp ?? `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
    const hasError = Boolean(errorText);
    const describedBy = [
      helperText && !hasError ? `${id}-helper` : null,
      hasError ? `${id}-error` : null,
      ariaDescribedBy,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          aria-invalid={hasError}
          aria-describedby={describedBy || undefined}
          className={`
            w-full rounded-lg border bg-card-bg px-3 py-2.5 text-foreground
            placeholder:text-muted
            focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-ring
            disabled:cursor-not-allowed disabled:opacity-60
            ${hasError ? "border-red-500" : "border-border"}
            ${className}
          `.trim()}
          {...props}
        />
        {helperText && !hasError && (
          <p id={`${id}-helper`} className="mt-1.5 text-sm text-muted">
            {helperText}
          </p>
        )}
        {hasError && (
          <p
            id={`${id}-error`}
            className="mt-1.5 text-sm text-red-600"
            role="alert"
          >
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
