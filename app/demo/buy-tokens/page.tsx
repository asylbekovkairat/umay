"use client";

import { BuyTokensForm } from "@/src/features/buy-tokens";

export default function BuyTokensDemoPage() {
  return (
    <div className="min-h-screen text-foreground px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Buy Tokens — Live Demo
          </h1>
          <p className="mt-1 text-sm text-muted">
            Autonomous form: connect → switch network → input → approve → buy
          </p>
        </div>

        <BuyTokensForm />
      </div>
    </div>
  );
}
