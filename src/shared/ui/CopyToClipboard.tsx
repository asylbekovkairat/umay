"use client";

import { useCallback, useState } from "react";
import { useToast } from "./Toast";

export interface CopyToClipboardProps {
  /** Short text to display (e.g. 0x1234…abcd) */
  text: string;
  /** Full value to copy to clipboard (defaults to text) */
  copyValue?: string;
  /** Optional class name for the wrapper */
  className?: string;
}

export function CopyToClipboard({
  text,
  copyValue,
  className = "",
}: CopyToClipboardProps) {
  const { toast } = useToast();
  const [isCopying, setIsCopying] = useState(false);

  const valueToCopy = copyValue ?? text;

  const handleCopy = useCallback(async () => {
    if (isCopying) return;
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(valueToCopy);
      toast("success", "Copied to clipboard");
    } catch {
      toast("error", "Failed to copy");
    } finally {
      setIsCopying(false);
    }
  }, [valueToCopy, toast, isCopying]);

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-lg border border-border bg-card-bg px-2 py-1.5 font-mono text-sm ${className}`.trim()}
    >
      <span className="text-foreground">{text}</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy to clipboard"
        disabled={isCopying}
        className="rounded p-1 text-muted transition-colors hover:bg-muted-bg hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 disabled:opacity-60"
      >
        {isCopying ? (
          <span
            className="block size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden
          />
        ) : (
          <CopyIcon aria-hidden />
        )}
      </button>
    </div>
  );
}

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
      />
    </svg>
  );
}
