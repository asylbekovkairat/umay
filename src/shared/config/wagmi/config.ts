import { Config, createConfig } from "wagmi";
import { chains, connectors, storage, transports } from "./consts";

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL_POLYGON;
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!rpcUrl) throw new Error("Missing NEXT_PUBLIC_RPC_URL_POLYGON");
if (!projectId) throw new Error("Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID");

export const wagmiConfig: Config = createConfig({
  ssr: true,
  chains,
  transports,
  connectors,
  storage,
});
