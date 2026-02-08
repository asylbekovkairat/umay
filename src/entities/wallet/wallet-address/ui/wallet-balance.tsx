import { Copyable } from "@/src/shared/ui/copyable";
import { useConnection } from "wagmi";

export function WalletAddress() {
  const { address } = useConnection();

  return (
    <li className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-muted">Wallet Address</span>
      <span className="text-lg font-semibold text-foreground">
        <Copyable className="border-none px-0!" value={address ?? "N/A"} />
      </span>
    </li>
  );
}
