import { type ReactNode } from "react";

export interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}
      aria-labelledby={title ? "card-title" : undefined}
    >
      {title && (
        <h2
          id="card-title"
          className="mb-4 text-lg font-semibold text-gray-900"
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
