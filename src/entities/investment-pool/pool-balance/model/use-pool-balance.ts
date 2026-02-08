/* External dependencies */
import { formatUnits } from "viem";
import { useReadContract } from "wagmi";

/* Local dependencies */
import { useUsdtDecimals } from "@/src/entities/shared/usdt-decimals";
import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";

export function usePoolBalance() {
  const { usdtDecimals } = useUsdtDecimals();

  const { data: poolUSDTBalance } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "poolUSDTBalance",
  });

  const poolUSDTBalanceFormatted =
    poolUSDTBalance && usdtDecimals
      ? formatUnits(poolUSDTBalance, usdtDecimals)
      : null;

  return { poolUSDTBalance: poolUSDTBalanceFormatted };
}
