import {
  PoolAddress,
  ShareTokenAddress,
  UsdtAddress,
} from "@/src/entities/investment-pool/addresses";
import {
  HardCap,
  RemainingCap,
  useHardCap,
} from "@/src/entities/investment-pool/cap";
import { PoolBalance } from "@/src/entities/investment-pool/pool-balance";
import { RedeemStatus } from "@/src/entities/investment-pool/redeem-status";
import { SaleStatus } from "@/src/entities/investment-pool/sale-status";
import {
  TotalRaised,
  useTotalRaised,
} from "@/src/entities/investment-pool/total-raised";
import { Card } from "@/src/shared/ui/card";
import { ProgressBar } from "@/src/shared/ui/progress-bar";

export function PoolOverview() {
  const { hardCapUSDTRaw } = useHardCap();
  const { totalRaisedUSDTRaw } = useTotalRaised();

  return (
    <Card title="Pool Overview">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SaleStatus />
        <RedeemStatus />
        <HardCap />
        <TotalRaised />
        <RemainingCap />
        <PoolBalance />
      </div>
      <ProgressBar
        value={totalRaisedUSDTRaw ?? BigInt(0)}
        max={hardCapUSDTRaw ?? BigInt(0)}
        aria-label="Fundraising progress"
      />
      <dl className="mt-6 grid grid-cols-1 gap-3 border-t border-gray-100 pt-4 sm:grid-cols-3">
        <PoolAddress />
        <UsdtAddress />
        <ShareTokenAddress />
      </dl>
    </Card>
  );
}
