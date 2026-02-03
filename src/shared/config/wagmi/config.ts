import { Config, createConfig } from "wagmi";
import { chains, connectors, storage, transports } from "./consts";

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

export const wagmiConfig: Config = createConfig({
  ssr: true,
  chains,
  transports,
  connectors,
  storage,
});
