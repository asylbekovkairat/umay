/* External dependencies */
import { useReadContract } from "wagmi";

/* Local dependencies */
import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";

export function useRedeemStatus() {
  const { data: redeemActive } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "redeemActive",
  });

  return { redeemActive };
}
