/* External dependencies */
import { useConnectors } from "wagmi";

/* Local dependencies */
import { useIsMobile } from "@/src/shared/lib/is-mobile";

const mobileConnectorsIds = ["walletConnect"];
const desktopConnectorsIds = ["injected"];

export function useWalletConnectorsByDevice() {
  const connectors = useConnectors();
  const isMobileDevice = useIsMobile();

  return (
    connectors.find((connector) =>
      isMobileDevice
        ? mobileConnectorsIds.includes(connector.id)
        : desktopConnectorsIds.includes(connector.id)
    ) ?? connectors[0]
  );
}
