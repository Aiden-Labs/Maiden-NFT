"use client";
import DropStatus from "@/components/drop-status";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GetDropsResponse } from "@liteflow/sdk/dist/client";
import { CheckIcon, LockIcon, XIcon } from "lucide-react";
import { formatUnits } from "viem";

export default function MintStage({
  drop,
  selected,
}: {
  drop: GetDropsResponse["data"][number];
  selected: boolean;
}) {
  return (
    <Card key={drop.id} className={cn(selected && "border-primary")}>
      <CardHeader>
        <CardTitle className="flex flex-col items-start justify-start md:flex-row md:items-center md:justify-between">
          <Badge variant="secondary">
            {drop.hasAllowList && <LockIcon className="mr-1.5 size-3" />}
            {drop.name}
          </Badge>
          <DropStatus
            status={drop.status}
            startDate={drop.startDate}
            className="text-sm text-muted-foreground"
          />
        </CardTitle>
        <CardDescription>
          {drop.hasAllowList && (
            <span>
              {drop.isUserEligible ? (
                <CheckIcon className="inline-block size-3 text-green-500" />
              ) : (
                <XIcon className="inline-block size-3 text-red-500" />
              )}{" "}
              Allowlist -{" "}
            </span>
          )}
          {drop.limitPerWallet && (
            <span>{drop.limitPerWallet} per wallet - </span>
          )}
          {BigInt(drop.price) > BigInt(0) ? (
            <span>
              Price {formatUnits(BigInt(drop.price), drop.currency.decimals)}{" "}
              {drop.currency.name}
            </span>
          ) : (
            <span>Free Mint</span>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
