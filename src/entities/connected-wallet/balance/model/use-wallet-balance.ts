import { erc20Abi } from "@/src/shared/abi/erc20";
import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";
import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";

export function useWalletBalance() {
  const { address } = useAccount();

  const { data: usdtDecimals } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "usdtDecimals",
  });

  const { data: usdtAddress } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "usdt",
  });

  const { data: usdtBalanceRaw } = useReadContract({
    address: usdtAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address as `0x${string}`] : undefined,
  });

  console.log("usdtBalanceRaw", usdtBalanceRaw);

  return {
    usdtBalanceRaw,
    usdtBalance:
      usdtBalanceRaw && usdtDecimals
        ? formatUnits(usdtBalanceRaw, usdtDecimals!)
        : 0,
  };
}
