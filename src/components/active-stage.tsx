"use client";
import DropStatus from "@/components/drop-status";
import MintProgress from "@/components/mint-progress";
import NumberInput from "@/components/number-input";
import SuccessModal from "@/components/success-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useApproval from "@/hooks/useApproval";
import useMint from "@/hooks/useMint";
import useMintAuthorization from "@/hooks/useMintAuthorization";
import { GetDropsResponse } from "@liteflow/sdk/dist/client";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useCallback, useMemo, useState } from "react";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";

export default function ActiveStage({
  drop,
}: {
  drop: GetDropsResponse["data"][number];
}) {
  const account = useAccount();
  const connect = useConnectModal();
  const [successIsOpen, setSuccessIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const amount = useMemo(
    () => BigInt(drop.price) * BigInt(quantity),
    [drop.price, quantity]
  );
  const approval = useApproval({
    amount,
    chainId: drop.chainId,
    token: drop.currency.address as `0x${string}`,
    spender: drop.collectionAddress as `0x${string}`,
  });
  const mintAuthorization = useMintAuthorization(drop, amount);
  const mint = useMint(drop);

  const handleMint = useCallback(async () => {
    await mint.mutateAsync(quantity);
    setSuccessIsOpen(true);
  }, [mint, quantity]);

  return (
    <Card>
      <CardHeader className="flex flex-col lg:flex-row gap-4 space-y-0">
        <Badge variant="secondary">
          <DropStatus status={drop.status} startDate={drop.startDate} />
        </Badge>
        <MintProgress drop={drop} />
      </CardHeader>
      <CardContent className="space-y-4 flex items-center justify-between">
        <div>
          {BigInt(drop.price) > BigInt(0) ? (
            <div className="space-y-1">
              <span className="text-sm">Price</span>
              <div className="text-2xl font-bold">
                {formatUnits(amount, drop.currency.decimals)}{" "}
                {drop.currency.name}
              </div>
            </div>
          ) : (
            <div className="text-2xl font-bold">Free Mint</div>
          )}
        </div>
        <NumberInput
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={drop.limitPerWallet || drop.supply || undefined}
          step={1}
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {!account.isConnected ? (
          <Button
            size="lg"
            className="w-full"
            onClick={connect.openConnectModal}
          >
            Connect Wallet
          </Button>
        ) : approval.requireAllowance ? (
          <Button
            size="lg"
            className="w-full"
            disabled={approval.approve.isPending}
            onClick={() => approval.approve.mutate()}
          >
            {approval.approve.isPending
              ? "Approving..."
              : `Approve ${drop.currency.name}`}
          </Button>
        ) : (
          <Button
            size="lg"
            className="w-full"
            disabled={
              mint.isPending ||
              mintAuthorization.isLoading ||
              !!mintAuthorization.error
            }
            onClick={handleMint}
          >
            {mint.isPending ? "Minting..." : "Mint"}
          </Button>
        )}
        {mintAuthorization.error && (
          <div className="text-center text-sm text-muted-foreground">
            {mintAuthorization.error}
          </div>
        )}
      </CardFooter>
      <SuccessModal
        isOpen={successIsOpen}
        setIsOpen={setSuccessIsOpen}
        chainId={drop.chainId}
        txHash={mint.data}
      />
    </Card>
  );
}
