import { WalletTab } from "./wallet-tab";
import { OffRampTab } from "./offramp-tab";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function WithdrawTabs() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Tabs className="border p-5 rounded-xl" defaultValue="wallet">
        <TabsList className="w-full">
          <TabsTrigger value="wallet">Send To Wallet</TabsTrigger>
          <TabsTrigger value="offramp">Withdraw To Bank</TabsTrigger>
        </TabsList>
        <WalletTab />
        <OffRampTab />
      </Tabs>
    </div>
  );
}
