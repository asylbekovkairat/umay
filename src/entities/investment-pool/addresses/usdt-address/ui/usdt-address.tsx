import { Copyable } from "@/src/shared/ui/copyable";
import { useUsdtAddress } from "../model";

export function UsdtAddress() {
  const { usdtAddress } = useUsdtAddress();

  return (
    <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-start">
      <dt className="text-sm text-gray-500">USDT address</dt>
      <dd className="flex items-center gap-1">
        <Copyable className="border-none px-0!" value={usdtAddress} />
      </dd>
    </div>
  );
}
