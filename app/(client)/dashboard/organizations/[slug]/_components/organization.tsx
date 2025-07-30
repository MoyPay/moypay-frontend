"use client";

import Image from "next/image";
import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useOrganizationListById } from "@/hooks/query/graphql/use-organization-list-by-id";
import { PERIOD_TIMES } from "@/lib/constants";
import { normalize } from "@/lib/helper/bignumber";
import { useEmployeeListsByOrganization } from "@/hooks/query/graphql/use-employee-lists-by-organization";

export default function Organization({ id }: { id: string }) {
  const { data: org } = useOrganizationListById({ id });
  const { data: emp } = useEmployeeListsByOrganization({
    organizationAddress: org?.organization ?? "",
  });

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const getPeriodTime = (period: keyof typeof PERIOD_TIMES) => {
    return PERIOD_TIMES[period] ?? "Custom";
  };

  return (
    <div className="w-full h-auto max-w-7xl mx-auto p-4 my-5">
      <div className="flex flex-col sm:flex-row gap-10">
        <div className="flex flex-col gap-10 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                alt={`${(org?.createdAt ?? 0) % 36} logo`}
                className="w-18 h-18"
                height={72}
                src={`/images/abstract/${(org?.createdAt ?? 0) % 36}.jpg`}
                width={72}
              />
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">
                  MoyPay {(org?.createdAt ?? 0) % 36}
                </h1>
                <p className="text-muted-foreground">
                  {org?.organization
                    ? `${formatAddress(org.organization)}`
                    : "No address provided"}
                </p>
              </div>
            </div>
            <Button>
              <Settings className="w-5 h-5" />
              Settings
            </Button>
          </div>

          <div className="flex flex-wrap gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground">Period Time</span>
              <span className="text-5xl">
                {org?.periodTime && org?.periodTime in PERIOD_TIMES
                  ? getPeriodTime(org.periodTime as keyof typeof PERIOD_TIMES)
                  : "Custom"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground">Total Employees</span>
              <div className="flex items-end gap-1">
                <span className="text-5xl">{org?.totalEmployees ?? "0"}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground">Total Deposit</span>
              <div className="flex items-center gap-2 text-5xl">
                <span>${normalize(org?.totalDeposits ?? "0", 18)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground">Total Withdraw</span>
              <div className="flex items-center gap-2 text-5xl">
                <span>${normalize(org?.totalWithdrawals ?? "0", 18)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex border rounded-2xl w-full h-fit min-h-50 p-5">
          <div className="flex flex-col gap-8 w-auto">
            <span className="text-2xl">List Employee</span>
            <div className="flex flex-wrap gap-4">
              {emp?.map((employee) => (
                <div
                  key={employee.id}
                  className="p-3 border-2 border-b-muted-foreground hover:border-primary transition-all duration-200 rounded-xl flex gap-2 items-center min-w-[140px] h-fit"
                >
                  <Image
                    alt={`${Number(employee.createdAt) % 36} avatar`}
                    className="w-12 h-12 rounded-full"
                    height={48}
                    src={`/images/abstract/${Number(employee.createdAt) % 36}.jpg`}
                    width={48}
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {formatAddress(employee.employee)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Employee
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
