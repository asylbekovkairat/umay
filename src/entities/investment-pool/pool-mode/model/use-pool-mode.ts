import { useRedeemStatus } from "../../redeem-status/model";
import { useSaleStatus } from "../../sale-status/model";

export function usePoolMode() {
  const { saleActive } = useSaleStatus();
  const { redeemActive } = useRedeemStatus();

  let mode: "SALE" | "REDEEM" | "INACTIVE" | "UNKNOWN" = "UNKNOWN";

  if (saleActive === true) mode = "SALE";
  else if (redeemActive === true) mode = "REDEEM";
  else if (saleActive === false && redeemActive === false) mode = "INACTIVE";

  return { mode };
}
