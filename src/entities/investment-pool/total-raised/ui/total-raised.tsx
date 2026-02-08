/* Local dependencies */
import { StatItem } from "@/src/shared/ui/stat-item";
import { useTotalRaised } from "../model";

export function TotalRaised() {
  const { totalRaisedUSDT } = useTotalRaised();

  return (
    <StatItem
      label="Total Raised (USDT)"
      value={<span>{totalRaisedUSDT} USDT</span>}
    />
  );
}
