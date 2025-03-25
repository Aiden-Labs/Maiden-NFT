"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, PartyPopper } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useClient } from "wagmi";

// Dynamically import react-confetti to avoid SSR issues
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function SuccessModal({
  isOpen,
  setIsOpen,
  txHash,
  chainId,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  txHash?: string;
  chainId: number;
}) {
  const client = useClient({ chainId });
  const chain = useMemo(() => (client ? client.chain : null), [client]);
  const url = useMemo(() => {
    if (!chain?.blockExplorers || !txHash) return null;
    return `${chain.blockExplorers.default.url}/tx/${txHash}`;
  }, [chain, txHash]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-4 text-2xl">
            <PartyPopper className="text-orange-400" />
            Congratulations!
            <PartyPopper className="text-orange-400" />
          </DialogTitle>
        </DialogHeader>

        <p className="text-center text-lg">You successfully minted your NFT</p>
        <DialogFooter>
          {url && (
            <Button variant="outline" asChild>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center gap-2"
              >
                View on Explorer
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
      {isOpen && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
          className="z-50"
        />
      )}
    </Dialog>
  );
}
