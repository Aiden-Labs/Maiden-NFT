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
    query: { enabled: account.isConnected && !drop.currency.address },
  });
  const tokenBalance = useReadContract({
    abi: erc20Abi,
    account: account.address,
    chainId: drop.currency.chainId,
    address: drop.currency.address! as `0x${string}`,
    args: [account.address!],
    functionName: "balanceOf",
    query: { enabled: account.isConnected && !!drop.currency.address },
  });

  const isLoading = useMemo(
    () => nativeBalance.isLoading || tokenBalance.isLoading,
    [nativeBalance.isLoading, tokenBalance.isLoading]
  );

  const hasBalance = useMemo(() => {
    if (!drop.currency.address) {
      if (!nativeBalance.data) return false;
      return nativeBalance.data.value >= amount;
    }
    if (!tokenBalance.data) return false;
    return tokenBalance.data >= amount;
  }, [amount, nativeBalance.data, tokenBalance.data, drop.currency.address]);

  const isAuthorized = useMemo(() => {
    return hasBalance && drop.isUserEligible;
  }, [hasBalance, drop.isUserEligible]);

  const error = useMemo(() => {
    if (isLoading) return null;
    if (!account.isConnected) return "Please connect your wallet";
    if (!drop.isUserEligible) return "You are not eligible";
    if (!hasBalance) return "Insufficient balance";
    return null;
  }, [account.isConnected, hasBalance, drop.isUserEligible, isLoading]);

  return {
    isLoading,
    data: isAuthorized,
    error,
  };
}
