import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { formatUnits } from "viem";
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

  const hardCapUSDTFormatted =
    hardCapUSDT && usdtDecimals ? formatUnits(hardCapUSDT, usdtDecimals) : null;

  return {
    hardCapUSDT: hardCapUSDTFormatted,
    hardCapUSDTRaw: hardCapUSDT,
  };
}
