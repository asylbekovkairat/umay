import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";
import { formatUnits } from "viem";
import { useReadContract } from "wagmi";

export function useHardCap() {
  const { data: hardCapUSDT } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "hardCapUSDT",
  });

  const { data: usdtDecimals } = useReadContract({
    address: env.poolAddress,
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
