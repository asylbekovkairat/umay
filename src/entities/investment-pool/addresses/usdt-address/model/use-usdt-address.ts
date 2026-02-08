/* External dependencies */
import { useReadContract } from "wagmi";

/* Local dependencies */
import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";

export function useUsdtAddress() {
  const { data: usdtAddress } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "usdt",
  });

  return { usdtAddress: usdtAddress ?? "N/A" };
}
