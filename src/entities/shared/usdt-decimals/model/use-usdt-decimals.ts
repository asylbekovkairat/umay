import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";
import { useReadContract } from "wagmi";

export function useUsdtDecimals() {
  const { data: usdtDecimals } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "usdtDecimals",
  });

  return { usdtDecimals };
}
