"use client";
import { Loader2Icon } from "lucide-react";
import { useAccount } from "wagmi";
import Quests from "../../../pointfi-starter-kit/src/app/(connected)/page";
import Login from "../../../pointfi-starter-kit/src/app/(disconnected)/login/page";
import { Header } from "../../../pointfi-starter-kit/src/components/header";

export default function QuestPage() {
  const { isConnected, isConnecting, isReconnecting } = useAccount();
  if (isConnecting || isReconnecting)
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <Loader2Icon className="size-10 animate-spin" />
      </div>
    );
  return (
    <div className="mx-auto container px-4 py-10 sm:px-6 lg:px-8 mt-14">
      <Header /> {isConnected ? <Quests /> : <Login />}
    </div>
  );
}
