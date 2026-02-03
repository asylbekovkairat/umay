"use client";

import { ConnectedWallet } from "@/src/widgets/connected-wallet";
import { Header } from "@/src/widgets/header";
import { PoolOverview } from "@/src/widgets/pool-overview";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <PoolOverview />
        <ConnectedWallet />
      </main>

      <footer className="border-t border-border bg-card-bg">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-sm">
          <span className="text-muted">Powered by Polygon</span>
          <a className="text-foreground hover:opacity-70" href="#">
            View Pool on Explorer
          </a>
        </div>
      </footer>
    </div>
  );
}
