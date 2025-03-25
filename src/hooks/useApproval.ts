import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { erc20Abi, getAddress } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import {
  useAccount,
  useClient,
  useReadContracts,
  useSwitchChain,
  useWriteContract,
} from "wagmi";

export default function useApproval({
  amount,
  chainId,
  token,
  spender,
}: {
  chainId: number;
  token: string | null;
  spender: string;
  amount: bigint;
}) {
  const account = useAccount();
  const data = useReadContracts({
    query: {
      enabled: !!account.address && !!token,
    },
    contracts:
      !!account.address && !!token
        ? [
            {
              abi: erc20Abi,
              chainId,
              address: getAddress(token),
              functionName: "balanceOf",
              args: [account.address],
            },
            {
              abi: erc20Abi,
              chainId: chainId,
              address: getAddress(token),
              functionName: "allowance",
              args: [account.address, getAddress(spender)],
            },
          ]
        : undefined,
  });
  const [balance, allowance] = useMemo(() => data.data || [], [data.data]);

  const requireAllowance = useMemo(() => {
    if (token === null) return false;
    if (allowance?.result === undefined) return true;
    return allowance.result < amount;
  }, [token, allowance, amount]);
  const client = useClient({ chainId });
  const chain = useSwitchChain();

  const approveTx = useWriteContract();
  const approve = useMutation({
    mutationFn: async () => {
      if (!client) throw new Error("Client not found");
      if (!token) throw new Error("Cannot approve native token");
      await chain.switchChainAsync({ chainId });
      const hash = await approveTx.writeContractAsync({
        chainId: chainId,
        abi: erc20Abi,
        address: getAddress(token),
        functionName: "approve",
        args: [getAddress(spender), amount],
      });
      await waitForTransactionReceipt(client, { hash });
      await data.refetch();
    },
  });

  return {
    approve,
    requireAllowance,
    balance,
    allowance,
  };
}
