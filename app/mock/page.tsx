import { Badge } from "@/src/shared/ui/badge";
import { Card } from "@/src/shared/ui/card";
import { StatItem } from "@/src/shared/ui/stat-item";
import { CopyButton, MockButton, MockInput, ProgressBar } from "./components";

// ─── Mock data (static, no logic) ───────────────────────────────────────────
const MOCK = {
  network: "Polygon",
  walletConnected: false,
  walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
  saleStatus: "active" as const,
  redeemStatus: "active" as const,
  hardCap: "100,000.00",
  totalRaised: "67,500.00",
  remainingToCap: "32,500.00",
  poolUsdtBalance: "67,500.00",
  progressValue: 67500,
  progressMax: 100000,
  poolAddress: "0xabcd...ef01",
  usdtAddress: "0x1234...5678",
  shareTokenAddress: "0x9876...5432",
  walletUsdtBalance: "1,250.00",
  walletShareBalance: "500.00",
  allowance: "0.00",
  spentUsdt: "0.00",
  buyPreviewTokens: "123.45",
  redeemPreviewUsdt: "50.00",
  explorerUrl: "https://polygonscan.com",
};

function ShortAddress({
  value,
  "aria-label": ariaLabel,
}: {
  value: string;
  "aria-label"?: string;
}) {
  return (
    <span
      className="font-mono text-sm text-gray-700"
      aria-label={ariaLabel}
      title={value}
    >
      {value}
    </span>
  );
}

export default function MockInvestmentPoolPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── Header ───────────────────────────────────────────────────────── */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <h1 className="text-xl font-semibold text-gray-900">
            InvestmentPool
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700">
              {MOCK.network}
            </span>
            {!MOCK.walletConnected ? (
              <MockButton variant="primary" className="min-w-[140px]">
                Connect Wallet
              </MockButton>
            ) : (
              <>
                <span
                  className="font-mono text-sm text-gray-600"
                  title={MOCK.walletAddress}
                >
                  0x1234…abcd
                </span>
                <MockButton variant="secondary">Disconnect</MockButton>
              </>
            )}
            {/* Error state (hidden, for layout reference): Wrong Network + Switch to Polygon */}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        {/* ─── Pool Overview ───────────────────────────────────────────────── */}
        <Card title="Pool Overview">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatItem
              label="Sale status"
              value={
                <Badge
                  variant={MOCK.saleStatus === "active" ? "active" : "inactive"}
                >
                  {MOCK.saleStatus === "active" ? "Active" : "Inactive"}
                </Badge>
              }
            />
            <StatItem
              label="Redeem status"
              value={
                <Badge
                  variant={
                    MOCK.redeemStatus === "active" ? "active" : "inactive"
                  }
                >
                  {MOCK.redeemStatus === "active" ? "Active" : "Inactive"}
                </Badge>
              }
            />
            <StatItem label="Hard Cap (USDT)" value={`${MOCK.hardCap} USDT`} />
            <StatItem
              label="Total Raised (USDT)"
              value={`${MOCK.totalRaised} USDT`}
            />
            <StatItem
              label="Remaining to Cap (USDT)"
              value={`${MOCK.remainingToCap} USDT`}
            />
            <StatItem
              label="Pool USDT Balance"
              value={`${MOCK.poolUsdtBalance} USDT`}
            />
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium text-gray-700">
                {Math.round((MOCK.progressValue / MOCK.progressMax) * 100)}%
              </span>
            </div>
            <ProgressBar
              value={MOCK.progressValue}
              max={MOCK.progressMax}
              aria-label="Fundraising progress"
            />
          </div>

          <dl className="mt-6 grid grid-cols-1 gap-3 border-t border-gray-100 pt-4 sm:grid-cols-3">
            <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-start">
              <dt className="text-sm text-gray-500">Pool address</dt>
              <dd className="flex items-center gap-1">
                <ShortAddress value={MOCK.poolAddress} />
                <CopyButton aria-label="Copy pool address" />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-start">
              <dt className="text-sm text-gray-500">USDT address</dt>
              <dd className="flex items-center gap-1">
                <ShortAddress value={MOCK.usdtAddress} />
                <CopyButton aria-label="Copy USDT address" />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-start">
              <dt className="text-sm text-gray-500">Share Token address</dt>
              <dd className="flex items-center gap-1">
                <ShortAddress value={MOCK.shareTokenAddress} />
                <CopyButton aria-label="Copy share token address" />
              </dd>
            </div>
          </dl>
        </Card>

        {/* ─── Your Wallet ─────────────────────────────────────────────────── */}
        <Card title="Your Wallet">
          <ul className="space-y-3" role="list">
            <li className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <span className="text-sm text-gray-500">USDT Balance</span>
              <span className="text-lg font-semibold text-gray-900">
                {MOCK.walletUsdtBalance} USDT
              </span>
            </li>
            <li className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <span className="text-sm text-gray-500">Share Token Balance</span>
              <span className="text-lg font-semibold text-gray-900">
                {MOCK.walletShareBalance}
              </span>
            </li>
            <li className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <div>
                <span className="text-sm text-gray-500">
                  Allowance (USDT → Pool)
                </span>
                <p className="mt-0.5 text-xs text-gray-500">
                  Allowance — сумма USDT, которую контракт может списать
                </p>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {MOCK.allowance} USDT
              </span>
            </li>
            <li className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm text-gray-500">Spent USDT</span>
              <span className="text-lg font-semibold text-gray-900">
                {MOCK.spentUsdt} USDT
              </span>
            </li>
          </ul>
        </Card>

        {/* ─── Buy Tokens ──────────────────────────────────────────────────── */}
        <Card title="Buy Pool Tokens">
          <div className="space-y-4">
            <MockInput
              id="buy-usdt-amount"
              label="USDT Amount"
              placeholder="0.00"
              helperText="Decimals are determined on-chain"
              readOnly={false}
            />
            {/* Static validation placeholder (red) — replace with real validation later */}
            <p className="text-sm text-red-600" role="alert">
              Amount must be greater than 0
            </p>
            <p className="text-sm text-gray-600">
              You will receive ≈ <strong>{MOCK.buyPreviewTokens}</strong> tokens
            </p>
            <MockButton variant="primary" fullWidth>
              Connect Wallet
            </MockButton>
            <p className="text-center text-xs text-gray-500">
              Approve is required before purchase
            </p>
          </div>
          {/* Visual states (commented in UI, for reference):
            - Approve USDT (primary button)
            - Buy Tokens (primary button)
            - Sale is inactive (disabled button)
            - Loading state: visualState="loading"
          */}
        </Card>

        {/* ─── Redeem Tokens ───────────────────────────────────────────────── */}
        <Card title="Redeem Tokens">
          <div className="space-y-4">
            <MockInput
              id="redeem-token-amount"
              label="Token Amount"
              placeholder="0.00"
              readOnly={false}
            />
            {/* Validation placeholder: "Redeem is not available for this amount" */}
            <p className="text-sm text-gray-600">
              You will receive ≈ <strong>{MOCK.redeemPreviewUsdt}</strong> USDT
            </p>
            <MockButton variant="primary" fullWidth>
              Redeem
            </MockButton>
          </div>
        </Card>
      </main>

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 px-4 sm:flex-row sm:justify-between sm:px-6">
          <p className="text-sm text-gray-500">Powered by Polygon</p>
          <a
            href={MOCK.explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-700 underline decoration-gray-400 underline-offset-2 hover:text-gray-900 hover:decoration-gray-600"
          >
            View Pool on Explorer
          </a>
        </div>
      </footer>
    </div>
  );
}
