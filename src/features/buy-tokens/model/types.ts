export type BuyFlowMode =
  | "CONNECT"
  | "WRONG_NETWORK"
  | "SALE_INACTIVE"
  | "INVALID_AMOUNT"
  | "APPROVE"
  | "BUY"
  | "PENDING"
  | "SUCCESS"
  | "ERROR";

export interface UseBuyFlowReturn {
  connectors: readonly any[];
  errorMessage: string | null;
  isLoading: boolean;
  maxBuy: string;
  maxBuyNum: number;
  mode: BuyFlowMode;
  previewTokens: string;
  saleActive: boolean | undefined;
  shareTokenDecimals: number | bigint | undefined;
  txHash: `0x${string}` | undefined;
  usdtBalance: string;
  usdtDecimals: number | undefined;
  validationError: string | null;
  approve: () => void;
  buy: () => void;
  connectWallet: () => void;
  connectWith: (connector: any) => void;
  reset: () => void;
  switchNetwork: () => void;
}
