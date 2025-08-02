import "@/lib/polyfills";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { etherlinkTestnet } from "wagmi/chains";

import { siteConfig } from "@/config/site";

const config = getDefaultConfig({
  appName: siteConfig.name,
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "",
  chains: [etherlinkTestnet],
  transports: {
    [etherlinkTestnet.id]: http("https://node.ghostnet.etherlink.com"),
  },
  ssr: true, // Enable SSR to prevent hydration issues
});

export { config };
