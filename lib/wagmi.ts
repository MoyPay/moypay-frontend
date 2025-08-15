import type { AppKitNetwork } from "@reown/appkit/networks";

import { createAppKit } from "@reown/appkit/react";
import { cookieStorage, createStorage, type Config } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { defineChain } from "@reown/appkit/networks";

import { siteConfig } from "@/config/site";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const coreTestnet = defineChain({
  id: 1115,
  name: "Core Testnet",
  chainNamespace: "eip155",
  caipNetworkId: "eip155:1115",
  nativeCurrency: {
    decimals: 18,
    name: "Tez",
    symbol: "XTZ",
  },
  rpcUrls: {
    default: { http: ["https://core-testnet.drpc.org"] },
  },
  blockExplorers: {
    default: {
      name: "Core Testnet",
      url: "https://scan.test2.btcs.network",
    },
  },
  testnet: true,
  custom: {
    iconUrl: "/core-logo.png",
  },
});

export const networks = [coreTestnet] as [AppKitNetwork, ...AppKitNetwork[]];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

const metadata = {
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  icons: ["/logo-white.png"],
};

export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  themeMode: "dark",
  features: {
    analytics: true,
  },
  // themeVariables: {
  //   "--w3m-accent": "#000000",
  // },
});

const config: Config = wagmiAdapter.wagmiConfig;

export { config };
