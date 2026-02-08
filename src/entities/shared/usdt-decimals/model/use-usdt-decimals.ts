/* External dependencies */
import { useReadContract } from "wagmi";

/* Local dependencies */
import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";

export function useUsdtDecimals() {
  const { data: usdtDecimals } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "usdtDecimals",
  });

  return { usdtDecimals };
}
