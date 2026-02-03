import { StatItem } from "@/src/shared/ui/stat-item";
import { useTotalRaised } from "../model/use-total-raised";

export function TotalRaised() {
  const { totalRaised } = useTotalRaised();

  return (
    <StatItem
      label="Total Raised (USDT)"
      value={<span>{totalRaised} USDT</span>}
    />
  );
}
