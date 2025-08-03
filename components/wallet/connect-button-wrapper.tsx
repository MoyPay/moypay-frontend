import React from "react";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";

import { Button } from "../ui/button";

export default function ConnectButtonWrapper({
  children,
  className = "",
  variant = "default",
}: {
  children?: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}) {
  const { open } = useAppKit();
  const { isConnected } = useAccount();

  return (
    <React.Fragment>
      {!isConnected ? (
        <Button className={className} variant={variant} onClick={() => open()}>
          Connect Wallet
        </Button>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </React.Fragment>
  );
}
