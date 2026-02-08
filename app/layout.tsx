/* External dependencies */
import { Providers } from "@/src/app/providers";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { PropsWithChildren } from "react";
import { cookieToInitialState } from "wagmi";

/* Local dependencies */
import { wagmiConfig } from "@/src/shared/config/wagmi";
import { Footer } from "@/src/widgets/footer";
import { Header } from "@/src/widgets/header";
import type { Metadata } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Umay",
  description:
    "Umay is a platform for creating and managing your own investment pools.",
};

export default async function RootLayout(props: PropsWithChildren) {
  const { children } = props;

  const initialState = cookieToInitialState(
    wagmiConfig,
    (await headers()).get("cookie")
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers initialState={initialState}>
          <div className="min-h-screen text-foreground">
            <Header />
            <main className="mx-auto max-w-dashboard space-y-6 px-4 py-8 sm:px-6">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
