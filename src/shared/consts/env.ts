const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL_POLYGON;
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const poolAddress = process.env.NEXT_PUBLIC_POOL_ADDRESS as `0x${string}`;

if (!poolAddress) throw new Error("Missing NEXT_PUBLIC_POOL_ADDRESS");
if (!rpcUrl) throw new Error("Missing NEXT_PUBLIC_RPC_URL_POLYGON");
if (!projectId) throw new Error("Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID");

export const env = {
  rpcUrl,
  projectId,
  poolAddress,
};
