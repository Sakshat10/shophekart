import { useWriteContract } from "wagmi";
import { config } from "@/config/wagmi";
import CONTRACT_CONFIG from "@/constants/contract-config";
import { parseEther } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";

export default function useApproveTokenTransaction() {
	const { writeContractAsync, ...props } = useWriteContract({ config });

	async function approveTokenTransaction(
		token: string,
		amount: number,
		sender: `0x${string}` = CONTRACT_CONFIG.marketplace.address
	) {
		const hash = await writeContractAsync({
			...CONTRACT_CONFIG[token],
			functionName: "approve",
			args: [sender, parseEther(amount.toString())],
		});

		await waitForTransactionReceipt(config, { hash });
	}
	return { approveTokenTransaction, ...props };
}
