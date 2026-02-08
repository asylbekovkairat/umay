import { usePoolBalance } from "@/src/entities/investment-pool/pool-balance";
import { Button } from "@/src/shared/ui/button";
import { Card } from "@/src/shared/ui/card";

export function PoolCard() {
  const { poolUSDTBalance } = usePoolBalance();
  return (
    <Card
      title="Total balance"
      titleClassName="text-sm text-muted shrink-0 font-normal!"
    >
      <div className="flex flex-col gap-5">
        <span className="text-2xl font-bold">{poolUSDTBalance} USDT</span>
        <div className="flex gap-4 items-center">
          <Button>Buy</Button>
          <Button>Redeem</Button>
        </div>
      </div>
    </Card>
  );
}
