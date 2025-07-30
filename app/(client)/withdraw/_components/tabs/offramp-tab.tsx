"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import { WithdrawlDialog } from "../dialog/withdrawl-dialog";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export const OffRampTab = () => {
  const [withdrawMethod, setWithdrawMethod] = useState<null | {
    type: "visa" | "bank";
    data: any;
  }>(null);

  const [showDialog, setShowDialog] = useState(false);

  const handleRemoveMethod = () => {
    localStorage.removeItem("withdrawMethod");
    setWithdrawMethod(null);
  };

  console.log("withdrawMethod", withdrawMethod);

  return (
    <TabsContent value="offramp">
      <Card className="border-0 px-0">
        <CardContent className="px-0">
          <div className="relative">
            <Input
              className="h-20 w-full rounded-xl md:text-4xl pr-36"
              placeholder="0"
              type="number"
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
            className="w-full border-2 border-b-muted-foreground"
            size="lg"
          >
            Withdraw
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};
