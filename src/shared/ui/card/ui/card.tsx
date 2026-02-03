import { type ReactNode } from "react";

export interface CardProps {
  title?: string;
  /** Текст или элемент справа от заголовка (напротив title) */
  titleRight?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({
  title,
  titleRight,
  children,
  className = "",
}: CardProps) {
  const hasHeader = title ?? titleRight;
  return (
    <section
      className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}
      aria-labelledby={title ? "card-title" : undefined}
    >
      {hasHeader && (
        <div className="mb-4 flex items-center justify-between gap-4">
          {title ? (
            <h2 id="card-title" className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
          ) : (
            <span />
          )}
          {titleRight && (
            <span className="text-sm text-gray-600 shrink-0">{titleRight}</span>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
