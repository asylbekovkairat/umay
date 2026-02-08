/* Local dependencies */
import { StatItem } from "@/src/shared/ui/stat-item";
import { useHardCap } from "../model";

export function HardCap() {
  const { hardCapUSDT } = useHardCap();

  return (
    <StatItem label="Hard Cap (USDT)" value={<span>{hardCapUSDT} USDT</span>} />
  );
}
