"use client";

import { Radio, ScanBarcode, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-full max-w-7xl mx-auto">
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Badge>
              <User /> 10.000 Users
            </Badge>
            <Badge>
              <Radio />
              100.000 Streams
            </Badge>
            <Badge>
              <ScanBarcode />
              1.000.000 Transactions
            </Badge>
          </div>
          <div className="flex flex-col items-center justify-center h-full gap-10 max-w-4xl">
            <span className="text-5xl text-center">
              Start by Create Stream or Join Existing Stream
            </span>
            <div className="flex items-center justify-center space-x-5">
              <Button className="rounded-full bg-blue-600 hover:bg-blue-700 p-10 py-7 text-white">
                Create Stream
              </Button>
              <Button className="rounded-full p-10 py-7">Join Stream</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
