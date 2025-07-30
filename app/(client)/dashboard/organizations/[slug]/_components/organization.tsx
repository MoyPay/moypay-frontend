"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Plus,
  Settings,
  AlertCircle,
  Users,
  Building2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganizationListById } from "@/hooks/query/graphql/use-organization-list-by-id";
import { normalize } from "@/lib/helper/bignumber";
import { useEmployeeListsByOrganization } from "@/hooks/query/graphql/use-employee-lists-by-organization";
import { formatCompactNumber } from "@/lib/helper/number";
import { urlExplorer } from "@/lib/helper/web3";
import { PERIOD_LABELS } from "@/lib/constants";

interface OrganizationProps {
  id: string;
}

export default function Organization({ id }: OrganizationProps) {
  const {
    data: org,
    isLoading: orgLoading,
    error: orgError,
  } = useOrganizationListById({ id });
  const {
    data: emp,
    isLoading: empLoading,
    error: empError,
  } = useEmployeeListsByOrganization({
    organizationAddress: org?.organization ?? "",
    enabled: !!org?.organization,
  });

  const formatAddress = (address: string) => {
    if (!address) return "No address";

    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const PERIOD_TIMES = {
    DAILY: 86400,
    WEEKLY: 604800,
    MONTHLY: 2629746,
    YEARLY: 31556952,
  } as const;

  const getPeriodLabel = (periodValue: string | number): string => {
    if (typeof periodValue === "string" && periodValue in PERIOD_TIMES) {
      return periodValue;
    }

    const matchedEntry = Object.entries(PERIOD_TIMES).find(
      ([_, value]) => Number(periodValue) === value,
    );

    return matchedEntry
      ? PERIOD_LABELS[matchedEntry[0] as keyof typeof PERIOD_LABELS]
      : "Custom";
  };

  if (orgLoading) {
    return (
      <div className="w-full h-auto max-w-7xl mx-auto p-4 my-5">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <Skeleton className="h-10 w-24" />
          </div>

          <div className="flex flex-wrap justify-between gap-4 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-2 p-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-12 w-20" />
              </div>
            ))}
          </div>

          <div className="border rounded-2xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 border-2 rounded-xl">
                  <div className="flex gap-3 items-center">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex flex-col gap-2 flex-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orgError) {
    return (
      <div className="w-full h-auto max-w-7xl mx-auto p-4 my-5">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <AlertCircle className="w-16 h-16 text-red-500" />
          <h2 className="text-2xl font-bold text-center">
            Failed to Load Organization
          </h2>
          <p className="text-muted-foreground text-center max-w-md">
            {orgError.message ||
              "There was an error loading the organization data. Please try again later."}
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!org) {
    return (
      <div className="w-full h-auto max-w-7xl mx-auto p-4 my-5">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Building2 className="w-16 h-16 text-muted-foreground" />
          <h2 className="text-2xl font-bold text-center">
            Organization Not Found
          </h2>
          <p className="text-muted-foreground text-center max-w-md">
            The organization with ID &quot;{id}&quot; could not be found. It may
            have been deleted or moved.
          </p>
          <Button asChild variant="outline">
            <Link href="/organizations">Browse Organizations</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto max-w-7xl mx-auto p-4 my-5">
      <div className="flex flex-col gap-6 lg:gap-10">
        <div className="flex flex-col gap-6 lg:gap-10 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Link
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline transition-all duration-200"
                href="/dashboard"
              >
                <ArrowLeft />
              </Link>
              <Image
                alt={`Organization ${(org?.createdAt ?? 0) % 36} logo`}
                className="w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0 rounded-lg"
                height={72}
                src={`/images/abstract/${(org?.createdAt ?? 0) % 36}.jpg`}
                width={72}
                onError={(e) => {
                  e.currentTarget.src = "/images/default-org.png";
                }}
              />
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight truncate">
                  MoyPay {(org?.createdAt ?? 0) % 36}
                </h1>
                {org?.organization ? (
                  <Link
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline transition-all duration-200 w-fit"
                    href={urlExplorer({
                      chainId: 128123,
                      address: org.organization,
                    })}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="truncate">
                      {formatAddress(org.organization)}
                    </span>
                    <ArrowUpRight className="w-4 h-4 flex-shrink-0" />
                  </Link>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No address provided
                  </span>
                )}
              </div>
            </div>
            <Button className="w-full sm:w-auto flex-shrink-0">
              <Settings className="w-5 h-5" />
              <span className="ml-2">Settings</span>
            </Button>
          </div>

          <div className="flex flex-wrap justify-between gap-4 lg:gap-6">
            <div className="flex flex-col gap-2 p-4 rounded-lg border sm:border-0 sm:bg-transparent">
              <span className="text-sm text-muted-foreground">Period Time</span>
              <span className="text-3xl sm:text-4xl lg:text-5xl leading-none capitalize">
                {getPeriodLabel(org?.periodTime ?? "")}
              </span>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border sm:border-0 sm:bg-transparent">
              <span className="text-sm text-muted-foreground">
                Total Active Employees
              </span>
              <div className="flex items-end gap-1">
                <span className="text-3xl sm:text-4xl lg:text-5xl leading-none">
                  {org?.activeEmployees ?? "0"} / {org?.totalEmployees ?? "0"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border sm:border-0 sm:bg-transparent">
              <span className="text-sm text-muted-foreground">
                Current Deposited
              </span>
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl leading-none">
                  $
                  {formatCompactNumber(
                    normalize(org?.totalDeposits ?? "0", 18),
                  )}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-lg border sm:border-0 sm:bg-transparent">
              <span className="text-sm text-muted-foreground">
                Outstanding Salary
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-3xl sm:text-4xl lg:text-5xl leading-none ${Number(org?.shortfall ?? "0") > 0 ? "text-destructive" : "text-green-500"}`}
                >
                  ${formatCompactNumber(normalize(org?.shortfall ?? "0", 18))}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex border rounded-2xl w-full h-fit min-h-[200px] p-4 sm:p-5">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-semibold">
                List Employee
              </h2>
              <Button className="w-full sm:w-auto" variant="default">
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Add Employee</span>
                </div>
              </Button>
            </div>

            {empLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 border-2 rounded-xl">
                    <div className="flex gap-3 items-center">
                      <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                      <div className="flex flex-col gap-2 flex-1 min-w-0">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {empError && !empLoading && (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <AlertCircle className="w-12 h-12 text-red-500" />
                <div className="text-center">
                  <h3 className="font-semibold text-lg">
                    Failed to Load Employees
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {empError.message ||
                      "There was an error loading employee data."}
                  </p>
                </div>
              </div>
            )}

            {!empLoading && !empError && (!emp || emp.length === 0) && (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Users className="w-12 h-12 text-muted-foreground" />
                <div className="text-center">
                  <h3 className="font-semibold text-lg">No Employees Yet</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Start building your team by adding your first employee.
                  </p>
                </div>
              </div>
            )}

            {!empLoading && !empError && emp && emp.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {emp.map((employee) => (
                  <div
                    key={employee.id}
                    className="p-3 border-2 border-b-muted-foreground hover:border-primary transition-all duration-200 rounded-xl flex gap-3 items-center min-w-0 cursor-pointer hover:shadow-sm"
                  >
                    <Image
                      alt={`Employee ${Number(employee.createdAt) % 36} avatar`}
                      className="w-12 h-12 rounded-full flex-shrink-0"
                      height={48}
                      src={`/images/abstract2/${Number(employee.createdAt) % 16}.jpg`}
                      width={48}
                      onError={(e) => {
                        e.currentTarget.src = "/images/default-avatar.png";
                      }}
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-semibold text-sm truncate">
                        {formatAddress(employee.employee)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Employee
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
