import React, { useState } from "react";
import Image from "next/image";
import { Fuel } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBalanceCustom } from "@/hooks/query/contract/use-balance-custom";
import { contractAddresses } from "@/lib/constants";
import { formatCompactNumber } from "@/lib/helper/number";
import { useStakeProtocol } from "@/hooks/mutation/contract/use-stake";
import TransactionDialog from "@/components/dialog/dialog-transactions";
import { EarnData } from "@/data/earn.data";
import { useBalanceStaked } from "@/hooks/query/contract/use-balance-staked";

interface StakeDialogProps {
  protocol: EarnData;
  refetch?: () => void;
  trigger?: React.ReactNode;
}

type HexAddress = `0x${string}`;

const StakeDialog: React.FC<StakeDialogProps> = ({
  trigger,
  refetch,
  protocol,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [selectedToken] = useState<string>("USDC");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [transactionOpen, setTransactionOpen] = useState<boolean>(false);

  const { mutation, dialogStatus, steps, txHash } = useStakeProtocol();
  const { stakedAmount } = useBalanceStaked({
    protocolAddress: protocol.address as HexAddress,
  });

  const { balanceNormalized } = useBalanceCustom({
    tokenAddress: contractAddresses.mockUSDC,
  });

  const quickAmounts: number[] = [100, 500, 1000];

  const handleAmountClick = (value: number): void => {
    setAmount(value.toString());
  };

  const handleMaxClick = (): void => {
    if (balanceNormalized) {
      setAmount(balanceNormalized.toString());
    }
  };

  const handleStake = (): void => {
    setIsOpen(false);
    setTransactionOpen(true);

    mutation.mutate(
      {
        amount: parseFloat(amount) || 0,
        protocolAddress: protocol.address as HexAddress,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          setAmount("");
          refetch?.();
        },
      },
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;

    value = value.replace(/[^0-9.]/g, "");

    const decimalCount = (value.match(/\./g) || []).length;

    if (decimalCount > 1) {
      return;
    }

    const parts = value.split(".");

    if (parts[1] && parts[1].length > 2) {
      value = parts[0] + "." + parts[1].substring(0, 2);
    }

    if (value.length > 1 && value[0] === "0" && value[1] !== ".") {
      value = value.substring(1);
    }

    setAmount(value);
  };

  const getDisplayValue = (): string => {
    if (amount === "") return "";

    return `$${amount}`;
  };

  const displayValue = getDisplayValue();
  const numericAmount = parseFloat(amount) || 0;
  const isValidAmount = amount !== "" && numericAmount > 0;
  const isExceedsBalance =
    typeof balanceNormalized === "number" && numericAmount > balanceNormalized;

  return (
    <React.Fragment>
      <TransactionDialog
        errorMessage={mutation.error?.message}
        isOpen={transactionOpen}
        status={dialogStatus()}
        steps={steps}
        txHash={txHash as HexAddress}
        onClose={() => setTransactionOpen(false)}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button
              className="flex-1 flex items-center justify-center gap-1 rounded-2xl"
              variant="outline"
            >
              STAKE
            </Button>
          )}
        </DialogTrigger>

        <DialogContent
          aria-describedby={undefined}
          className="sm:max-w-md w-[95vw] max-h-[90vh] p-0 overflow-auto rounded-2xl"
        >
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-xl font-semibold text-white">
              Stake in {protocol.name}
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {protocol.description}
            </p>
          </DialogHeader>

          <div className="flex flex-col gap-6 px-6 pb-6">
            <div className="flex items-center gap-3 p-4 bg-background/50 rounded-2xl border border-muted-foreground/20">
              <Image
                alt={protocol.name}
                className="w-10 h-10 rounded-full"
                height={40}
                src={protocol.iconUrl}
                width={40}
              />
              <div className="flex-1">
                <h4 className="font-semibold text-white">{protocol.name}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{protocol.apy}% APY</span>
                  <span>{formatCompactNumber(protocol.tvl)} TVL</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm font-medium">
                Staked Amount
              </span>
              <span className="text-xs text-white/50">
                {formatCompactNumber(stakedAmount)} {selectedToken}
              </span>
            </div>

            <div>
              <div className="flex flex-col border border-b-muted-foreground hover:border-primary transition-all duration-200 rounded-2xl p-5 bg-background backdrop-blur-sm shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/70 text-sm font-medium">
                    You&apos;re staking
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/50">
                      Balance: {formatCompactNumber(balanceNormalized || 0)}{" "}
                      {selectedToken}
                    </span>
                  </div>
                </div>

                <div className="relative mb-4">
                  <input
                    aria-label="Stake amount"
                    autoComplete="off"
                    autoCorrect="off"
                    className={`w-full bg-transparent text-3xl font-light text-center px-4 py-3 border-none outline-none ring-0 placeholder:text-gray-500 focus:placeholder:text-gray-400 transition-all ${
                      isExceedsBalance ? "text-red-400" : "text-white"
                    }`}
                    inputMode="decimal"
                    pattern="[0-9]*[.]?[0-9]*"
                    placeholder="$0"
                    spellCheck={false}
                    type="text"
                    value={displayValue}
                    onChange={handleInputChange}
                  />
                </div>

                {isExceedsBalance && (
                  <div className="text-red-400 text-sm text-center mb-2">
                    Insufficient balance
                  </div>
                )}

                <div className="flex flex-wrap justify-center gap-2">
                  {quickAmounts.map((amt) => (
                    <Button
                      key={amt}
                      className="px-3 py-1.5 text-sm font-normal bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors"
                      disabled={
                        typeof balanceNormalized === "number"
                          ? amt > balanceNormalized
                          : false
                      }
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAmountClick(amt)}
                    >
                      ${amt.toLocaleString()}
                    </Button>
                  ))}
                  <Button
                    className="px-3 py-1.5 text-sm font-normal bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors"
                    size="sm"
                    variant="ghost"
                    onClick={() => handleMaxClick()}
                  >
                    MAX
                  </Button>
                </div>
              </div>

              <div className="border border-b-muted-foreground hover:border-primary transition-all duration-200 rounded-2xl p-5 pt-13 bg-background flex items-center -mt-10">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Image
                      alt="USDC Token"
                      className="w-6 h-6"
                      height={144}
                      src="/usdc.png"
                      width={144}
                    />
                    <span className="text-foreground font-bold text-lg">
                      {selectedToken}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <Fuel className="w-4 h-4" />
                    <span>$0.1</span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              className={`${
                isExceedsBalance
                  ? "bg-red-600/20 border-red-600/30 text-red-400 cursor-not-allowed"
                  : ""
              }`}
              disabled={!isValidAmount || isExceedsBalance}
              onClick={handleStake}
            >
              {!isValidAmount
                ? "Enter an amount"
                : isExceedsBalance
                  ? "Insufficient balance"
                  : `Stake ${numericAmount.toLocaleString()} ${selectedToken}`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default StakeDialog;
