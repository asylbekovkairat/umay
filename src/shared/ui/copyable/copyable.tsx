"use client";

import { useCallback, useState } from "react";

export interface CopyableProps {
  /** Full value (e.g. 0x... or any other string) */
  value: string;
  /** Number of characters to show at the start (default: 6) */
  startChars?: number;
  /** Number of characters to show at the end (default: 4) */
  endChars?: number;
  /** Optional class name for the root element */
  className?: string;
}

function truncateAddress(
  value: string,
  startChars: number,
  endChars: number
): string {
  if (value.length <= startChars + endChars) return value;
  return `${value.slice(0, startChars)}…${value.slice(-endChars)}`;
}

export function Copyable({
  value,
  startChars = 6,
  endChars = 4,
  className = "",
}: CopyableProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // ignore
      }
    }
  }, [value]);

  const truncated = truncateAddress(value, startChars, endChars);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={[
        "focus:outline-none! focus:ring-2! focus:ring-ring! focus:ring-offset-2!",
        "inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 font-mono text-sm text-foreground",
        "transition-colors",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      title={value}
      aria-label={copied ? "Copied" : `Copy: ${value}`}
    >
      <span className="select-none">{truncated}</span>
      <span
        className={[
          "text-sm transition-colors",
          copied ? "text-green-600" : "text-muted-foreground",
        ].join(" ")}
        aria-hidden
        title={copied ? "Copied" : "Copy"}
      >
        {copied ? "✓" : "📋"}
      </span>
    </button>
  );
}
