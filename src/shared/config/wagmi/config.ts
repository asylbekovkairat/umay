import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import { Config, createConfig } from "wagmi";
import { env } from "../../consts/env";
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
