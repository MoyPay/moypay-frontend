import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";

export const WalletTab = () => {
  return (
    <TabsContent value="wallet">
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
