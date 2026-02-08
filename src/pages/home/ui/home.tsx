"use client";

/* Local dependencies */
import { PoolCard } from "@/src/widgets/pool/pool-card";
import { PoolOverview } from "@/src/widgets/pool/pool-overview";
import { WalletCard } from "@/src/widgets/wallet/wallet-card";

export function HomePage() {
  return (
    <>
      <PoolCard />
      <PoolOverview />
      <WalletCard />
    </>
  );
}
