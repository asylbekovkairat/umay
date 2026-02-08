/* Local dependencies */
import { useShareTokenBalance } from "../model";

export function ShareTokenBalance() {
  const { shareBalance } = useShareTokenBalance();

  return (
    <li className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-muted">Share Token Balance</span>
      <span className="text-lg text-muted font-semibold">
        {shareBalance} USDT
      </span>
    </li>
  );
}
