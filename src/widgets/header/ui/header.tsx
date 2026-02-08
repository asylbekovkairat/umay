import { WalletConnectionHandler } from "@/src/features/wallet-connection-handler";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-glass">
      <div className="mx-auto flex w-full max-w-dashboard flex-wrap items-center justify-between gap-3 px-4 py-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-semibold">
              <Link href="/">Umay</Link>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
