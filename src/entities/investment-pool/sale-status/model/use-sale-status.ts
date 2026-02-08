/* External dependencies */
import { useReadContract } from "wagmi";

/* Local dependencies */
import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";

export function useSaleStatus() {
  const { data: saleActive } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "saleActive",
  });

  return { saleActive };
}
