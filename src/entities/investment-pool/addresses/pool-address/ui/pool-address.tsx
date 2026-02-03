import { env } from "@/src/shared/consts/env";
import { Copyable } from "@/src/shared/ui/copyable";

export function PoolAddress() {
  return (
    <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-start">
      <dt className="text-sm text-gray-500">Pool address</dt>
      <dd className="flex items-center gap-1">
        <Copyable className="border-none px-0!" value={env.poolAddress} />
      </dd>
    </div>
  );
}
