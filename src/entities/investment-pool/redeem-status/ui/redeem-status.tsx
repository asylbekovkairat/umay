import { Badge } from "@/src/shared/ui/badge";
import { StatItem } from "@/src/shared/ui/stat-item";
import { useRedeemStatus } from "../model/use-redeem-status";

export function RedeemStatus() {
  const { redeemActive } = useRedeemStatus();

  return (
    <StatItem
      label="Redeem Status"
      value={
        <Badge variant={redeemActive ? "active" : "inactive"}>
          {redeemActive ? "Active" : "Inactive"}
        </Badge>
      }
    />
  );
}
