import { Copyable } from "@/src/shared/ui/copyable";
import { useShareTokenAddress } from "../model";

export function ShareTokenAddress() {
  const { shareTokenAddress } = useShareTokenAddress();

  return (
    <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-start">
      <dt className="text-sm text-gray-500">Share Token address</dt>
      <dd className="flex items-center gap-1">
        <Copyable
          className="border-none px-0!"
          value={shareTokenAddress ?? "N/A"}
        />
      </dd>
    </div>
  );
}
