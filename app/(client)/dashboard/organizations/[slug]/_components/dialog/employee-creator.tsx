"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import { Loader2, Plus, Building } from "lucide-react";
import { isAddress } from "viem";

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
import TransactionDialog from "@/components/dialog/dialog-transactions";
import { useAddEmployee } from "@/hooks/mutation/contract/use-add-employee";

interface EmployeeCreatorProps {
  onSuccess?: () => void;
  organizationAddress: HexAddress;
  refetch: () => void;
  resetPagination: () => void;
}

export default function EmployeeCreator({
  onSuccess,
  organizationAddress,
  refetch,
  resetPagination,
}: EmployeeCreatorProps) {
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [transactionOpen, setTransactionOpen] = useState(false);

  const { mutation, dialogStatus, steps, txHash } = useAddEmployee();

  const isLoading = mutation.isPending;

  const handleCreateEmployee = async () => {
    if (
      !address ||
      !employeeName ||
      !employeeAddress ||
      !isAddress(employeeAddress) ||
      !salary ||
      !organizationAddress ||
      isNaN(Number(salary)) ||
      Number(salary) <= 0
    ) {
      return;
    }

    setIsOpen(false);
    setTransactionOpen(true);

    mutation.mutate(
      {
        employeeName: employeeName,
        employeeAddress: employeeAddress,
        salary: Number(salary),
        organizationAddress: organizationAddress,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          setEmployeeAddress("");
          setSalary("");
          onSuccess?.();
          refetch();
          resetPagination();
        },
      },
    );
  };

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
          <Button className="w-auto justify-start" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Add New Employee
            </DialogTitle>
            <DialogDescription>
              Fill in the details to add a new employee in your organization.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emp-name">Employee Name</Label>
              <Input
                className="h-12"
                id="emp-name"
                placeholder="Enter employee name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emp-address">Employee Address</Label>
              <Input
                className="h-12"
                id="emp-address"
                placeholder="Enter employee address"
                value={employeeAddress}
                onChange={(e) => setEmployeeAddress(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="org-name">Salary</Label>
              <Input
                className="h-12"
                id="emp-salary"
                placeholder="Enter employee salary"
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-row justify-between sm:flex-row sm:justify-between w-full items-center">
            <Button
              disabled={isLoading}
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={
                isLoading || !employeeAddress || !salary || !employeeName
              }
              onClick={handleCreateEmployee}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Deposit & Add Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
