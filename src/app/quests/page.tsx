"use client";
import { Header } from "@/components/header";
import Leaderboard from "@/components/leaderboard";
import { Loader2Icon } from "lucide-react";
import { useAccount } from "wagmi";
import Login from "../../../pointfi-starter-kit/src/app/(disconnected)/login/page";
import Quests from "../../../pointfi-starter-kit/src/components/quests";

export default function QuestPage() {
  const { isConnected, isConnecting, isReconnecting } = useAccount();
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
