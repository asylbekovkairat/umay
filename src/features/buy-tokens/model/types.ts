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
  mode: BuyFlowMode;
  isLoading: boolean;
  usdtBalance: string;
  maxBuy: string;
  maxBuyNum: number;
  previewTokens: string;
  saleActive: boolean | undefined;
  usdtDecimals: number | undefined;
  shareTokenDecimals: number | undefined;
  txHash: `0x${string}` | undefined;
  errorMessage: string | undefined;
  validationError: string | null;
  connectWallet: () => void;
  switchNetwork: () => void;
  approve: () => void;
  buy: () => void;
  reset: () => void;
  connectors: readonly any[];
  connectWith: (connector: any) => void;
}
