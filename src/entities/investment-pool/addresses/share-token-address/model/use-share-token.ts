import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";
import { useReadContract } from "wagmi";

export function useShareTokenAddress() {
  const { data: shareTokenAddress } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "shareToken",
  });

  return { shareTokenAddress };
}
