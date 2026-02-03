import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";
import { useReadContract } from "wagmi";

export function useRedeemStatus() {
  const { data: redeemActive } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "redeemActive",
  });

  return { redeemActive };
}
