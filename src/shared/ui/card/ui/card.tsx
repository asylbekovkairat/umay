import { type ReactNode } from "react";

export interface CardProps {
  title?: string;
  /** Текст или элемент справа от заголовка (напротив title) */
  titleRight?: ReactNode;
  titleClassName?: string;
  children: ReactNode;
  className?: string;
}

export function Card({
  title,
  titleRight,
  children,
  className = "",
  titleClassName = "",
}: CardProps) {
  const hasHeader = title ?? titleRight;
  return (
    <section
      className={`rounded-2xl surface surface-hover shadow-soft p-6 ${className}`}
      aria-labelledby={title ? "card-title" : undefined}
    >
      {hasHeader && (
        <div className="mb-4 flex items-center justify-between gap-4">
          {title ? (
            <h2
              id="card-title"
              className={`text-lg font-semibold text-foreground ${titleClassName}`}
            >
              {title}
            </h2>
          ) : (
            <span />
          )}
          {titleRight && (
            <span className="text-sm text-muted shrink-0">{titleRight}</span>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
