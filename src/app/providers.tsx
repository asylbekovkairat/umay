"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { State, WagmiProvider } from "wagmi";
import { wagmiConfig } from "../shared/config/wagmi";

interface ProvidersProps extends PropsWithChildren {
  initialState?: State;
}

export function Providers(props: ProvidersProps) {
  const { children, initialState } = props;

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
