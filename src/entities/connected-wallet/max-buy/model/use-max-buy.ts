import { useRemainingCap } from "@/src/entities/investment-pool/cap";
import { useUsdtDecimals } from "@/src/entities/shared/usdt-decimals";
import { formatUnits } from "viem";
import { useWalletBalance } from "../../balance/model";

export function useMaxBuy() {
  const { usdtBalanceRaw } = useWalletBalance();
  const { remainingToCapRaw } = useRemainingCap();
  const { usdtDecimals } = useUsdtDecimals();

  const maxBuyRaw =
    usdtBalanceRaw !== undefined && remainingToCapRaw !== undefined
      ? usdtBalanceRaw < remainingToCapRaw
        ? usdtBalanceRaw
        : remainingToCapRaw
      : undefined;

  const maxBuyFormatted =
    maxBuyRaw !== undefined && usdtDecimals !== undefined
      ? formatUnits(maxBuyRaw, usdtDecimals)
      : null;

  return { maxBuyRaw: maxBuyRaw ?? 0, maxBuy: maxBuyFormatted ?? 0 };
}
