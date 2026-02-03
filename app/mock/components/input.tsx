import { type InputHTMLAttributes, type ReactNode } from "react";

export interface MockInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  helperText?: ReactNode;
  className?: string;
}

export function MockInput({
  label,
  id,
  error,
  helperText,
  className = "",
  ...props
}: MockInputProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        className={[
          "block w-full rounded-xl border bg-white px-4 py-3 font-mono text-gray-900 placeholder-gray-400",
          "focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/20",
          "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
          error ? "border-red-300" : "border-gray-200",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${id}-error` : helperText ? `${id}-helper` : undefined
        }
        {...props}
      />
      {helperText && !error && (
        <p id={`${id}-helper`} className="text-xs text-gray-500">
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
