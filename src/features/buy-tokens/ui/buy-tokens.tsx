"use client";

import { Badge } from "@/src/shared/ui/badge";
import { Button } from "@/src/shared/ui/button";
import { Card } from "@/src/shared/ui/card";
import { useCallback, useState, type ChangeEvent, type ReactNode } from "react";
import { useBuyFlow, type BuyFlowMode } from "../model/use-buy-flow";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Locale-formatted display value (e.g. "1,250.50") */
function formatDisplay(raw: string): string {
  const n = parseFloat(raw);
  if (isNaN(n)) return "0.00";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ─── Inline Icons (Lucide-style, 20×20) ──────────────────────────────────────

function ShieldIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function LockIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function AlertTriangleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function CheckCircleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

function XCircleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

function NetworkIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function WalletIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function InfoBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl bg-muted-bg/60 border border-border px-4 py-3">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-sm font-semibold text-foreground">{children}</span>
    </div>
  );
}

function StatusBadge({
  mode,
  saleActive,
}: {
  mode: BuyFlowMode;
  saleActive: boolean | undefined;
}) {
  if (mode === "WRONG_NETWORK")
    return <Badge variant="warning">Wrong Network</Badge>;
  if (mode === "SALE_INACTIVE")
    return <Badge variant="inactive">Sale Inactive</Badge>;
  if (saleActive === undefined)
    return <Badge variant="neutral">Loading…</Badge>;
  return <Badge variant="active">Sale Active</Badge>;
}

