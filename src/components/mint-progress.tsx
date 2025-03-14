"use client";
import { Progress } from "@/components/ui/progress";
import { GetDropsResponse } from "@liteflow/sdk/dist/client";
import { useMemo } from "react";

export default function MintProgress({
  drop,
}: {
  drop: GetDropsResponse["data"][number];
}) {
  const progress = useMemo(() => {
    if (!drop.supply) return 0;
    return (parseInt(drop.supplyMinted) / drop.supply) * 100;
  }, [drop.supply, drop.supplyMinted]);
  if (!drop.isUserEligible) return null;
  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between text-sm">
        <span>Total Minted</span>
        {drop.supply ? (
          <span>{progress.toFixed(2)}%</span>
        ) : (
          <span>{drop.supplyMinted || 0}</span>
        )}
      </div>
      {drop.supply && <Progress value={progress} className="h-1" />}
    </div>
  );
}
