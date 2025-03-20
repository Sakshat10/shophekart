import useGetUserTokenBalance from "../hooks/useGetUserBalance";
import { useAccount } from "wagmi";
import ShowUserBalanceContainer from "./ShowUserBalanceContainer";

export default function ShowUserBalancePresenter() {
	const { address: walletAddress } = useAccount();
	const { cshopBalance, isLoading, isError } =
		useGetUserTokenBalance(walletAddress);

	return (
		<ShowUserBalanceContainer
			userWalletAddress={walletAddress}
			isLoading={isLoading}
			balance={cshopBalance}
			isError={isError}
		/>
	);
}
