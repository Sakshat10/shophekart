import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectWalletButton() {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				mounted,
			}) => {
				const ready = mounted;
				const connected = ready && account && chain;

				// Constants
				const CHECK_ICON_SRC = "/icons/greenCheckIcon.svg";
				const CONNECTED_BUTTON_CLASS =
					"text-[#02BC7D] bg-[#E5F9F2] border border-[#02BC7D]";
				const DISCONNECTED_BUTTON_CLASS = "border border-[#022AFF] text-[#022AFF]";

				return (
					<div
						{...(!ready && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<button
										onClick={openConnectModal}
										className={cn(
											"hover:bg-blue-100/50 py-2 px-4 rounded-sm",
											DISCONNECTED_BUTTON_CLASS
										)}
										type="button"
									>
										Connect Wallet
									</button>
								);
							}

							if (chain.unsupported) {
								return (
									<button
										onClick={openChainModal}
										type="button"
									>
										Wrong network
									</button>
								);
							}

							return (
								<button
									onClick={openAccountModal}
									className={cn(
										"hover:bg-blue-100/50 py-2 px-4 rounded-sm",
										CONNECTED_BUTTON_CLASS
									)}
									type="button"
								>
									<div className="flex gap-1 items-center">
										<img
											src={CHECK_ICON_SRC}
											alt="Connected wallet checkmark"
											aria-hidden={true}
										/>
										<span> {account.displayName}</span>
									</div>
								</button>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
}
