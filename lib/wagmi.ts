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
  projectId:
    process.env.NEXT_PUBLIC_WC_PROJECT_ID || "e7667cc8415f283320e0e52b8d5e6e26",
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
