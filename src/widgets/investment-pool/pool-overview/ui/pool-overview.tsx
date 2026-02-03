import { HardCap, RemainingCap } from "@/src/entities/investment-pool/cap";
import { RedeemStatus } from "@/src/entities/investment-pool/redeem-status";
import { SaleStatus } from "@/src/entities/investment-pool/sale-status";
import { TotalRaised } from "@/src/entities/investment-pool/total-raised";
import { Card } from "@/src/shared/ui/card";

export function PoolOverview() {
  return (
    <Card title="Pool Overview">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SaleStatus />
        <RedeemStatus />
        <HardCap />
        <TotalRaised />
        <RemainingCap />
      </div>
    </Card>
  );
}
