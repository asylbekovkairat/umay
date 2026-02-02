import { isMobile } from "@/src/shared/lib/is-mobile";
import { useConnectors } from "wagmi";

const mobileConnectorsIds = ["walletConnect"];
const desktopConnectorsIds = ["injected"];

export function useWalletConnectorsByDevice() {
  const connectors = useConnectors();
  const isMobileDevice = isMobile();

  return (
    connectors.find((connector) =>
      isMobileDevice
        ? mobileConnectorsIds.includes(connector.id)
        : desktopConnectorsIds.includes(connector.id)
    ) ?? connectors[0]
  );
}
