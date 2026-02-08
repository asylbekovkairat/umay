"use client";

import { useWalletBalance } from "@/src/entities/wallet/balance/model";
import { MaxBuy } from "@/src/entities/wallet/max-buy";
import { ShareTokenBalance } from "@/src/entities/wallet/share-token-balance";
import { WalletAddress } from "@/src/entities/wallet/wallet-address";
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
