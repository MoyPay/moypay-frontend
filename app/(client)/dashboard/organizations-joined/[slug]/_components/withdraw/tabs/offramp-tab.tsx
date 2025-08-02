"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import { WithdrawlDialog } from "../dialog/withdrawl-dialog";
import { WithdrawDialogProps } from "../dialog/withdraw-dialog";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { formatNumberWithComma } from "@/lib/helper/formatted";
import { useWithdrawOrganization } from "@/hooks/mutation/contract/use-withdraw-organization";
import TransactionDialog from "@/components/dialog/dialog-transactions";
import { cn } from "@/lib/utils";

export const OffRampTab = ({
  balance,
  organizationAddress,
  onSuccess,
}: WithdrawDialogProps) => {
  const [withdrawMethod, setWithdrawMethod] = useState<null | {
    type: "visa" | "bank";
    data: any;
  }>(null);
  const [rawAmount, setRawAmount] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [, setError] = useState<string | null>(null);
  const [transactionOpen, setTransactionOpen] = useState<boolean>(false);
  const isExceedsBalance = parseFloat(rawAmount) > Number(balance);

  const { mutation, dialogStatus, steps, txHash } = useWithdrawOrganization({
    onSuccess,
  });

  const [showDialog, setShowDialog] = useState(false);

  const handleRemoveMethod = () => {
    localStorage.removeItem("withdrawMethod");
    setWithdrawMethod(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[,$]/g, "");

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
        isOffRamp: true,
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
      <TabsContent value="offramp">
        <Card className="border-0 px-0">
          <CardContent className="px-0">
            <div className="relative">
              <Input
                className={cn(
                  "h-20 w-full rounded-xl md:text-4xl pr-36",
                  isExceedsBalance
                    ? "text-red-500 !border-red-500 focus-visible:border-ring focus-visible:ring-red-500 focus-visible:ring-[3px]"
                    : "",
                  !amount && "text-muted-foreground",
                )}
                placeholder="0.00"
                type="text"
                value={amount ? `$${amount}` : "$0"}
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
            {/* {error && (
              <p className="text-sm text-red-500 mt-1 font-medium">{error}</p>
            )} */}
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
            {withdrawMethod ? (
              <div className="cursor-pointer mt-5 border px-4 py-3 rounded-xl hover:bg-muted transition">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    {withdrawMethod.type === "visa"
                      ? `Visa - ${withdrawMethod.data.email}`
                      : `Bank - ${withdrawMethod.data.bank?.toUpperCase()} ${withdrawMethod.data.accountNumber}`}
                  </div>
                  <div className="flex gap-2">
                    <Button size={"icon"} onClick={() => setShowDialog(true)}>
                      <Pencil />
                    </Button>
                    <Button
                      size={"icon"}
                      variant={"destructive"}
                      onClick={handleRemoveMethod}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <WithdrawlDialog setWithdrawMethod={setWithdrawMethod} />
            )}

            {showDialog && (
              <WithdrawlDialog
                initialMethod={withdrawMethod ?? undefined}
                open={showDialog}
                setWithdrawMethod={setWithdrawMethod}
                onOpenChange={setShowDialog}
              />
            )}
          </CardContent>
          <CardFooter className="px-0">
            <Button
              className={cn(
                `w-full`,
                !isExceedsBalance
                  ? "border-2 border-b-muted-foreground"
                  : "text-red-400",
              )}
              disabled={
                parseFloat(rawAmount || "0") < 5 ||
                parseFloat(rawAmount || "0") > parseFloat(balance)
              }
              size="lg"
              variant={isExceedsBalance ? "destructive" : "default"}
              onClick={handleWithdraw}
            >
              {!rawAmount
                ? "Enter Amount"
                : !isExceedsBalance
                  ? `Withdraw $${parseFloat(rawAmount).toLocaleString()}`
                  : "Insufficient balance"}
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
