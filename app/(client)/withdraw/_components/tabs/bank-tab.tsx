import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BankTab({
  initialData = {},
  onChange,
}: {
  initialData?: any;
  onChange: (data: any) => void;
}) {
  const [bank, setBank] = useState(initialData.bank || "");
  const [accountNumber, setAccountNumber] = useState(
    initialData.accountNumber || "",
  );

  useEffect(() => {
    onChange({ bank, accountNumber });
  }, [bank, accountNumber]);

  return (
    <div className="flex flex-col gap-4 mt-3">
      <Label htmlFor="account-number">Account Number</Label>
      <div className="flex items-center w-full mt-2">
        <Select value={bank} onValueChange={setBank}>
          <SelectTrigger className="!bg-transparent rounded-tr-none rounded-br-none">
            <SelectValue placeholder="Select a Bank" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Banks</SelectLabel>
              <SelectItem value="bca">BCA</SelectItem>
              <SelectItem value="bni">BNI</SelectItem>
              <SelectItem value="bri">BRI</SelectItem>
              <SelectItem value="mandiri">Mandiri</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          className="w-full rounded-tl-none rounded-bl-none border-l-0"
          id="account-number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>
    </div>
  );
}
