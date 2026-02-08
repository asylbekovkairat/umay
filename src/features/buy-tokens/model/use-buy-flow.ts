"use client";

import { erc20Abi } from "@/src/shared/abi/erc20";
import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatUnits, maxUint256, parseUnits } from "viem";
import { polygon } from "viem/chains";
import {
  useAccount,
  useConnect,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BuyFlowMode =
  | "CONNECT"
  | "WRONG_NETWORK"
  | "SALE_INACTIVE"
  | "INVALID_AMOUNT"
  | "APPROVE"
  | "BUY"
  | "PENDING"
  | "SUCCESS"
  | "ERROR";

export interface UseBuyFlowReturn {
  /** Current mode of the state machine */
  mode: BuyFlowMode;
  /** True while initial chain reads are loading */
  isLoading: boolean;

  // ─── Formatted values for UI ────────────────────────────────────────────
  /** User's USDT balance (from formatUnits) */
  usdtBalance: string;
  /** Max available = min(balance, remaining) (from formatUnits) */
  maxBuy: string;
  /** Max available as a JS number for convenience */
  maxBuyNum: number;
  /** Preview tokens the user will receive (from formatUnits) */
  previewTokens: string;
  /** Whether sale is currently active */
  saleActive: boolean | undefined;
  /** USDT decimals read from pool */
  usdtDecimals: number | undefined;
  /** Share-token decimals read from pool */
  shareTokenDecimals: number | undefined;
  /** Buy transaction hash (available after buy tx submitted) */
  txHash: `0x${string}` | undefined;
  /** Human-readable error message (on ERROR mode) */
  errorMessage: string | undefined;
  /** Input validation error (shown below the input field) */
  validationError: string | null;

  // ─── Actions ────────────────────────────────────────────────────────────
  /** Connect wallet (uses first available connector) */
  connectWallet: () => void;
  /** Switch wallet to Polygon */
  switchNetwork: () => void;
  /** Send approve tx */
  approve: () => void;
  /** Send buyTokens tx */
  buy: () => void;
  /** Reset after SUCCESS / ERROR (clears tx state so user can buy again) */
  reset: () => void;
  /** All configured wagmi connectors (for advanced UI) */
  connectors: readonly any[];
  /** Connect with a specific connector */
  connectWith: (connector: any) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractErrorMessage(error: unknown): string {
  if (!error) return "Unknown error";
  if (typeof error === "object" && error !== null) {
    if (
      "shortMessage" in error &&
      typeof (error as Record<string, unknown>).shortMessage === "string"
    ) {
      return (error as Record<string, string>).shortMessage;
    }
    if (error instanceof Error) {
      return error.message.split("\n")[0].slice(0, 120);
    }
  }
  return String(error).slice(0, 120);
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useBuyFlow(inputUSDT: string): UseBuyFlowReturn {
  // ── Wallet ────────────────────────────────────────────────────────────────
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchChain } = useSwitchChain();

  // ── Internal flag: waiting for allowance refetch after approve ──────────
  const [pendingAllowanceRefresh, setPendingAllowanceRefresh] = useState(false);

  // ── Pool reads (chain-only, no wallet required) ─────────────────────────
  const { data: saleActive } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "saleActive",
  });

  const { data: remainingRaw, refetch: refetchRemaining } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "remainingToCapUSDT",
  });

  const { data: usdtAddress } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "usdt",
  });

  const { data: usdtDec } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "usdtDecimals",
  });

  const { data: shareDec } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "shareTokenDecimals",
  });

  // ── User-specific reads ─────────────────────────────────────────────────
  const { data: balanceRaw, refetch: refetchBalance } = useReadContract({
    address: usdtAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  const { data: allowanceRaw, refetch: refetchAllowance } = useReadContract({
    address: usdtAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: address ? [address, env.poolAddress] : undefined,
  });

  // ── Parse input → amountRaw ─────────────────────────────────────────────
  const amountRaw = useMemo(() => {
    if (!inputUSDT || usdtDec === undefined) return undefined;
    try {
      const parsed = parseUnits(inputUSDT, usdtDec);
      return parsed > BigInt(0) ? parsed : undefined;
    } catch {
      return undefined;
    }
  }, [inputUSDT, usdtDec]);

  // ── Max buy = min(balance, remaining) ───────────────────────────────────
  const maxBuyRaw = useMemo(() => {
    if (balanceRaw === undefined || remainingRaw === undefined)
      return undefined;
    return balanceRaw < remainingRaw ? balanceRaw : remainingRaw;
  }, [balanceRaw, remainingRaw]);

  // ── On-chain preview ────────────────────────────────────────────────────
  const { data: previewRaw } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "previewBuy",
    args: amountRaw && amountRaw > BigInt(0) ? [amountRaw] : undefined,
  });

  // ── Write contracts (two independent instances) ─────────────────────────
  const {
    writeContract: writeApprove,
    data: approveHash,
    isPending: isApproveSigning,
    error: approveError,
    reset: resetApprove,
  } = useWriteContract();

  const {
    writeContract: writeBuy,
    data: buyHash,
    isPending: isBuySigning,
    error: buyError,
    reset: resetBuy,
  } = useWriteContract();

  // ── Transaction receipts ────────────────────────────────────────────────
  const {
    isLoading: isApproveConfirming,
    isSuccess: isApproveConfirmed,
    isError: isApproveReceiptError,
    error: approveReceiptError,
  } = useWaitForTransactionReceipt({ hash: approveHash });

  const {
    isLoading: isBuyConfirming,
    isSuccess: isBuyConfirmed,
    isError: isBuyReceiptError,
    error: buyReceiptError,
  } = useWaitForTransactionReceipt({ hash: buyHash });

  // ── Side-effect: approve confirmed → refetch allowance ──────────────────
  useEffect(() => {
    if (isApproveConfirmed && !pendingAllowanceRefresh) {
      setPendingAllowanceRefresh(true);
      refetchAllowance().finally(() => {
        resetApprove();
        setPendingAllowanceRefresh(false);
      });
    }
  }, [
    isApproveConfirmed,
    pendingAllowanceRefresh,
    refetchAllowance,
    resetApprove,
  ]);

  // ── Side-effect: buy confirmed → refetch balances ───────────────────────
  useEffect(() => {
    if (isBuyConfirmed) {
      refetchBalance();
      refetchAllowance();
      refetchRemaining();
    }
  }, [isBuyConfirmed, refetchBalance, refetchAllowance, refetchRemaining]);

  // ── Mode (state machine) ────────────────────────────────────────────────
  const mode = useMemo((): BuyFlowMode => {
    // Buy transaction lifecycle (highest priority)
    if (isBuySigning || isBuyConfirming) return "PENDING";
    if (isBuyConfirmed) return "SUCCESS";
    if (buyError || isBuyReceiptError) return "ERROR";

    // Approve transaction lifecycle
    if (isApproveSigning || isApproveConfirming || pendingAllowanceRefresh)
      return "PENDING";
    if (approveError || isApproveReceiptError) return "ERROR";

    // Connection
    if (!isConnected) return "CONNECT";
    if (chainId !== polygon.id) return "WRONG_NETWORK";

    // Pool state
    if (saleActive === false) return "SALE_INACTIVE";

    // Amount validation
    if (!amountRaw) return "INVALID_AMOUNT";
    if (maxBuyRaw !== undefined && amountRaw > maxBuyRaw)
      return "INVALID_AMOUNT";

    // Allowance check (if still loading, wait)
    if (allowanceRaw === undefined) return "INVALID_AMOUNT";
    if (amountRaw > allowanceRaw) return "APPROVE";

    return "BUY";
  }, [
    isBuySigning,
    isBuyConfirming,
    isBuyConfirmed,
    buyError,
    isBuyReceiptError,
    isApproveSigning,
    isApproveConfirming,
    pendingAllowanceRefresh,
    approveError,
    isApproveReceiptError,
    isConnected,
    chainId,
    saleActive,
    amountRaw,
    maxBuyRaw,
    allowanceRaw,
  ]);

  // ── Formatted values ────────────────────────────────────────────────────
  const usdtBalance = useMemo(() => {
    if (balanceRaw === undefined || usdtDec === undefined) return "0";
    return formatUnits(balanceRaw, usdtDec);
  }, [balanceRaw, usdtDec]);

  const maxBuy = useMemo(() => {
    if (maxBuyRaw === undefined || usdtDec === undefined) return "0";
    return formatUnits(maxBuyRaw, usdtDec);
  }, [maxBuyRaw, usdtDec]);

  const maxBuyNum = useMemo(() => parseFloat(maxBuy) || 0, [maxBuy]);

  const previewTokens = useMemo(() => {
    if (previewRaw === undefined || shareDec === undefined) return "0";
    return formatUnits(previewRaw, shareDec);
  }, [previewRaw, shareDec]);

  const isLoading = useMemo(() => {
    if (saleActive === undefined) return true;
    if (usdtDec === undefined) return true;
    if (isConnected && chainId === polygon.id && usdtAddress === undefined)
      return true;
    return false;
  }, [saleActive, usdtDec, isConnected, chainId, usdtAddress]);

  const errorMessage = useMemo(() => {
    if (buyError) return extractErrorMessage(buyError);
    if (buyReceiptError) return extractErrorMessage(buyReceiptError);
    if (approveError) return extractErrorMessage(approveError);
    if (approveReceiptError) return extractErrorMessage(approveReceiptError);
    return undefined;
  }, [buyError, buyReceiptError, approveError, approveReceiptError]);

  // ── Input validation error (user-facing, below input) ─────────────────
  const validationError = useMemo((): string | null => {
    // Only validate when the user is connected, on right chain, sale active
    if (!isConnected || chainId !== polygon.id) return null;
    if (saleActive === false) return null;
    // Nothing typed yet → no error
    if (!inputUSDT) return null;

    // Invalid number (parseUnits failed)
    if (usdtDec !== undefined && !amountRaw)
      return "Please enter a valid amount";

    // Data still loading
    if (usdtDec === undefined || maxBuyRaw === undefined) return null;

    // Exceeds max
    if (amountRaw && maxBuyRaw !== undefined && amountRaw > maxBuyRaw) {
      return `Amount exceeds max available (${formatUnits(
        maxBuyRaw,
        usdtDec
      )} USDT)`;
    }

    return null;
  }, [
    isConnected,
    chainId,
    saleActive,
    inputUSDT,
    usdtDec,
    amountRaw,
    maxBuyRaw,
  ]);

  // ── Actions ─────────────────────────────────────────────────────────────
  const connectWallet = useCallback(() => {
    if (connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  }, [connect, connectors]);

  const connectWith = useCallback(
    (connector: any) => connect({ connector }),
    [connect]
  );

  const switchNetwork = useCallback(() => {
    switchChain({ chainId: polygon.id });
  }, [switchChain]);

  const approve = useCallback(() => {
    if (!usdtAddress || !amountRaw) return;
    writeApprove({
      address: usdtAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [env.poolAddress, maxUint256],
    });
  }, [usdtAddress, amountRaw, writeApprove]);

  const buy = useCallback(() => {
    if (!amountRaw) return;
    writeBuy({
      address: env.poolAddress,
      abi: investmentPoolAbi,
      functionName: "buyTokens",
      args: [amountRaw],
    });
  }, [amountRaw, writeBuy]);

  const reset = useCallback(() => {
    resetApprove();
    resetBuy();
  }, [resetApprove, resetBuy]);

  // ── Return ──────────────────────────────────────────────────────────────
  return {
    mode,
    isLoading,
    usdtBalance,
    maxBuy,
    maxBuyNum,
    previewTokens,
    saleActive,
    usdtDecimals: usdtDec,
    shareTokenDecimals: shareDec,
    txHash: buyHash,
    errorMessage,
    validationError,
    connectWallet,
    switchNetwork,
    approve,
    buy,
    reset,
    connectors,
    connectWith,
  };
}
