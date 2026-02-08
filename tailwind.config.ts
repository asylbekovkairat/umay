import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        muted: "var(--muted)",
        "muted-bg": "var(--muted-bg)",

        border: "var(--border)",
        card: "var(--card-bg)",
        ring: "var(--ring)",

        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",

        positive: "var(--positive)",
        negative: "var(--negative)",
        warning: "var(--warning)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.04) inset",
        glow: "0 0 0 1px rgba(163,230,53,0.15), 0 20px 60px rgba(163,230,53,0.08)",
      },
      backdropBlur: {
        glass: "10px",
      },
      maxWidth: {
        dashboard: "1120px",
      },
    },
  },
  plugins: [],
} satisfies Config;
