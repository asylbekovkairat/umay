import { Badge } from "@/src/shared/ui/badge";
import { StatItem } from "@/src/shared/ui/stat-item";
import { usePoolMode } from "../model";

export function PoolMode() {
  const { mode } = usePoolMode();

  const modeText =
    mode === "SALE"
      ? "Current mode: Token Sale"
      : mode === "REDEEM"
      ? "Current mode: Token Redemption"
      : mode === "INACTIVE"
      ? "Current mode: Not Active"
      : "Loading current mode...";

  return <span>{modeText}</span>;
}
