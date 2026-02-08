"use client";

import { ConnectedWallet } from "@/src/widgets/connected-wallet";
import { Header } from "@/src/widgets/header";
import { PoolOverview } from "@/src/widgets/pool-overview";
import { PoolCard } from "@/src/widgets/pool/pool-card";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-dashboard space-y-6 px-4 py-8 sm:px-6">
        <PoolCard />
        <PoolOverview />
        <ConnectedWallet />
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
