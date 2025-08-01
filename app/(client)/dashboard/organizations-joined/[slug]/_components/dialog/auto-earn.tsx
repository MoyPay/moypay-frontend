"use client";

import React, { useState } from "react";
import { Bot, AlertCircle, CheckCircle2, Info } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import TransactionDialog from "@/components/dialog/dialog-transactions";
import { useAutoEarn } from "@/hooks/mutation/contract/use-auto-earn";
import { useDisableAutoEarn } from "@/hooks/mutation/contract/use-disable-auto-earn";

interface AutoEarnDialogProps {
  organizationAddress: string;
  isAutoEarnEnabled?: boolean;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

type HexAddress = `0x${string}`;

const AutoEarnDialog: React.FC<AutoEarnDialogProps> = ({
  organizationAddress,
  isAutoEarnEnabled = false,
  onSuccess,
  trigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);
  const [enableAutoEarn, setEnableAutoEarn] = useState(isAutoEarnEnabled);

  const {
    steps: enableSteps,
    mutation: enableMutation,
    txHash: enableTxHash,
    dialogStatus: enableDialogStatus,
  } = useAutoEarn();

  const {
    steps: disableSteps,
    mutation: disableMutation,
    txHash: disableTxHash,
    dialogStatus: disableDialogStatus,
  } = useDisableAutoEarn();

  const isLoading = enableMutation.isPending || disableMutation.isPending;
  const hasChanges = enableAutoEarn !== isAutoEarnEnabled;

  const handleConfirm = async () => {
    if (!hasChanges) return;

    setIsOpen(false);
    setTransactionOpen(true);

    try {
      if (enableAutoEarn && !isAutoEarnEnabled) {
        await enableMutation.mutateAsync({
          organizationAddress: organizationAddress as HexAddress,
          onSuccess: () => {
            onSuccess?.();
          },
        });
      } else if (!enableAutoEarn && isAutoEarnEnabled) {
        await disableMutation.mutateAsync({
          organizationAddress: organizationAddress as HexAddress,
          protocolAddress: "" as HexAddress,
          onSuccess: () => {
            onSuccess?.();
          },
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    setEnableAutoEarn(isAutoEarnEnabled);
  };

  const getCurrentSteps = () => {
    if (enableMutation.isPending) return enableSteps;
    if (disableMutation.isPending) return disableSteps;

    return [];
  };

  const getCurrentTxHash = () => {
    if (enableTxHash) return enableTxHash;
    if (disableTxHash) return disableTxHash;

    return undefined;
  };

  const getCurrentDialogStatus = () => {
    if (enableMutation.isPending) return enableDialogStatus();
    if (disableMutation.isPending) return disableDialogStatus();
    if (enableMutation.isSuccess || disableMutation.isSuccess) return "success";
    if (enableMutation.isError || disableMutation.isError) return "failed";

    return "idle";
  };

  const getErrorMessage = () => {
    if (enableMutation.error) return enableMutation.error.message;
    if (disableMutation.error) return disableMutation.error.message;

    return undefined;
  };

  return (
    <>
      <TransactionDialog
        errorMessage={getErrorMessage()}
        isOpen={transactionOpen}
        status={getCurrentDialogStatus()}
        steps={getCurrentSteps()}
        txHash={getCurrentTxHash() as HexAddress}
        onClose={() => setTransactionOpen(false)}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button className="flex items-center justify-center gap-2">
              <Bot className="w-5 h-5" />
              Auto Earn
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Auto Earn Settings
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isAutoEarnEnabled ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                <span className="text-sm font-medium">
                  Auto Earn is currently{" "}
                  <span
                    className={
                      isAutoEarnEnabled ? "text-green-600" : "text-gray-500"
                    }
                  >
                    {isAutoEarnEnabled ? "Enabled" : "Disabled"}
                  </span>
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label
                  className="text-base font-medium"
                  htmlFor="auto-earn-toggle"
                >
                  Enable Auto Earn
                </Label>
                <Switch
                  checked={enableAutoEarn}
                  id="auto-earn-toggle"
                  onCheckedChange={setEnableAutoEarn}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      What is Auto Earn?
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Auto Earn automatically invests your salary into
                      yield-optimizing protocols to help grow your earnings
                      passively. Once enabled, it will:
                    </p>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 ml-4">
                      <li>• Automatically invest your salary upon receipt</li>
                      <li>• Reinvest returns to compound your earnings</li>
                      <li>• Batch transactions to minimize gas fees</li>
                      <li>• Optimize allocation based on market conditions</li>
                    </ul>
                  </div>
                </div>

                {enableAutoEarn && !isAutoEarnEnabled && (
                  <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-green-900 dark:text-green-100">
                        Ready to Enable
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Auto Earn will be activated for this organization after
                        confirmation.
                      </p>
                    </div>
                  </div>
                )}

                {!enableAutoEarn && isAutoEarnEnabled && (
                  <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-orange-900 dark:text-orange-100">
                        Disabling Auto Earn
                      </h4>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        Auto Earn will be deactivated. You&#39;ll need to
                        manually manage your salary withdrawals going forward.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-3 pt-4">
            <Button
              disabled={isLoading}
              variant="outline"
              onClick={handleDialogClose}
            >
              Cancel
            </Button>
            <Button
              className={
                enableAutoEarn && !isAutoEarnEnabled
                  ? "bg-green-600 hover:bg-green-700"
                  : !enableAutoEarn && isAutoEarnEnabled
                    ? "bg-orange-600 hover:bg-orange-700"
                    : ""
              }
              disabled={!hasChanges || isLoading}
              onClick={handleConfirm}
            >
              {!hasChanges
                ? "No Changes"
                : enableAutoEarn && !isAutoEarnEnabled
                  ? "Enable Auto Earn"
                  : !enableAutoEarn && isAutoEarnEnabled
                    ? "Disable Auto Earn"
                    : "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AutoEarnDialog;
