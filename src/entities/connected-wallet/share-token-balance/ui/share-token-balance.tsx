import { useShareTokenBalance } from "../model";

export function ShareTokenBalance() {
  const { shareBalance } = useShareTokenBalance();

  return (
    <li className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-muted">Share Token Balance</span>
      <span className="text-lg font-semibold text-foreground">
        {shareBalance}
      </span>
    </li>
  );
}
