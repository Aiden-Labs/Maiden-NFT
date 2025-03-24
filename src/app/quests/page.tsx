"use client";
import { Header } from "@/components/header";
import Leaderboard from "@/components/leaderboard";
import { leaderboardPositionQueryKey } from "@/hooks/useLeaderboardPosition";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useAccount } from "wagmi";
import Login from "../../../pointfi-starter-kit/src/app/(disconnected)/login/page";
import Quests from "../../../pointfi-starter-kit/src/components/quests";

export default function QuestPage() {
  const searchParams = useSearchParams();
  const { isConnected, isConnecting, isReconnecting, address } = useAccount();
  const questId = useMemo(() => searchParams.get("ref"), [searchParams]);
  const queryClient = useQueryClient();
  const { mutate: createReferralAchievement } = useMutation({
    mutationFn: async ({ address }: { address: string }) => {
      const response = await fetch(`/quests/${questId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      if (!response.ok) throw new Error("Failed to create achievement");
      await queryClient.invalidateQueries({
        queryKey: leaderboardPositionQueryKey(address),
      });
      return response;
    },
  });

  useEffect(() => {
    if (!questId) return;
    if (!isConnected) return;
    if (!address) return;
    void createReferralAchievement({ address });
  }, [questId, isConnected, createReferralAchievement, address]);

  if (isConnecting || isReconnecting)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2Icon className="size-10 animate-spin" />
      </div>
    );
  return (
    <div className="relative">
      <div className="quests container mx-auto mt-14 space-y-4 px-4 py-10 sm:px-6 lg:px-8">
        <Header />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Quests />
          </div>
          <div>
            <Leaderboard />
          </div>
        </div>
        {!isConnected && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed h-full w-full backdrop-blur"></div>
            <div className="z-10">
              <Login />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
