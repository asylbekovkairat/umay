import { http, HttpTransport } from "viem";
import { cookieStorage, createStorage } from "wagmi";
import { base, mainnet, polygon } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import { env } from "../../consts/env";

export const chains = [polygon, mainnet, base] as const;

export const transports: Record<number, HttpTransport> = {
  [polygon.id]: http(env.rpcUrl),
  [mainnet.id]: http(env.rpcUrl),
  [base.id]: http(env.rpcUrl),
};

export const storage = createStorage({
  storage: cookieStorage,
});

export const connectors = [
  injected(),
  walletConnect({
    projectId: env.projectId,
    metadata: {
      name: "Umay",
      description: "Buy and redeem pool tokens",
      url: "http://localhost:3000",
      icons: ["https://walletconnect.com/walletconnect-logo.png"],
    },
    showQrModal: true,
  }),
];
