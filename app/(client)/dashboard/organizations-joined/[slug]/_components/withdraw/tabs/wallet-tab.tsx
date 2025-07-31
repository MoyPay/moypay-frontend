import Image from "next/image";
import React, { useState } from "react";

import { WithdrawDialogProps } from "../dialog/withdraw-dialog";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { useWithdrawOrganization } from "@/hooks/mutation/contract/use-withdraw-organization";
import TransactionDialog from "@/components/dialog/dialog-transactions";
import { formatNumberWithComma } from "@/lib/helper/formatted";

export const WalletTab = ({
  balance,
  organizationAddress,
  onSuccess,
}: WithdrawDialogProps) => {
  const [amount, setAmount] = useState<string>("");
  const [rawAmount, setRawAmount] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { mutation, dialogStatus, steps, txHash } = useWithdrawOrganization({
    onSuccess,
  });
  const [transactionOpen, setTransactionOpen] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/,/g, "");

    if (/^\d*\.?\d{0,6}$/.test(rawVal)) {
      setRawAmount(rawVal);
      setAmount(formatNumberWithComma(rawVal));

      const numericVal = parseFloat(rawVal);

      if (numericVal > parseFloat(balance)) {
        setError("Insufficient balance to withdraw this amount");
      } else if (numericVal < 5) {
        setError("Minimum withdrawal amount is $5");
      } else {
        setError(null);
      }
    }
  };

  const handleWithdraw = (): void => {
    const numericVal = parseFloat(rawAmount);

    if (numericVal < 5) {
      setError("Minimum withdrawal amount is $5");

      return;
    }

    if (numericVal > parseFloat(balance)) {
      setError("Insufficient balance to withdraw this amount");

      return;
    }

    setTransactionOpen(true);
    mutation.mutate(
      {
        amount: numericVal,
        organizationAddress: organizationAddress as HexAddress,
        isOffRamp: false,
      },
      {
        onSuccess: () => {
          setAmount("");
          setRawAmount("");
          setError(null);
        },
      },
    );
  };

  return (
    <>
      <TabsContent value="wallet">
        <Card className="border-0 px-0">
          <CardContent className="px-0">
            <div className="relative">
              <Input
                className="h-20 w-full rounded-xl md:text-4xl pr-36"
                placeholder="0.00"
                type="text"
                value={amount}
                onChange={handleInputChange}
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-4 flex gap-1 items-center border-2 py-2 px-4 rounded-full">
                <Image
                  alt="USDC"
                  height={20}
                  src="https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042194"
                  width={20}
                />
                <span className="text-xl text-gray-500">USDC</span>
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-500 mt-1 font-medium">{error}</p>
            )}
            <div className="mt-1 flex items-center justify-between">
              <span className="text-sm font-semibold">Balance: ${balance}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setRawAmount(balance);
                  setAmount(formatNumberWithComma(balance));
                  setError(null);
                }}
              >
                Max
              </Button>
            </div>
          </CardContent>
          <CardFooter className="px-0">
            <Button
              className="w-full border-2 border-b-muted-foreground"
              disabled={
                parseFloat(rawAmount || "0") < 5 ||
                parseFloat(rawAmount || "0") > parseFloat(balance)
              }
              size="lg"
              onClick={handleWithdraw}
            >
              Withdraw
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TransactionDialog
        errorMessage={mutation.error?.message}
        isOpen={transactionOpen}
        status={dialogStatus()}
        steps={steps}
        txHash={txHash as HexAddress}
        onClose={() => setTransactionOpen(false)}
      />
    </>
  );
};
