"use client";

import { Header } from "@/src/widgets/header";
import { WalletCard } from "@/src/widgets/wallet/wallet-card";

export function BuyTokensPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />

      <main className="mx-auto max-w-dashboard space-y-6 px-4 py-8 sm:px-6">
        <WalletCard />
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex w-full max-w-dashboard flex-wrap items-center justify-between gap-2 px-4 py-4 text-sm">
          <span className="text-muted">Powered by Polygon</span>
          <a className="text-foreground hover:opacity-70" href="#">
            View Pool on Explorer
          </a>
        </div>
      </footer>
    </div>
  );
}
