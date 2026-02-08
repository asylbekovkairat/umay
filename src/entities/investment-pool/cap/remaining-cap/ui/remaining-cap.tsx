/* Local dependencies */
import { StatItem } from "@/src/shared/ui/stat-item";
import { useRemainingCap } from "../model";

export function RemainingCap() {
  const { remainingToCap } = useRemainingCap();

  return (
    <StatItem
      label="Remaining to Cap (USDT)"
      value={<span>{remainingToCap} USDT</span>}
    />
  );
}
