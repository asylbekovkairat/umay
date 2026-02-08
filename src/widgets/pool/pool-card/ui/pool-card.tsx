import { usePoolBalance } from "@/src/entities/investment-pool/pool-balance";
import { useRedeemStatus } from "@/src/entities/investment-pool/redeem-status";
import { useSaleStatus } from "@/src/entities/investment-pool/sale-status";
import { CircleArrowLeft, HandCoins } from "@/src/shared/assets/icons";
import { Button } from "@/src/shared/ui/button";
import { Card } from "@/src/shared/ui/card";
import { useRouter } from "next/navigation";

export function PoolCard() {
  const { poolUSDTBalance } = usePoolBalance();
  const { saleActive } = useSaleStatus();
  const { redeemActive } = useRedeemStatus();
  const router = useRouter();

  return (
    <Card
      title="Pool · Total balance"
      titleClassName="text-sm text-muted shrink-0 font-normal!"
    >
      <div className="flex flex-col gap-5">
        <span className="text-4xl font-bold">{poolUSDTBalance} USDT</span>
        <div className="flex gap-4 items-center">
          <Button
            onClick={() => router.push("/buy-tokens")}
            disabled={!saleActive}
          >
            Buy <HandCoins />
          </Button>
          <Button disabled={!redeemActive}>
            Redeem <CircleArrowLeft />
          </Button>
        </div>
      </div>
    </Card>
  );
}