function StepIndicator({
  step,
  total,
  label,
}: {
  step: number;
  total: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted">
      <span className="inline-flex items-center justify-center size-5 rounded-full bg-accent/15 text-accent text-[10px] font-bold">
        {step}
      </span>
      <span>
        Step {step} of {total}: {label}
      </span>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function BuyTokensForm() {
  const [inputUSDT, setInputUSDT] = useState("");
  const flow = useBuyFlow(inputUSDT);

  console.log("flow", flow);

  // ── Handlers ────────────────────────────────────────────────────────────

  const handleAmountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      setInputUSDT(val);
    }
  }, []);

  const handleMax = useCallback(() => {
    if (flow.maxBuyNum > 0) {
      setInputUSDT(flow.maxBuy);
    }
  }, [flow.maxBuy, flow.maxBuyNum]);

  const handleReset = useCallback(() => {
    setInputUSDT("");
    flow.reset();
  }, [flow.reset]);

  // ── Derived ─────────────────────────────────────────────────────────────

  const isInputDisabled =
    flow.mode === "CONNECT" ||
    flow.mode === "WRONG_NETWORK" ||
    flow.mode === "SALE_INACTIVE" ||
    flow.mode === "PENDING" ||
    flow.mode === "SUCCESS";

  const explorerUrl = "https://polygonscan.com";

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <Card className="w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Buy Pool Tokens
        </h2>
        <p className="mt-1 text-sm text-muted">
          Invest USDT and receive pool tokens
        </p>
      </div>

      {/* Wrong Network Warning */}
      {flow.mode === "WRONG_NETWORK" && (
        <div className="flex items-start gap-3 rounded-xl border border-warning/25 bg-warning/10 px-4 py-3 mb-6">
          <AlertTriangleIcon className="size-5 shrink-0 text-warning mt-0.5" />
          <div>
            <p className="text-sm font-medium text-warning">
              Wrong network detected
            </p>
            <p className="mt-0.5 text-xs text-warning/80">
              Please switch to Polygon network to continue
            </p>
          </div>
        </div>
      )}

      {/* Success Banner */}
      {flow.mode === "SUCCESS" && (
        <div className="flex items-start gap-3 rounded-xl border border-positive/25 bg-positive/10 px-4 py-3 mb-6">
          <CheckCircleIcon className="size-5 shrink-0 text-positive mt-0.5" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-positive">
              Purchase completed successfully
            </p>
            {flow.txHash && (
              <a
                href={`${explorerUrl}/tx/${flow.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-xs text-positive/80 underline decoration-positive/40 underline-offset-2 hover:text-positive hover:decoration-positive/60 transition-colors"
              >
                <span className="truncate font-mono">
                  {flow.txHash.slice(0, 10)}…{flow.txHash.slice(-8)}
                </span>
                <ArrowRightIcon className="size-3 shrink-0 -rotate-45" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Error Banner */}
      {flow.mode === "ERROR" && (
        <div className="flex items-start gap-3 rounded-xl border border-negative/25 bg-negative/10 px-4 py-3 mb-6">
          <XCircleIcon className="size-5 shrink-0 text-negative mt-0.5" />
          <div>
            <p className="text-sm font-medium text-negative">
              {flow.errorMessage ?? "Transaction failed"}
            </p>
            <p className="mt-0.5 text-xs text-negative/80">
              Please try again or check your wallet
            </p>
          </div>
        </div>
      )}

      {/* Input Block */}
      <div className="mb-6">
        <label
          htmlFor="buy-amount"
          className="block text-sm font-medium text-foreground mb-2"
        >
          USDT Amount
        </label>

        <div
          className={[
            "relative flex items-center rounded-xl border bg-muted-bg/40 transition-colors",
            isInputDisabled
              ? "border-border opacity-60 cursor-not-allowed"
              : flow.validationError
              ? "border-negative/50 focus-within:border-negative focus-within:ring-2 focus-within:ring-negative/20"
              : "border-border focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/20",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <input
            id="buy-amount"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="0.00"
            value={inputUSDT}
            onChange={handleAmountChange}
            disabled={isInputDisabled}
            className="w-full bg-transparent px-4 py-3 text-base font-medium text-foreground placeholder:text-muted/50 focus:outline-none disabled:cursor-not-allowed"
          />
          <button
            type="button"
            onClick={handleMax}
            disabled={isInputDisabled}
            className="mr-3 shrink-0 rounded-lg bg-accent/15 px-3 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent/25 focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:pointer-events-none disabled:opacity-50"
          >
            Max
          </button>
        </div>

        {/* Validation / helper text */}
        {flow.validationError ? (
          <p className="mt-2 text-xs text-negative" role="alert">
            {flow.validationError}
          </p>
        ) : (
          <p className="mt-2 text-xs text-muted">
            {flow.mode === "APPROVE"
              ? "Approval is required before purchase"
              : "You can invest up to the maximum available amount"}
          </p>
        )}
      </div>

      {/* Preview Block */}
      {flow.mode !== "CONNECT" &&
        flow.mode !== "WRONG_NETWORK" &&
        flow.mode !== "SALE_INACTIVE" && (
          <div className="rounded-xl border border-border bg-muted-bg/30 px-4 py-3 mb-6">
            <p className="text-xs text-muted">You will receive approximately</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              ≈ {formatDisplay(flow.previewTokens)}{" "}
              <span className="text-sm font-normal text-muted">POOL</span>
            </p>
            <p className="mt-1.5 text-[11px] text-muted/70">
              Final amount may slightly vary due to on-chain calculation
            </p>
          </div>
        )}

      {/* Step Indicator: Approve */}
      {flow.mode === "APPROVE" && (
        <div className="mb-4 space-y-3">
          <StepIndicator step={1} total={2} label="Approve USDT" />
          <div className="flex items-start gap-2.5 rounded-xl border border-accent/15 bg-accent/5 px-4 py-3">
            <ShieldIcon className="size-4 shrink-0 text-accent mt-0.5" />
            <div>
              <p className="text-xs text-foreground">
                Before purchasing, you need to approve USDT spending.
              </p>
              <p className="mt-0.5 text-[11px] text-muted">
                This does not transfer funds.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step Indicator: Buy */}
      {flow.mode === "BUY" && (
        <div className="mb-4 space-y-3">
          <StepIndicator step={2} total={2} label="Buy Tokens" />
          <div className="flex items-start gap-2.5 rounded-xl border border-accent/15 bg-accent/5 px-4 py-3">
            <ArrowRightIcon className="size-4 shrink-0 text-accent mt-0.5" />
            <p className="text-xs text-foreground">
              USDT will be transferred to the pool.
            </p>
          </div>
        </div>
      )}

      {/* Pending Info */}
      {flow.mode === "PENDING" && (
        <div className="flex items-start gap-2.5 rounded-xl border border-accent/15 bg-accent/5 px-4 py-3 mb-4">
          <span
            className="size-4 shrink-0 mt-0.5 animate-spin rounded-full border-2 border-accent border-t-transparent"
            aria-hidden
          />
          <p className="text-xs text-foreground">
            Transaction pending… Please confirm in your wallet.
          </p>
        </div>
      )}

      {/* ─── Action Buttons ──────────────────────────────────────────────────── */}

      {flow.mode === "CONNECT" && (
        <Button
          fullWidth
          size="lg"
          variant="secondary"
          onClick={flow.connectWallet}
        >
          <WalletIcon className="size-5" />
          Connect wallet to buy
        </Button>
      )}

      {flow.mode === "WRONG_NETWORK" && (
        <Button
          fullWidth
          size="lg"
          variant="primary"
          onClick={flow.switchNetwork}
        >
          <NetworkIcon className="size-5" />
          Switch to Polygon
        </Button>
      )}

      {flow.mode === "SALE_INACTIVE" && (
        <Button fullWidth size="lg" disabled>
          <LockIcon className="size-5" />
          Sale is inactive
        </Button>
      )}

      {flow.mode === "INVALID_AMOUNT" && (
        <Button fullWidth size="lg" disabled>
          {!inputUSDT
            ? "Enter an amount"
            : flow.validationError
            ? "Amount exceeds maximum"
            : flow.isLoading
            ? "Loading…"
            : "Enter a valid amount"}
        </Button>
      )}

      {flow.mode === "APPROVE" && (
        <Button fullWidth size="lg" variant="primary" onClick={flow.approve}>
          <ShieldIcon className="size-5" />
          Approve USDT
        </Button>
      )}

      {flow.mode === "BUY" && (
        <Button fullWidth size="lg" variant="primary" onClick={flow.buy}>
          <ArrowRightIcon className="size-5" />
          Buy Tokens
        </Button>
      )}

      {flow.mode === "PENDING" && (
        <Button fullWidth size="lg" loading disabled>
          Processing…
        </Button>
      )}

      {flow.mode === "SUCCESS" && (
        <Button fullWidth size="lg" variant="secondary" onClick={handleReset}>
          <CheckCircleIcon className="size-5" />
          Buy More Tokens
        </Button>
      )}

      {flow.mode === "ERROR" && (
        <Button fullWidth size="lg" variant="primary" onClick={flow.reset}>
          Try Again
        </Button>
      )}
    </Card>
  );
}
