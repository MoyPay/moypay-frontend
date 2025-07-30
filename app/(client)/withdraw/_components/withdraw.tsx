"use client";

import { WithdrawTabs } from "./tabs/withdraw-tabs";

export default function Withdraw() {
  return (
    <div className="w-full h-full max-w-7xl mx-auto">
      <div className="p-5 flex items-center justify-center h-full">
        <WithdrawTabs />
      </div>
    </div>
  );
}
