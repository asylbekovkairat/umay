import { useMaxBuy } from "../model";

export function MaxBuy() {
  const { maxBuy } = useMaxBuy();

  return (
    <li className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-gray-500">Max Buy</span>
      <span className="text-lg font-semibold text-gray-900">{maxBuy} USDT</span>
    </li>
  );
}
