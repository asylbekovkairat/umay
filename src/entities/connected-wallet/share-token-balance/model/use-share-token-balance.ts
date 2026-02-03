import { useShareTokenAddress } from "@/src/entities/investment-pool/addresses";
import { erc20Abi } from "@/src/shared/abi/erc20";
import { investmentPoolAbi } from "@/src/shared/abi/investment-pool";
import { env } from "@/src/shared/consts/env";
import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";

export function useShareTokenBalance() {
  const { address } = useAccount();
  const { shareTokenAddress } = useShareTokenAddress();

  const { data: shareTokenDecimals } = useReadContract({
    address: env.poolAddress,
    abi: investmentPoolAbi,
    functionName: "shareTokenDecimals",
  });

  const { data: shareBalanceRaw } = useReadContract({
    address: shareTokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  const shareBalance =
    shareBalanceRaw !== undefined && shareTokenDecimals !== undefined
      ? formatUnits(shareBalanceRaw, shareTokenDecimals)
      : null;

  return {
    shareBalanceRaw: shareBalanceRaw ?? 0,
    shareBalance: shareBalance ?? 0,
  };
}
