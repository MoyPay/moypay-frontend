import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import React from "react";

export const WalletTab = () => {
  return (
    <TabsContent value="wallet">
      <Card className="border-0 px-0">
        <CardContent className="px-0">
          <div className="relative">
            <Input
              type="number"
              placeholder="0"
              className="h-20 w-full rounded-xl md:text-4xl pr-36"
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-4 flex gap-1 items-center border-2 py-2 px-4 rounded-full">
              <Image
                alt="USDC"
                src="https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042194"
                width={20}
                height={20}
              />
              <span className="text-xl text-gray-500">USDC</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-0">
          <Button
            size="lg"
            className="w-full border-2 border-b-muted-foreground"
          >
            Withdraw
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};
