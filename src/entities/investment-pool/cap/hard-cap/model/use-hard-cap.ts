import { useUsdtDecimals } from "@/src/entities/shared/usdt-decimals";
import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";
import { formatUnits } from "viem";
import { useReadContract } from "wagmi";

export function useHardCap() {
  const { usdtDecimals } = useUsdtDecimals();

  const { data: hardCapUSDT } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "hardCapUSDT",
  });

  const hardCapUSDTFormatted =
    hardCapUSDT && usdtDecimals ? formatUnits(hardCapUSDT, usdtDecimals) : null;

  return {
    hardCapUSDT: hardCapUSDTFormatted,
    hardCapUSDTRaw: hardCapUSDT,
  };
}
