"use client";

/* External dependencies */
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

/* Local dependencies */
import { useRemainingCap } from "@/src/entities/investment-pool/cap";
import { useSaleStatus } from "@/src/entities/investment-pool/sale-status";
import { useUsdtDecimals } from "@/src/entities/shared/usdt-decimals";
import { useWalletBalance } from "@/src/entities/wallet/balance/model";
import { useShareTokenBalance } from "@/src/entities/wallet/share-token-balance";
import { erc20Abi } from "@/src/shared/abi/erc20";
import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";
import { BuyFlowMode, UseBuyFlowReturn } from "./types";

function extractErrorMessage(error: unknown): string {
  if (!error) {
    return "Unknown error";
  }

  if (typeof error === "object" && error !== null) {
    const hasShortMessage =
      "shortMessage" in error &&
      typeof (error as Record<string, unknown>).shortMessage === "string";

    if (hasShortMessage) {
      return (error as Record<string, string>).shortMessage;
    }

    if (error instanceof Error) {
      return error.message.split("\n")[0].slice(0, 120);
    }
  }

  return String(error).slice(0, 120);
}

export function useBuyFlow(inputUSDT: string): UseBuyFlowReturn {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchChain } = useSwitchChain();

  const isOnPolygon = chainId === polygon.id;

  const { saleActive } = useSaleStatus();
  const { usdtDecimals } = useUsdtDecimals();
  const { shareBalanceRaw } = useShareTokenBalance();
  const { usdtBalanceRaw, refetchBalance } = useWalletBalance();

  const { remainingToCapRaw, refetchRemainingToCap: refetchRemaining } =
    useRemainingCap();

  const { data: usdtAddress } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "usdt",
  });

  const { data: allowanceRaw, refetch: refetchAllowance } = useReadContract({
    address: usdtAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: address ? [address, env.poolAddress] : undefined,
  });

  const amountRaw = useMemo(() => {
    if (!inputUSDT || usdtDecimals === undefined) return undefined;
    try {
      const parsed = parseUnits(inputUSDT, usdtDecimals);
      return parsed > BigInt(0) ? parsed : undefined;
    } catch {
      return undefined;
    }
  }, [inputUSDT, usdtDecimals]);

  const hasValidAmount = amountRaw !== undefined;

  const maxBuyRaw = useMemo(() => {
    if (usdtBalanceRaw === undefined || remainingToCapRaw === undefined)
      return undefined;
    return usdtBalanceRaw < remainingToCapRaw
      ? usdtBalanceRaw
      : remainingToCapRaw;
  }, [usdtBalanceRaw, remainingToCapRaw]);

  const isAmountExceedsMax =
    hasValidAmount && maxBuyRaw !== undefined && amountRaw > maxBuyRaw;

  const isAllowanceLoaded = allowanceRaw !== undefined;

  const needsApproval =
    hasValidAmount && isAllowanceLoaded && amountRaw > allowanceRaw;

  const { data: previewRaw } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "previewBuy",
    args: hasValidAmount ? [amountRaw] : undefined,
  });

  const {
    writeContract: writeApprove,
    data: approveHash,
    isPending: isApproveSigning,
    error: approveError,
    reset: resetApprove,
  } = useWriteContract();

  const {
    isLoading: isApproveConfirming,
    isSuccess: isApproveConfirmed,
    isError: isApproveReceiptFailed,
    error: approveReceiptError,
  } = useWaitForTransactionReceipt({ hash: approveHash });

  const [pendingAllowanceRefresh, setPendingAllowanceRefresh] = useState(false);

  const isApprovePending =
    isApproveSigning || isApproveConfirming || pendingAllowanceRefresh;
  const hasApproveError = !!approveError || isApproveReceiptFailed;

  const {
    writeContract: writeBuy,
    data: buyHash,
    isPending: isBuySigning,
    error: buyError,
    reset: resetBuy,
  } = useWriteContract();

  const {
    isLoading: isBuyConfirming,
    isSuccess: isBuyConfirmed,
    isError: isBuyReceiptFailed,
    error: buyReceiptError,
  } = useWaitForTransactionReceipt({ hash: buyHash });

  const isBuyPending = isBuySigning || isBuyConfirming;
  const hasBuyError = !!buyError || isBuyReceiptFailed;
  const isWaitingForSaleStatus = saleActive === undefined;
  const isWaitingForDecimals = usdtDecimals === undefined;
  const isWaitingForUsdtAddress =
    isConnected && isOnPolygon && usdtAddress === undefined;
  const isLoading =
    isWaitingForSaleStatus ||
    isWaitingForDecimals ||
    isWaitingForUsdtAddress ||
    isBuyPending;

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

  useEffect(() => {
    if (isBuyConfirmed) {
      refetchBalance();
      refetchAllowance();
      refetchRemaining();
    }
  }, [isBuyConfirmed, refetchBalance, refetchAllowance, refetchRemaining]);

  const mode = useMemo((): BuyFlowMode => {
    // Transaction in progress takes highest priority
    if (isBuyPending) return "PENDING";
    if (isBuyConfirmed) return "SUCCESS";
    if (hasBuyError) return "ERROR";

    if (isApprovePending) return "PENDING";
    if (hasApproveError) return "ERROR";

    // Wallet / network pre-conditions
    if (!isConnected) return "CONNECT";
    if (!isOnPolygon) return "WRONG_NETWORK";

    // Sale gate
    if (saleActive === false) return "SALE_INACTIVE";

    // Amount validation
    if (!hasValidAmount || isAmountExceedsMax) return "INVALID_AMOUNT";

    // Allowance not yet loaded — can't determine approval need
    if (!isAllowanceLoaded) return "INVALID_AMOUNT";

    // Approval step
    if (needsApproval) return "APPROVE";

    return "BUY";
  }, [
    isBuyPending,
    isBuyConfirmed,
    hasBuyError,
    isApprovePending,
    hasApproveError,
    isConnected,
    isOnPolygon,
    saleActive,
    hasValidAmount,
    isAmountExceedsMax,
    isAllowanceLoaded,
    needsApproval,
  ]);

  const usdtBalance = useMemo(() => {
    if (usdtBalanceRaw === undefined || usdtDecimals === undefined) {
      return "0";
    }

    return formatUnits(usdtBalanceRaw, usdtDecimals);
  }, [usdtBalanceRaw, usdtDecimals]);

  const maxBuy = useMemo(() => {
    if (maxBuyRaw === undefined || usdtDecimals === undefined) {
      return "0";
    }

    return formatUnits(maxBuyRaw, usdtDecimals);
  }, [maxBuyRaw, usdtDecimals]);

  const maxBuyNum = useMemo(() => parseFloat(maxBuy) || 0, [maxBuy]);

  const previewTokens = useMemo(() => {
    if (previewRaw === undefined || shareBalanceRaw === undefined) {
      return "0";
    }

    return formatUnits(previewRaw, Number(shareBalanceRaw));
  }, [previewRaw, shareBalanceRaw]);

  const errorMessage = useMemo(() => {
    if (buyError) {
      return extractErrorMessage(buyError);
    }

    if (buyReceiptError) {
      return extractErrorMessage(buyReceiptError);
    }

    if (approveError) {
      return extractErrorMessage(approveError);
    }

    if (approveReceiptError) {
      return extractErrorMessage(approveReceiptError);
    }

    return null;
  }, [buyError, buyReceiptError, approveError, approveReceiptError]);

  const validationError = useMemo((): string | null => {
    const isConnectedOnPolygon = isConnected && isOnPolygon;

    if (!isConnectedOnPolygon || saleActive === false || !inputUSDT) {
      return null;
    }

    const hasDecimalsButInvalidAmount =
      usdtDecimals !== undefined && !hasValidAmount;

    if (hasDecimalsButInvalidAmount) {
      return "Please enter a valid amount";
    }

    if (usdtDecimals === undefined || maxBuyRaw === undefined) {
      return null;
    }

    if (isAmountExceedsMax) {
      return `Amount exceeds max available (${formatUnits(
        maxBuyRaw,
        usdtDecimals
      )} USDT)`;
    }

    return null;
  }, [
    isConnected,
    isOnPolygon,
    saleActive,
    inputUSDT,
    usdtDecimals,
    hasValidAmount,
    maxBuyRaw,
    isAmountExceedsMax,
  ]);

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

  return {
    connectors,
    errorMessage,
    isLoading,
    maxBuy,
    maxBuyNum,
    mode,
    previewTokens,
    saleActive,
    shareTokenDecimals: shareBalanceRaw,
    txHash: buyHash,
    usdtBalance,
    usdtDecimals,
    validationError,
    approve,
    buy,
    connectWallet,
    connectWith,
    reset,
    switchNetwork,
  };
}
