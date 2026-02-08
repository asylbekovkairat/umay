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
import { BuyFlowMode, UseBuyFlowReturn } from "./types";

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

export function useBuyFlow(inputUSDT: string): UseBuyFlowReturn {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchChain } = useSwitchChain();

  const [pendingAllowanceRefresh, setPendingAllowanceRefresh] = useState(false);

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

  const amountRaw = useMemo(() => {
    if (!inputUSDT || usdtDec === undefined) return undefined;
    try {
      const parsed = parseUnits(inputUSDT, usdtDec);
      return parsed > BigInt(0) ? parsed : undefined;
    } catch {
      return undefined;
    }
  }, [inputUSDT, usdtDec]);

  const maxBuyRaw = useMemo(() => {
    if (balanceRaw === undefined || remainingRaw === undefined)
      return undefined;
    return balanceRaw < remainingRaw ? balanceRaw : remainingRaw;
  }, [balanceRaw, remainingRaw]);

  const { data: previewRaw } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "previewBuy",
    args: amountRaw && amountRaw > BigInt(0) ? [amountRaw] : undefined,
  });

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
    if (isBuySigning || isBuyConfirming) return "PENDING";
    if (isBuyConfirmed) return "SUCCESS";
    if (buyError || isBuyReceiptError) return "ERROR";

    if (isApproveSigning || isApproveConfirming || pendingAllowanceRefresh)
      return "PENDING";
    if (approveError || isApproveReceiptError) return "ERROR";

    if (!isConnected) return "CONNECT";
    if (chainId !== polygon.id) return "WRONG_NETWORK";

    if (saleActive === false) return "SALE_INACTIVE";

    if (!amountRaw) return "INVALID_AMOUNT";
    if (maxBuyRaw !== undefined && amountRaw > maxBuyRaw)
      return "INVALID_AMOUNT";

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

  const validationError = useMemo((): string | null => {
    if (!isConnected || chainId !== polygon.id) return null;
    if (saleActive === false) return null;
    if (!inputUSDT) return null;

    if (usdtDec !== undefined && !amountRaw)
      return "Please enter a valid amount";

    if (usdtDec === undefined || maxBuyRaw === undefined) return null;

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
    shareTokenDecimals: shareDec,
    txHash: buyHash,
    usdtBalance,
    usdtDecimals: usdtDec,
    validationError,
    approve,
    buy,
    connectWallet,
    connectWith,
    reset,
    switchNetwork,
  };
}
