import { useWalletBalance } from "../model";

export function WalletBalance() {
  const { usdtBalance } = useWalletBalance();

  return (
    <li className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-muted">USDT Balance</span>
      <span className="text-lg font-semibold text-foreground">
        {usdtBalance} USDT
      </span>
    </li>
  );
}
