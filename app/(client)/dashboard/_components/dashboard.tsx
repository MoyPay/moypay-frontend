"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import OrganizationCreator from "./dialog/organization-creator";

import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOrganizationListsByOwner } from "@/hooks/query/graphql/use-organization-lists-by-owner";
import { useOrganizationJoinedListsByEmployee } from "@/hooks/query/graphql/use-organization-joined-lists-by-employee";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);
  const { data: organizationLists, resetPagination } =
    useOrganizationListsByOwner();
  const { data: organizationJoinedLists } =
    useOrganizationJoinedListsByEmployee();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-center 2xl:p-10">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Loading...</CardTitle>
            <CardDescription>Initializing dashboard...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-center 2xl:p-10">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>
              Please connect your wallet to access the MoyPay dashboard
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full h-auto max-w-7xl mx-auto px-4 py-6 2xl:p-10">
      <div className="flex flex-col gap-6 p-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your organizations and payroll systems
            </p>
          </div>
        </div>

        <Separator />

        <Card className="pb-10">
          <CardHeader className="p-0 pt-5 px-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col items-start gap-2">
                <CardTitle>Your Organizations</CardTitle>
                <CardDescription>
                  Select an organization to manage its payroll and settings
                </CardDescription>
              </div>
              <OrganizationCreator
                onSuccess={() => {
                  resetPagination();
                }}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {organizationLists.map((org, index) => (
                <Link
                  key={index}
                  className="p-3 border-2 border-b-muted-foreground hover:border-primary transition-all duration-200 rounded-xl flex gap-2 items-center min-w-[140px]"
                  href={`/dashboard/organizations/${org.id}`}
                >
                  <div className="flex flex-col items-center gap-2 w-full">
                    <Image
                      alt={`${org.createdAt} logo`}
                      className="w-20 h-20"
                      height={144}
                      src={`/images/abstract/${Number(org.createdAt) % 36}.jpg`}
                      width={144}
                    />
                    <Button
                      className="w-full flex items-center gap-2"
                      variant="default"
                    >
                      <span className="truncate">{org.name}</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="pb-10">
          <CardHeader className="p-0 pt-5 px-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col items-start gap-2">
                <CardTitle>Organizations Joined</CardTitle>
                <CardDescription>
                  Select an organization to manage its payroll and settings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {organizationJoinedLists.map((org, index) => (
                <Link
                  key={index}
                  className="p-3 border-2 border-b-muted-foreground hover:border-primary transition-all duration-200 rounded-xl flex gap-2 items-center min-w-[140px]"
                  href={`/dashboard/organizations-joined/${org.id}`}
                >
                  <div className="flex flex-col items-center gap-2 w-full">
                    <Image
                      alt={`${org.createdAt} logo`}
                      className="w-20 h-20"
                      height={144}
                      src={`/images/abstract/${Number(org.createdAt) % 36}.jpg`}
                      width={144}
                    />
                    <Button
                      className="w-full flex items-center gap-2"
                      variant="default"
                    >
                      <span className="truncate">{org.name}</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
