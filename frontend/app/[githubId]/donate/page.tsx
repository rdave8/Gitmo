"use client";
import { useState, useEffect } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useContractRead,
  useContractWrite,
  //useWaitForTransaction,
} from "wagmi";
import { formatEther, parseEther } from "viem";
import GitmoVaultABI from "../../constants/abis/GitmoVault.json";
import { walletConnect } from "wagmi/connectors";

const GITMO_VAULT_ADDRESS = "0xd1eD05cAF3F6ae6FF7d0eD10c330427b988E4Ea8";
const PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const DonatePage = ({
  params: { githubId },
}: {
  params: { githubId: string };
}) => {
  const username = githubId;
  const [donationAmount, setDonationAmount] = useState("");
  const { address, isConnected } = useAccount();

  const { connect } = useConnect({
    connector: walletConnect({
      projectId: PROJECT_ID!,
    }),
  });
  const { disconnect } = useDisconnect();

  const { data: claimableBalance = "0", refetch: refetchClaimableBalance } =
    useContractRead({
      address: GITMO_VAULT_ADDRESS,
      abi: GitmoVaultABI,
      functionName: "claimableBalances",
      args: [username],
    }) as { data: bigint; refetch: () => void };

  const { write: donate, data: donationData } = useContractWrite({
    address: GITMO_VAULT_ADDRESS,
    abi: GitmoVaultABI,
    functionName: "donate",
  });

  /*
  const { isLoading: isDonating, isSuccess: isDonationSuccess } =
    useWaitForTransaction({
      hash: donationData,
    });

  useEffect(() => {
    if (isDonationSuccess) {
      alert(`Successfully donated ${donationAmount} ETH to ${username}`);
      refetchClaimableBalance();
    }
  }, [isDonationSuccess, donationAmount, username]);*/

  const handleDonate = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }
    await donate({
      args: [username],
      value: parseEther(donationAmount),
    });
  };

  const handleClaimDonations = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }
    // Note: The claim function requires additional parameters for ZK proof.
    // This is a simplified version and won't work without the proper ZK proof implementation.
    alert(
      "Claiming donations requires ZK proof implementation. This is not implemented in this example."
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <header className="w-full bg-white py-4 shadow-md flex justify-between px-8">
        <div className="font-bold text-lg">Donate to Profile</div>
        <div>
          {!isConnected ? (
            <button
              onClick={() => connect()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Connect Wallet
            </button>
          ) : (
            <button
              onClick={() => disconnect()}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Disconnect Wallet
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-col items-center mt-12 w-full max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Donate to Profile</p>
            <h2 className="text-2xl font-bold mt-2">{username}</h2>
            <p className="text-blue-500 hover:underline cursor-pointer">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {username}
              </a>
            </p>
            <p className="text-lg font-bold mt-4">
              {formatEther(claimableBalance)} ETH
            </p>

            <p className="text-gray-500 text-sm">Unclaimed</p>

            <div className="mt-6">
              <p className="text-gray-600">
                Do you own the following Github account?
              </p>
              <button
                onClick={handleClaimDonations}
                className="mt-4 bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Yes, and I'd like to claim the donations
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-full mt-8">
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-semibold">
              Donation Amount (ETH)
            </label>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              placeholder="0.005"
              className="w-full px-3 py-2 border border-gray-300 rounded mt-2"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleDonate}
              className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500"
              disabled={!isConnected}
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
