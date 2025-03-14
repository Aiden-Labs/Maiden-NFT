import { GetDropsResponse } from "@liteflow/sdk/dist/client";
import { useMemo } from "react";
import { erc20Abi } from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";

export default function useMintAuthorization(
  drop: GetDropsResponse["data"][number],
  amount: bigint
) {
  const account = useAccount();
  const nativeBalance = useBalance({
    chainId: drop.chainId,
    address: account.address,
    query: {
      enabled:
        account.isConnected &&
        !drop.currency.address &&
        BigInt(drop.price) > BigInt(0),
    },
  });
  const tokenBalance = useReadContract({
    abi: erc20Abi,
    account: account.address,
    chainId: drop.currency.chainId,
    address: drop.currency.address! as `0x${string}`,
    args: [account.address!],
    functionName: "balanceOf",
    query: {
      enabled:
        account.isConnected &&
        !!drop.currency.address &&
        BigInt(drop.price) > BigInt(0),
    },
  });

  const isLoading = useMemo(
    () => nativeBalance.isLoading || tokenBalance.isLoading,
    [nativeBalance.isLoading, tokenBalance.isLoading]
  );

  const hasBalance = useMemo(() => {
    if (isLoading) return false;
    if (BigInt(drop.price) === BigInt(0)) return true;
    if (!drop.currency.address) {
      if (nativeBalance.data === undefined) return true;
      return nativeBalance.data.value >= amount;
    }
    if (tokenBalance.data === undefined) return true;
    return tokenBalance.data >= amount;
  }, [
    isLoading,
    amount,
    nativeBalance.data,
    tokenBalance.data,
    drop.currency.address,
    drop.price,
  ]);

  const isAuthorized = useMemo(() => {
    return hasBalance && drop.isUserEligible;
  }, [hasBalance, drop.isUserEligible]);

  const error = useMemo(() => {
    if (isLoading) return null;
    if (!account.isConnected) return "Please connect your wallet";
    if (!hasBalance) return "Insufficient balance";
    if (!drop.isUserEligible) return "You are not eligible";
    return null;
  }, [account.isConnected, hasBalance, drop.isUserEligible, isLoading]);

  return {
    isLoading,
    data: isAuthorized,
    error,
  };
}
