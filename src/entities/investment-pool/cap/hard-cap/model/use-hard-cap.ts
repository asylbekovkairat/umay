import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { useReadContract } from "wagmi";

const POOL_ADDRESS = process.env.NEXT_PUBLIC_POOL_ADDRESS as `0x${string}`;
if (!POOL_ADDRESS) throw new Error("Missing NEXT_PUBLIC_POOL_ADDRESS");

export function useHardCap() {
  const { data: hardCapUSDT } = useReadContract({
    address: POOL_ADDRESS,
    abi: investmentPoolAbi,
    functionName: "hardCapUSDT",
  });

  const { data: usdtDecimals } = useReadContract({
    address: POOL_ADDRESS,
    abi: investmentPoolAbi,
    functionName: "usdtDecimals",
  });

  return { hardCapUSDT, usdtDecimals };
}
