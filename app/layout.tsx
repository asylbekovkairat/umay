import { Providers } from "@/src/app/providers";
import { wagmiConfig } from "@/src/shared/config/wagmi";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { PropsWithChildren } from "react";
import { cookieToInitialState } from "wagmi";
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
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
