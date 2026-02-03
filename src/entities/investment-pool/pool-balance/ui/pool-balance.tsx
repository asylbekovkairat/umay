import { StatItem } from "@/src/shared/ui/stat-item";
import { usePoolBalance } from "../model/use-pool-balance";

export function PoolBalance() {
  const { poolUSDTBalance } = usePoolBalance();

  return (
    <StatItem
      label="Pool USDT Balance (USDT)"
      value={<span>{poolUSDTBalance} USDT</span>}
    />
  );
}
