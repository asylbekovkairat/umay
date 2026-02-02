import { WalletConnectionHandler } from "@/src/features/wallet-connection-handler";

export function Header() {
  return (
    <header className="border-b border-border bg-card-bg/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-semibold">Umay</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            <WalletConnectionHandler />
          </div>
        </div>
      </div>
    </header>
  );
}
