import { http, HttpTransport } from "viem";
import { cookieStorage, createStorage } from "wagmi";
import { base, mainnet, polygon } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL_POLYGON;
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!rpcUrl) throw new Error("Missing NEXT_PUBLIC_RPC_URL_POLYGON");
if (!projectId) throw new Error("Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID");

export const chains = [polygon, mainnet, base] as const;

export const transports: Record<number, HttpTransport> = {
  [polygon.id]: http(rpcUrl),
  [mainnet.id]: http(rpcUrl),
  [base.id]: http(rpcUrl),
};

export const storage = createStorage({
  storage: cookieStorage,
});

export const connectors = [
  injected(),
  walletConnect({
    projectId,
    metadata: {
      name: "Umay",
      description: "Buy and redeem pool tokens",
      url: "http://localhost:3000",
      icons: ["https://walletconnect.com/walletconnect-logo.png"],
    },
    showQrModal: true,
  }),
];
