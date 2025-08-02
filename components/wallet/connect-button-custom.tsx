"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const ChainIcon = ({
  iconUrl,
  name,
  background,
  size = 20,
}: {
  iconUrl?: string;
  name?: string;
  background?: string;
  size?: number;
}) => (
  <div
    style={{
      background,
      width: size,
      height: size,
      borderRadius: 999,
      overflow: "hidden",
      marginRight: 4,
    }}
  >
    {iconUrl && (
      <Image
        alt={`${name ?? "Chain"} icon`}
        height={size}
        src={iconUrl}
        style={{ width: size, height: size }}
        width={size}
      />
    )}
  </div>
);

const ButtonCustom = ({
  children,
  onClick,
  variant = "outline",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "outline" | "ghost";
}) => (
  <Button
    className="flex items-center justify-center px-4 py-5 rounded-2xl !font-ibm-plex-mono font-normal uppercase tracking-caption font-base truncate border-2 border-foreground hover:bg-foreground/10 bg-white"
    variant={variant}
    onClick={onClick}
  >
    {children}
  </Button>
);

export const ConnectButtonCustom = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        style={{
          opacity: 0,
          pointerEvents: "none",
          userSelect: "none",
          width: "140px",
          height: "40px",
        }}
      />
    );
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted: rainbowMounted,
      }) => {
        if (!rainbowMounted) {
          return (
            <div
              aria-hidden="true"
              style={{
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
                width: "140px",
                height: "40px",
              }}
            />
          );
        }

        const connected = account && chain;

        if (!connected) {
          return (
            <ButtonCustom variant="outline" onClick={openConnectModal}>
              Connect Wallet
            </ButtonCustom>
          );
        }

        if (chain?.unsupported) {
          return (
            <ButtonCustom onClick={openChainModal}>Wrong network</ButtonCustom>
          );
        }

        return (
          <div className="flex-row flex gap-3 z-50">
            <ButtonCustom onClick={openChainModal}>
              {chain.hasIcon ? (
                <div className="min-w-5">
                  <ChainIcon
                    background={chain.iconBackground}
                    iconUrl={chain.iconUrl}
                    name={chain.name}
                  />
                </div>
              ) : (
                <div className="min-w-5">
                  <ChainIcon
                    background={chain.iconBackground}
                    iconUrl="/etherlink-logo.png"
                    name={chain.name}
                  />
                </div>
              )}
              <span className="max-w-32 truncate">{chain.name}</span>
            </ButtonCustom>

            <ButtonCustom onClick={openAccountModal}>
              {account.displayName}
            </ButtonCustom>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
