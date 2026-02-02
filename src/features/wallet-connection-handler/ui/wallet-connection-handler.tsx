import { Button } from "@/src/shared/ui/button";
import { Copyable } from "@/src/shared/ui/copyable/copyable";
import { useConnect, useConnection, useDisconnect } from "wagmi";
import { useWalletConnectorsByDevice } from "../lib/use-wallet-connectors-by-device";

export function WalletConnectionHandler() {
  const { address, isConnected } = useConnection();
  const { mutateAsync: connect } = useConnect();
  const { mutateAsync: disconnect } = useDisconnect();
  const connector = useWalletConnectorsByDevice();

  const onConnectionChange = async () => {
    if (isConnected) {
      disconnect();
    } else {
      connect({ connector });
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isConnected && address && <Copyable value={address} />}
      <Button variant="primary" onClick={onConnectionChange}>
        {isConnected ? "Disconnect Wallet" : "Connect Wallet"}
      </Button>
    </div>
  );
}
