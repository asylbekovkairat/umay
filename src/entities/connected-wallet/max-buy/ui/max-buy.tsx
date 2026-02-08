import { useMaxBuy } from "../model";

export function MaxBuy() {
  const { maxBuy } = useMaxBuy();

  return (
    <li className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-muted">Max Buy</span>
      <span className="text-lg text-muted font-semibold">{maxBuy} USDT</span>
    </li>
  );
}
