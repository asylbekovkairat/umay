import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { useReadContract } from "wagmi";

const POOL_ADDRESS = process.env.NEXT_PUBLIC_POOL_ADDRESS as `0x${string}`;
if (!POOL_ADDRESS) throw new Error("Missing NEXT_PUBLIC_POOL_ADDRESS");

export function useRedeemStatus() {
  const { data: redeemActive } = useReadContract({
    address: POOL_ADDRESS,
    abi: investmentPoolAbi,
    functionName: "redeemActive",
  });

  return { redeemActive };
}
