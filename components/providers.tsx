"use client";

import "process/browser";

import { type Config, cookieToInitialState, WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { ThemeProvider } from "./theme-provider";

import { config } from "@/lib/wagmi";

export const queryClient = new QueryClient();

export default function Providers({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(config as Config, cookies);

  return (
    <ThemeProvider
      disableTransitionOnChange
      enableSystem
      attribute="class"
      defaultTheme="dark"
    >
      <WagmiProvider config={config as Config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
