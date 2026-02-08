"use client";

import {
  AlertTriangleIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  LockIcon,
  NetworkIcon,
  ShieldIcon,
  WalletIcon,
  XCircleIcon,
} from "@/src/shared/assets/icons";
import { formatDisplay } from "@/src/shared/lib/format-money";
import { Button } from "@/src/shared/ui/button";
import { Card } from "@/src/shared/ui/card";
import { ReactNode, useCallback, useState, type ChangeEvent } from "react";
import { BuyFlowMode, useBuyFlow } from "../model";
import { StepIndicator } from "./step-indicator";

const explorerUrl = "https://polygonscan.com";

export function BuyTokensForm() {
  const [inputUSDT, setInputUSDT] = useState("");
  const flow = useBuyFlow(inputUSDT);

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

  const isInputDisabled =
    flow.mode === "CONNECT" ||
    flow.mode === "WRONG_NETWORK" ||
    flow.mode === "SALE_INACTIVE" ||
    flow.mode === "PENDING" ||
    flow.mode === "SUCCESS";

  const previewBlock = (
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
  );

  const flowModeStepContent: Partial<Record<BuyFlowMode, ReactNode>> = {
    APPROVE: (
      <>
        {previewBlock}
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
      </>
    ),
    BUY: (
      <>
        {previewBlock}
        <div className="mb-4 space-y-3">
          <StepIndicator step={2} total={2} label="Buy Tokens" />
          <div className="flex items-start gap-2.5 rounded-xl border border-accent/15 bg-accent/5 px-4 py-3">
            <ArrowRightIcon className="size-4 shrink-0 text-accent mt-0.5" />
            <p className="text-xs text-foreground">
              USDT will be transferred to the pool.
            </p>
          </div>
        </div>
      </>
    ),
    PENDING: (
      <>
        {previewBlock}
        <div className="flex items-start gap-2.5 rounded-xl border border-accent/15 bg-accent/5 px-4 py-3 mb-4">
          <span
            className="size-4 shrink-0 mt-0.5 animate-spin rounded-full border-2 border-accent border-t-transparent"
            aria-hidden
          />
          <p className="text-xs text-foreground">
            Transaction pending… Please confirm in your wallet.
          </p>
        </div>
      </>
    ),
    SUCCESS: previewBlock,
    ERROR: previewBlock,
    INVALID_AMOUNT: previewBlock,
  };

  const flowModeFormMessage: Partial<Record<BuyFlowMode, ReactNode>> = {
    WRONG_NETWORK: (
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
    ),
    SUCCESS: (
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
    ),
    ERROR: (
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
    ),
  };

  const flowModeButton: Record<BuyFlowMode, ReactNode> = {
    APPROVE: (
      <Button fullWidth size="lg" variant="primary" onClick={flow.approve}>
        <ShieldIcon className="size-5" />
        Approve USDT
      </Button>
    ),
    BUY: (
      <Button fullWidth size="lg" variant="primary" onClick={flow.buy}>
        <ArrowRightIcon className="size-5" />
        Buy Tokens
      </Button>
    ),
    PENDING: (
      <Button fullWidth size="lg" loading disabled>
        Processing…
      </Button>
    ),
    SUCCESS: (
      <Button fullWidth size="lg" variant="secondary" onClick={handleReset}>
        <CheckCircleIcon className="size-5" />
        Buy More Tokens
      </Button>
    ),
    ERROR: (
      <Button fullWidth size="lg" variant="primary" onClick={flow.reset}>
        Try Again
      </Button>
    ),
    INVALID_AMOUNT: (
      <Button fullWidth size="lg" disabled>
        {!inputUSDT
          ? "Enter an amount"
          : flow.validationError
          ? "Amount exceeds maximum"
          : flow.isLoading
          ? "Loading…"
          : "Enter a valid amount"}
      </Button>
    ),
    WRONG_NETWORK: (
      <Button
        fullWidth
        size="lg"
        variant="primary"
        onClick={flow.switchNetwork}
      >
        <NetworkIcon className="size-5" />
        Switch to Polygon
      </Button>
    ),
    SALE_INACTIVE: (
      <Button fullWidth size="lg" disabled>
        <LockIcon className="size-5" />
        Sale is inactive
      </Button>
    ),
    CONNECT: (
      <Button
        fullWidth
        size="lg"
        variant="secondary"
        onClick={flow.connectWallet}
      >
        <WalletIcon className="size-5" />
        Connect wallet to buy
      </Button>
    ),
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Buy Pool Tokens
        </h2>
        <p className="mt-1 text-sm text-muted">
          Invest USDT and receive pool tokens
        </p>
      </div>

      {flowModeFormMessage[flow.mode]}

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

      {flowModeStepContent[flow.mode]}
      {flowModeButton[flow.mode]}
    </Card>
  );
}
