"use client";

import { organizationData } from "@/data/organization.data";

export default function Organization({ id }: { id: number }) {
  const org = organizationData.find((org) => org.id === String(id));

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div className="w-full h-auto max-w-7xl mx-auto p-4 my-5">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{org?.name}</h1>
            <p className="text-muted-foreground">
              {org?.address
                ? `${formatAddress(org.address)}`
                : "No address provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
