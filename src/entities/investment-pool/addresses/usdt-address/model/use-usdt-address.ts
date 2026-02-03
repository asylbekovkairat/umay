import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";
import { useReadContract } from "wagmi";

export function useUsdtAddress() {
  const { data: usdtAddress } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "usdt",
  });

  return { usdtAddress: usdtAddress ?? "N/A" };
}
