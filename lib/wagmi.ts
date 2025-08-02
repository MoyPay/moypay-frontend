import "@/lib/polyfills";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
// import { etherlinkTestnet } from "wagmi/chains";
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

export const etherlinkTestnet = {
  id: 128123,
  name: "Etherlink Testnet",
  network: "etherlink-testnet",
  nativeCurrency: {
    name: "Tez",
    symbol: "XTZ",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.ankr.com/etherlink_testnet"],
    },
    public: {
      http: ["https://rpc.ankr.com/etherlink_testnet"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://testnet-explorer.etherlink.com",
    },
  },
  testnet: true,
};

const config = getDefaultConfig({
  appName: siteConfig.name,
  projectId: "e7667cc8415f283320e0e52b8d5e6e26",
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
    [etherlinkTestnet.id]: http("https://rpc.ankr.com/etherlink_testnet"),
  },
  ssr: true,
});

export { config };
