/* External dependencies */
import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";

/* Local dependencies */
import { useUsdtDecimals } from "@/src/entities/shared/usdt-decimals";
import { erc20Abi } from "@/src/shared/abi/erc20";
import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";

export function useWalletBalance() {
  const { address } = useAccount();

  const { usdtDecimals } = useUsdtDecimals();

  const { data: usdtAddress } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "usdt",
  });

  const { data: usdtBalanceRaw, refetch: refetchBalance } = useReadContract({
    address: usdtAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address as `0x${string}`] : undefined,
  });

  return {
    usdtBalanceRaw,
    usdtBalance:
      usdtBalanceRaw && usdtDecimals
        ? formatUnits(usdtBalanceRaw, usdtDecimals!)
        : 0,
    refetchBalance,
  };
}
