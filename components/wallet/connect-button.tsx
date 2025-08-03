"use client";

import {
  useAppKit,
  useAppKitAccount,
  useAppKitState,
} from "@reown/appkit/react";
import React from "react";
import Image from "next/image";
import { useBalance } from "wagmi";

import GeneratedAvatar from "./generated-avatar";

import { formatAddress } from "@/lib/helper/web3";
import { networks } from "@/lib/wagmi";
import { formatCompactNumber } from "@/lib/helper/number";

export const ConnectButton = () => {
  const { open } = useAppKit();
  const { address, caipAddress, isConnected, embeddedWalletInfo } =
    useAppKitAccount();
  const state = useAppKitState();

  const selectedNetworkId = state?.selectedNetworkId?.split(":")[1];
  const network = networks.find(
    (network) => network.id === Number(selectedNetworkId),
  );

  const balance = useBalance({
    address: address as `0x${string}`,
    query: {
      enabled: isConnected && !!address,
    },
  });

  const handleConnect = () => {
    open();
  };

  return (
    <React.Fragment>
      {isConnected ? (
        <button
          className="rounded-full border-foreground/10 border px-2 py-1 gap-2 relative flex items-center cursor-pointer"
          onClick={handleConnect}
        >
          <div className="flex items-center gap-2">
            <Image
              alt="network icon"
              className="rounded-full w-[24px] h-[24px]"
              height={20}
              src={
                typeof network?.custom?.iconUrl === "string" &&
                network.custom.iconUrl.length > 0
                  ? network.custom.iconUrl
                  : "/logo-white.png"
              }
              width={20}
            />
            <span className="text-md">
              {formatCompactNumber(balance.data?.formatted ?? 0)}
              {` ${network?.nativeCurrency?.symbol || "ETH"}`}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-foreground/10 rounded-full px-2 py-1 h-[30px]">
            <GeneratedAvatar address={address as string} size="20px" />
            <span className="text-md text-gray-200">
              {embeddedWalletInfo?.accountType === "smartAccount"
                ? `${embeddedWalletInfo.user?.username || formatAddress(caipAddress as string)}`
                : `${formatAddress(address as string, 4)}`}
            </span>
          </div>
        </button>
      ) : (
        <button
          className="rounded-full border-foreground/10 border px-5 py-2 flex items-center cursor-pointer"
          onClick={handleConnect}
        >
          Connect Wallet
        </button>
      )}
    </React.Fragment>
  );
};
