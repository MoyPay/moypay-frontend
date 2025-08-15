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
  id: 1114,
  name: "Core Testnet2",
  chainNamespace: "eip155",
  caipNetworkId: "eip155:1114",
  nativeCurrency: {
    decimals: 18,
    name: "tCore2",
    symbol: "TCORE2",
  },
  rpcUrls: {
    default: { http: ["https://rpc.test2.btcs.network"] },
  },
  blockExplorers: {
    default: {
      name: "Core Testnet2",
      url: "https://scan.test2.btcs.network",
      apiUrl: "https://api.test2.btcs.network/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0x3CB285ff3Cd5C7C7e570b1E7DE3De17A0f985e56",
      blockCreated: 3_838_600,
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
