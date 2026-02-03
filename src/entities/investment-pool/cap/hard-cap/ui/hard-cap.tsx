import { StatItem } from "@/src/shared/ui/stat-item";
import { formatUnits } from "viem";
import { useHardCap } from "../model/use-hard-cap";

export function HardCap() {
  const { hardCapUSDT, usdtDecimals } = useHardCap();

  return (
    <StatItem
      label="Hard Cap (USDT)"
      value={
        <span>
          {hardCapUSDT ? formatUnits(hardCapUSDT, usdtDecimals ?? 6) : "N/A"}{" "}
          USDT
        </span>
      }
    />
  );
}
