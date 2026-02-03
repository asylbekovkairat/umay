import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";
import { formatUnits } from "viem";
import { useReadContract } from "wagmi";

export function usePoolBalance() {
  const { data: poolUSDTBalance } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "poolUSDTBalance",
  });

  const { data: usdtDecimals } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "usdtDecimals",
  });

  const poolUSDTBalanceFormatted =
    poolUSDTBalance && usdtDecimals
      ? formatUnits(poolUSDTBalance, usdtDecimals)
      : null;

  return { poolUSDTBalance: poolUSDTBalanceFormatted };
}
