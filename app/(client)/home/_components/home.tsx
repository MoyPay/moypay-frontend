"use client";

import { Radio, ScanBarcode, User } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-full max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center gap-6 w-full">
          <div className="flex flex-wrap justify-center items-center gap-3 mb-2">
            <Badge className="flex items-center gap-1">
              <User className="w-4 h-4" /> 10.000 Users
            </Badge>
            <Badge className="flex items-center gap-1">
              <Radio className="w-4 h-4" /> 100.000 Streams
            </Badge>
            <Badge className="flex items-center gap-1">
              <ScanBarcode className="w-4 h-4" /> 1.000.000 Transactions
            </Badge>
          </div>

          <div className="flex flex-col items-center justify-center gap-8 w-full px-4">
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl text-center">
                Unlock Passive Earnings from Day One.
              </span>
              <span className="text-lg sm:text-xl text-center text-muted-foreground">
                From salary to automated yield in seconds — decentralized,
                permissionless, and unstoppable.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button className="rounded-full bg-blue-600 hover:bg-blue-700 px-10 py-6 text-white text-base sm:text-lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
