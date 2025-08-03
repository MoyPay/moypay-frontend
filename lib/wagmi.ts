import type { AppKitNetwork } from "@reown/appkit/networks";

import { createAppKit } from "@reown/appkit/react";
import { type Config } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { defineChain } from "@reown/appkit/networks";

import { siteConfig } from "@/config/site";

export const projectId = "e7667cc8415f283320e0e52b8d5e6e26";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const etherlinkTestnet = defineChain({
  id: 128123,
  name: "Etherlink Testnet",
  chainNamespace: "eip155",
  caipNetworkId: "eip155:128123",
  nativeCurrency: {
    decimals: 18,
    name: "Tez",
    symbol: "XTZ",
  },
  rpcUrls: {
    default: { http: ["https://node.ghostnet.etherlink.com"] },
  },
  blockExplorers: {
    default: {
      name: "Etherlink Testnet",
      url: "https://testnet.explorer.etherlink.com",
    },
  },
  testnet: true,
  custom: {
    iconUrl: "/etherlink-logo.png",
  },
});

export const networks = [etherlinkTestnet] as [
  AppKitNetwork,
  ...AppKitNetwork[],
];

export const wagmiAdapter = new WagmiAdapter({
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
