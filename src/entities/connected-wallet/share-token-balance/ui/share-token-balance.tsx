import { useShareTokenBalance } from "../model";

export function ShareTokenBalance() {
  const { shareBalance } = useShareTokenBalance();

  return (
    <li className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-gray-500">Share Token Balance</span>
      <span className="text-lg font-semibold text-gray-900">
        {shareBalance}
      </span>
    </li>
  );
}
