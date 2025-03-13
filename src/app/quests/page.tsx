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
      <div className="flex h-screen w-full justify-center items-center">
        <Loader2Icon className="size-10 animate-spin" />
      </div>
    );
  return (
    <div className="relative">
      <div className="mx-auto container px-4 py-10 sm:px-6 lg:px-8 mt-14 quests space-y-4">
        <Header />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Quests />
          </div>
          <div>
            <Leaderboard />
          </div>
        </div>
        {!isConnected && (
          <div className="fixed inset-0 flex justify-center items-center">
            <div className="fixed w-full h-full backdrop-blur"></div>
            <div className="z-10">
              <Login />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
