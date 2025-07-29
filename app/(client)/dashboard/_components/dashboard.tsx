"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";

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
    <div className="w-full h-auto max-w-7xl mx-auto p-4 my-5">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your organizations and payroll systems
            </p>
          </div>
          <OrganizationCreator />
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Organizations</CardTitle>
            <CardDescription>
              Select an organization to manage its payroll and settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row gap-4">
              {organizationData.map((org) => (
                <div
                  key={org.id}
                  className="p-2 border-b border-b-muted-foreground"
                >
                  {org.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
