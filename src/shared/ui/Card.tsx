import { type HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article";
}

export function Card({
  as: Component = "div",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <Component
      className={`
        rounded-xl border border-border bg-card-bg p-6 shadow-sm
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
