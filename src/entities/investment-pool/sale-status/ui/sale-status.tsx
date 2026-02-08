/* Local dependencies */
import { Badge } from "@/src/shared/ui/badge";
import { StatItem } from "@/src/shared/ui/stat-item";
import { useSaleStatus } from "../model";

export function SaleStatus() {
  const { saleActive } = useSaleStatus();

  return (
    <StatItem
      label="Sale Status"
      value={
        <Badge variant={saleActive ? "active" : "inactive"}>
          {saleActive ? "Active" : "Inactive"}
        </Badge>
      }
    />
  );
}
