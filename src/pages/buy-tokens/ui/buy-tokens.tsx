"use client";

/* Local dependencies */
import { BuyTokensForm } from "@/src/features/buy-tokens";
import { WalletCard } from "@/src/widgets/wallet/wallet-card";

export function BuyTokensPage() {
  return (
    <>
      <WalletCard />
      <BuyTokensForm />
    </>
  );
}
