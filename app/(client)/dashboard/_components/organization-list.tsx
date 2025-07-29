"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { Building, Users, ArrowRight } from "lucide-react";
import { erc20Abi } from "viem";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { normalize } from "@/lib/helper/bignumber";
import { formatCompactNumber } from "@/lib/helper/number";
import { organizationData, OrganizationData } from "@/data/organization.data";

interface OrganizationListProps {
  onSelectOrganization: (address: string) => void;
}

export default function OrganizationList({
  onSelectOrganization,
}: OrganizationListProps) {
  const { address } = useAccount();
  const [organizations, setOrganizations] = useState<OrganizationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockOrganizations: OrganizationData[] = organizationData;

    setOrganizations(mockOrganizations);
    setLoading(false);
  }, [address]);

  const OrganizationCard = ({ org }: { org: OrganizationData }) => {
    const { data: tokenSymbol } = useReadContract({
      address: org.tokenAddress as HexAddress,
      abi: erc20Abi,
      functionName: "symbol",
    });

    const { data: tokenDecimals } = useReadContract({
      address: org.tokenAddress as HexAddress,
      abi: erc20Abi,
      functionName: "decimals",
    });

    const getPeriodLabel = (seconds: string) => {
      const sec = Number(seconds);

      if (sec === 86400) return "Daily";
      if (sec === 604800) return "Weekly";
      if (sec === 2629746) return "Monthly";
      if (sec === 31556952) return "Yearly";

      return "Custom";
    };

    return (
      <Card
        className="hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => onSelectOrganization(org.address)}
      >
        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg transition-colors border border-gray-200">
                <Building className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold transition-colors">
                  {org.name}
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1 font-mono">
                  {org.address.slice(0, 8)}...{org.address.slice(-6)}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-lg font-semibold">
                  {formatCompactNumber(
                    normalize(
                      org.balance,
                      tokenDecimals ? Number(tokenDecimals) : 18,
                    ),
                  )}{" "}
                  {typeof tokenSymbol === "string" ? tokenSymbol : ""}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Employees</p>
                <p className="text-lg font-semibold flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {org.employeeCount}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Payment Period</p>
              <Badge className="text-xs" variant="secondary">
                {getPeriodLabel(org.periodTime)}
              </Badge>
            </div>

            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Manage Organizations
                </span>
                <div className="p-2">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (organizations.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Organizations Found</h3>
          <p className="text-muted-foreground mb-4">
            Create your first organization to start managing employees and
            payroll
          </p>
          <Button variant="outline">
            <Building className="h-4 w-4 mr-2" />
            Create Organization
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {organizations.map((org) => (
          <OrganizationCard key={org.address} org={org} />
        ))}
      </div>
    </div>
  );
}
