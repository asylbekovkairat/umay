import { WalletBalance } from "@/src/entities/connected-wallet/balance";
import { MaxBuy } from "@/src/entities/connected-wallet/max-buy";
import { ShareTokenBalance } from "@/src/entities/connected-wallet/share-token-balance";
import { Card } from "@/src/shared/ui/card";

export function ConnectedWallet() {
  return (
    <Card title="Your wallet">
      <ul className="space-y-3" role="list">
        <WalletBalance />
        <ShareTokenBalance />
        <MaxBuy />
      </ul>
    </Card>
  );
}
