/* External dependencies */
import { formatUnits } from "viem";
import { useReadContract } from "wagmi";

/* Local dependencies */
import { useUsdtDecimals } from "@/src/entities/shared/usdt-decimals";
import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";

export function useRemainingCap() {
  const { usdtDecimals } = useUsdtDecimals();

  const { data: remainingToCapUSDT, refetch: refetchRemainingToCap } =
    useReadContract({
      address: env.poolAddress,
      abi: investmentPoolAbi,
      functionName: "remainingToCapUSDT",
    });

  const remainingToCap =
    remainingToCapUSDT && usdtDecimals
      ? formatUnits(remainingToCapUSDT, usdtDecimals)
      : null;

  return {
    remainingToCapRaw: remainingToCapUSDT,
    remainingToCap,
    refetchRemainingToCap,
  };
}
