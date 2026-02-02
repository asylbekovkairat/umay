"use client";

import { Header } from "@/src/widgets/header";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

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
