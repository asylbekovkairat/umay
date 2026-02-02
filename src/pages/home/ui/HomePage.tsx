import type { ReactNode } from "react";

const PROGRESS_PERCENT = 68;

type Stat = {
  label: string;
  value: string;
};

const poolStats: Stat[] = [
  { label: "Hard Cap (USDT)", value: "5,000,000" },
  { label: "Total Raised (USDT)", value: "3,400,000" },
  { label: "Remaining to Cap (USDT)", value: "1,600,000" },
  { label: "Pool USDT Balance", value: "3,392,450" },
];

const walletStats: Stat[] = [
  { label: "USDT Balance", value: "2,450.00" },
  { label: "Share Token Balance", value: "1,250.00" },
  { label: "Allowance (USDT → Pool)", value: "1,000.00" },
  { label: "Spent USDT", value: "550.00" },
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gray-900 text-white grid place-items-center text-sm font-semibold">
              IP
            </div>
            <div>
              <p className="text-sm text-gray-500">Project</p>
              <h1 className="text-lg font-semibold">InvestmentPool</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="info">Polygon</Badge>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Connect Wallet</Button>
              <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm">
                <span className="font-mono text-gray-700">0x1234…abcd</span>
                <Button variant="secondary" size="sm">
                  Disconnect
                </Button>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm">
                <Badge variant="danger">Wrong Network</Badge>
                <Button variant="secondary" size="sm">
                  Switch to Polygon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8">
        <section aria-labelledby="pool-overview">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 id="pool-overview" className="text-lg font-semibold">
                  Pool Overview
                </h2>
                <p className="text-sm text-gray-500">
                  Key metrics for the active sale round
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">Sale Active</Badge>
                <Badge variant="neutral">Redeem Inactive</Badge>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {poolStats.map((stat) => (
                <StatItem key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </div>

            <div className="mt-6 rounded-xl border bg-gray-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-semibold">{PROGRESS_PERCENT}%</span>
              </div>
              <ProgressBar value={PROGRESS_PERCENT} />
            </div>

            <div className="mt-6 grid gap-3 text-sm md:grid-cols-3">
              <AddressRow label="Pool address" value="0x98ab...c0de" />
              <AddressRow label="USDT address" value="0x2f1a...b9c3" />
              <AddressRow label="Share Token address" value="0x7b2e...9a1f" />
            </div>
          </Card>
        </section>

        <section aria-labelledby="wallet-overview">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h2 id="wallet-overview" className="text-lg font-semibold">
                  Your Wallet
                </h2>
                <p className="text-sm text-gray-500">Balances and approvals</p>
              </div>
              <Badge variant="info">Wallet Connected</Badge>
            </div>

            <dl className="mt-5 space-y-3">
              {walletStats.map((stat) => (
                <div key={stat.label} className="flex flex-wrap items-center justify-between gap-2">
                  <dt className="text-sm text-gray-500">{stat.label}</dt>
                  <dd className="text-base font-semibold">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-gray-500">
              Allowance — сумма USDT, которую контракт может списать
            </p>
          </Card>
        </section>

        <section aria-labelledby="buy-tokens">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h2 id="buy-tokens" className="text-lg font-semibold">
                  Buy Pool Tokens
                </h2>
                <p className="text-sm text-gray-500">Swap USDT for pool tokens</p>
              </div>
              <Badge variant="success">Sale Active</Badge>
            </div>

            <div className="mt-5 space-y-4">
              <InputField
                id="usdt-amount"
                label="USDT Amount"
                placeholder="0.00"
                helper="Decimals are determined on-chain"
                error="Insufficient balance for this amount"
              />

              <div className="flex items-center justify-between rounded-lg border bg-gray-50 px-4 py-3 text-sm">
                <span className="text-gray-500">Preview</span>
                <span className="font-semibold">
                  You will receive ≈ 123.45 tokens
                </span>
              </div>

              <div className="space-y-2">
                <Button fullWidth variant="primary">
                  Connect Wallet
                </Button>
                <div className="grid gap-2 md:grid-cols-3">
                  <Button fullWidth variant="secondary">
                    Approve USDT
                  </Button>
                  <Button fullWidth variant="primary">
                    Buy Tokens
                  </Button>
                  <Button fullWidth variant="disabled" disabled>
                    Sale is inactive
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Approve is required before purchase
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section aria-labelledby="redeem-tokens">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h2 id="redeem-tokens" className="text-lg font-semibold">
                  Redeem Tokens
                </h2>
                <p className="text-sm text-gray-500">Swap tokens back to USDT</p>
              </div>
              <Badge variant="neutral">Redeem Inactive</Badge>
            </div>

            <div className="mt-5 space-y-4">
              <InputField
                id="token-amount"
                label="Token Amount"
                placeholder="0.00"
                helper="Redeem window opens after sale ends"
                error="Redeem is not available for this amount"
              />

              <div className="flex items-center justify-between rounded-lg border bg-gray-50 px-4 py-3 text-sm">
                <span className="text-gray-500">Preview</span>
                <span className="font-semibold">
                  You will receive ≈ 50.00 USDT
                </span>
              </div>

              <div className="space-y-2">
                <Button fullWidth variant="disabled" disabled>
                  Redeem inactive
                </Button>
                <Button fullWidth variant="secondary">
                  Redeem
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-sm">
          <span className="text-gray-500">Powered by Polygon</span>
          <a className="text-gray-900 hover:text-gray-700" href="#">
            View Pool on Explorer
          </a>
        </div>
      </footer>
    </div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <article className="rounded-xl border bg-white p-6 shadow-sm">{children}</article>
  );
}

function Badge({
  children,
  variant = "neutral",
}: {
  children: ReactNode;
  variant?: "success" | "neutral" | "danger" | "info";
}) {
  const styles = {
    success: "bg-green-100 text-green-700 border-green-200",
    neutral: "bg-gray-100 text-gray-600 border-gray-200",
    danger: "bg-red-100 text-red-700 border-red-200",
    info: "bg-blue-100 text-blue-700 border-blue-200",
  }[variant];

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles}`}>
      {children}
    </span>
  );
}

function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "disabled";
  size?: "sm" | "md";
  fullWidth?: boolean;
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl border px-4 font-medium transition hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2";
  const sizes = {
    sm: "py-1.5 text-xs",
    md: "py-2.5 text-sm",
  }[size];
  const variants = {
    primary: "border-gray-900 bg-gray-900 text-white hover:bg-gray-800",
    secondary: "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
    disabled: "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400",
  }[variant];
  const width = fullWidth ? "w-full" : "";

  return (
    <button className={`${base} ${sizes} ${variants} ${width}`} disabled={disabled}>
      {children}
    </button>
  );
}

function StatItem({ label, value }: Stat) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
      <div
        className="h-2 rounded-full bg-gray-900"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function AddressRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-white p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="font-mono text-xs">{value}</span>
        <button
          className="rounded-lg border px-2 py-1 text-xs text-gray-600 hover:bg-gray-50"
          aria-label={`Copy ${label}`}
        >
          <CopyIcon />
        </button>
      </div>
    </div>
  );
}

function InputField({
  id,
  label,
  placeholder,
  helper,
  error,
}: {
  id: string;
  label: string;
  placeholder: string;
  helper: string;
  error: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm text-gray-500">
        {label}
      </label>
      <input
        id={id}
        className="w-full rounded-xl border px-4 py-3 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
        placeholder={placeholder}
        type="text"
      />
      <p className="text-xs text-gray-500">{helper}</p>
      <p className="text-xs text-red-500">{error}</p>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="9" y="9" width="10" height="10" rx="2" />
      <rect x="5" y="5" width="10" height="10" rx="2" />
    </svg>
  );
}
