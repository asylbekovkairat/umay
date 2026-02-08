"use client";

import { type ReactNode, useState } from "react";

export interface CardProps {
  title?: string;
  /** Текст или элемент справа от заголовка (напротив title) */
  titleRight?: ReactNode;
  titleClassName?: string;
  children: ReactNode;
  className?: string;
  /** Делает содержимое карточки сворачиваемым */
  collapsible?: boolean;
  /** Начальное состояние (раскрыто по умолчанию) */
  defaultOpen?: boolean;
}

export function Card({
  title,
  titleRight,
  children,
  className = "",
  titleClassName = "",
  collapsible = false,
  defaultOpen = true,
}: CardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasHeader = title ?? titleRight;

  return (
    <section
      className={`rounded-2xl surface surface-hover shadow-soft p-6 ${className}`}
      aria-labelledby={title ? "card-title" : undefined}
    >
      {hasHeader && (
        <div
          className={`flex items-center justify-between gap-4 ${
            isOpen ? "mb-4" : ""
          } ${collapsible ? "cursor-pointer select-none" : ""}`}
          onClick={collapsible ? () => setIsOpen((prev) => !prev) : undefined}
          role={collapsible ? "button" : undefined}
          aria-expanded={collapsible ? isOpen : undefined}
          tabIndex={collapsible ? 0 : undefined}
          onKeyDown={
            collapsible
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsOpen((prev) => !prev);
                  }
                }
              : undefined
          }
        >
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
          <div className="flex items-center gap-3 shrink-0">
            {titleRight && (
              <span className="text-sm text-muted">{titleRight}</span>
            )}
            {collapsible && (
              <svg
                className={`size-5 text-muted transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>
        </div>
      )}
      {collapsible ? (
        <div
          className={`grid transition-all duration-200 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">{children}</div>
        </div>
      ) : (
        children
      )}
    </section>
  );
}
