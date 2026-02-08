"use client";

import { useWalletBalance } from "@/src/entities/connected-wallet/balance/model";
import { MaxBuy } from "@/src/entities/connected-wallet/max-buy";
import { ShareTokenBalance } from "@/src/entities/connected-wallet/share-token-balance";
import { WalletAddress } from "@/src/entities/connected-wallet/wallet-address";
import { WalletConnectionHandler } from "@/src/features/wallet-connection-handler";
import { Card } from "@/src/shared/ui/card";
import { usePathname } from "next/navigation";
import { useConnection } from "wagmi";

export function WalletCard() {
  const { usdtBalance } = useWalletBalance();
  const { address, isConnected } = useConnection();
  const pathname = usePathname();
  const isBuyTokensPage = pathname === "/buy-tokens";

  return (
    <Card
      title="Wallet · Total balance"
      titleClassName="text-sm text-muted shrink-0 font-normal!"
    >
      <div className="flex flex-col gap-5">
        {isConnected && address ? (
          <>
            <span className="text-4xl font-bold">{usdtBalance} USDT</span>
            <ShareTokenBalance />
            <MaxBuy />
            <WalletAddress />
            {!isBuyTokensPage && <WalletConnectionHandler />}
          </>
        ) : (
          <div className="flex justify-between items-center">
            <WalletConnectionHandler />
          </div>
        )}
      </div>
    </Card>
  );
}
