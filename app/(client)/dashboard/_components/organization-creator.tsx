"use client";

import React, { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Loader2, Plus, Building } from "lucide-react";
import { toast } from "sonner";
import { isAddress } from "viem";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contractAddresses, PERIOD_TIMES } from "@/lib/constants";
import { FactoryABI } from "@/lib/abis/factory.abi";

interface OrganizationCreatorProps {
  onSuccess?: () => void;
}

export default function OrganizationCreator({
  onSuccess,
}: OrganizationCreatorProps) {
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [periodTime, setPeriodTime] = useState<string>("");

  const {
    writeContract,
    isPending: isWritePending,
    data: hash,
  } = useWriteContract();

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  const isLoading = isWritePending || isConfirming;

  const handleCreateOrganization = async () => {
    if (!address) {
      toast.error("Please connect your wallet");

      return;
    }

    if (!tokenAddress || !isAddress(tokenAddress)) {
      toast.error("Please enter a valid token address");

      return;
    }

    if (!organizationName.trim()) {
      toast.error("Please enter an organization name");

      return;
    }

    try {
      await writeContract({
        address: contractAddresses.factory as HexAddress,
        abi: FactoryABI,
        functionName: "createOrganization",
        args: [tokenAddress as HexAddress],
      });

      toast.success("Organization creation transaction submitted!");
      setIsOpen(false);
      setTokenAddress("");
      setOrganizationName("");
      setPeriodTime("");
      onSuccess?.();
    } catch {
      toast.error("Failed to create organization");
    }
  };

  const periodOptions = [
    { value: PERIOD_TIMES.DAILY.toString(), label: "Daily" },
    { value: PERIOD_TIMES.WEEKLY.toString(), label: "Weekly" },
    { value: PERIOD_TIMES.MONTHLY.toString(), label: "Monthly" },
    { value: PERIOD_TIMES.YEARLY.toString(), label: "Yearly" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-auto justify-start" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Organization
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Create New Organization
          </DialogTitle>
          <DialogDescription>
            Create a new organization to manage employees and payroll.
            You&apos;ll need an ERC20 token address for payments.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="org-name">Organization Name</Label>
            <Input
              className="h-12"
              id="org-name"
              placeholder="Enter organization name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="token-address">Payment Token</Label>
            <Select
              value={tokenAddress}
              onValueChange={(value) => setTokenAddress(value)}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select token for payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={contractAddresses.mockUSDC}>
                  <div className="flex items-center">
                    <Image
                      alt="USDC Token"
                      className="inline-block mr-2"
                      height={20}
                      src="/usdc.png"
                      width={20}
                    />
                    <span>Mock USDC</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Choose an ERC20 token to use for payments
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="period-time">Default Payment Period</Label>
            <Select value={periodTime} onValueChange={setPeriodTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment period" />
              </SelectTrigger>
              <SelectContent>
                {periodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              This can be changed later for each organization
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading || !tokenAddress || !organizationName.trim()}
            onClick={handleCreateOrganization}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Organization
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
