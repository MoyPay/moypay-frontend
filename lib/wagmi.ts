import "@/lib/polyfills";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { etherlinkTestnet } from "wagmi/chains";
import {
  braveWallet,
  coinbaseWallet,
  metaMaskWallet,
  okxWallet,
  rabbyWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { siteConfig } from "@/config/site";

const config = getDefaultConfig({
  appName: siteConfig.name,
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "",
  chains: [etherlinkTestnet],
  wallets: [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, okxWallet, rabbyWallet, walletConnectWallet],
    },
    {
      groupName: "Others",
      wallets: [rainbowWallet, coinbaseWallet, braveWallet, trustWallet],
    },
  ],
  transports: {
    [etherlinkTestnet.id]: http("https://node.ghostnet.etherlink.com"),
  },
  ssr: true,
});

export { config };
