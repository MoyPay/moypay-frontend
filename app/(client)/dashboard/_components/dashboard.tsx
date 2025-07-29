"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import OrganizationCreator from "./organization-creator";

import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { organizationData } from "@/data/organization.data";

export default function Dashboard() {
  const { isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-center">
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
      <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-center">
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
    <div className="w-full h-auto max-w-7xl mx-auto px-4 py-6">
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

        <Card>
          <CardHeader className="p-0 pt-5 px-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col items-start gap-2">
                <CardTitle>Your Organizations</CardTitle>
                <CardDescription>
                  Select an organization to manage its payroll and settings
                </CardDescription>
              </div>
              <OrganizationCreator />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {organizationData.map((org) => (
                <Link
                  key={org.id}
                  className="p-3 border-2 border-b-muted-foreground rounded-xl flex gap-2 items-center min-w-[140px]"
                  href={`/dashboard/organizations/${org.id}`}
                >
                  <span className="truncate">{org.name}</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
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
              {organizationData.map((org) => (
                <Link
                  key={org.id}
                  className="p-3 border-2 border-b-muted-foreground rounded-xl flex gap-2 items-center min-w-[140px]"
                  href={`/dashboard/organizations/${org.id}`}
                >
                  <span className="truncate">{org.name}</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
