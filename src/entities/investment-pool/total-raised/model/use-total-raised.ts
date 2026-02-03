import { useUsdtDecimals } from "@/src/entities/shared/usdt-decimals";
import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { formatUnits } from "viem";
import { useReadContract } from "wagmi";

const POOL_ADDRESS = process.env.NEXT_PUBLIC_POOL_ADDRESS as `0x${string}`;
if (!POOL_ADDRESS) throw new Error("Missing NEXT_PUBLIC_POOL_ADDRESS");

export function useTotalRaised() {
  const { usdtDecimals } = useUsdtDecimals();

  const { data: totalRaisedUSDT } = useReadContract({
    address: POOL_ADDRESS,
    abi: investmentPoolAbi,
    functionName: "totalRaisedUSDT",
  });

  const totalRaisedUSDTFormatted =
    totalRaisedUSDT && usdtDecimals
      ? formatUnits(totalRaisedUSDT, usdtDecimals)
      : null;

  return {
    totalRaisedUSDT: totalRaisedUSDTFormatted,
    totalRaisedUSDTRaw: totalRaisedUSDT,
  };
}
