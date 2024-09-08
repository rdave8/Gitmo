"use client"
import { useState } from 'react';

const DonatePage = ({
    params: { githubId }
}: {
    params: { githubId: string }
}) => {
  const  username = githubId

  const [donationAmount, setDonationAmount] = useState('');
  const [token, setToken] = useState('ETH'); // Default to ETH

  const handleDonate = () => {
    // Handle the donation logic here
    alert(`Donating ${donationAmount} ${token} to ${username}`);
  };

  const handleClaimDonations = () => {
    // Handle claiming donations logic here
    alert(`Claiming donations for ${username}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Navigation bar */}
      <header className="w-full bg-white py-4 shadow-md flex justify-between px-8">
        <div className="font-bold text-lg">Donate to Profile</div>
        <div>
          <button className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500">Create</button>
          <button className="ml-4 bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200">List of people</button>
        </div>
      </header>

      {/* Profile donation info */}
      <div className="flex flex-col items-center mt-12 w-full max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Donate to Profile</p>
            <h2 className="text-2xl font-bold mt-2">{username}</h2>
            <p className="text-blue-500 hover:underline cursor-pointer">
              <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">{username}</a>
            </p>
            <p className="text-lg font-bold mt-4">4 ETH</p>
            <p className="text-gray-500 text-sm">Unclaimed</p>
            <p className="text-gray-400 text-sm">Last donated by 4 minutes ago</p>

            {/* Claim donations button */}
            <div className="mt-6">
              <p className="text-gray-600">Do you own the following Github account?</p>
              <button
                onClick={handleClaimDonations}
                className="mt-4 bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Yes, and I’d like to claim the donations
              </button>
            </div>
          </div>
        </div>

        {/* Donation form */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full mt-8">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-semibold">Donation Amount</label>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                placeholder="0.005"
                className="w-full px-3 py-2 border border-gray-300 rounded mt-2"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-semibold">Token</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ETH"
                className="w-full px-3 py-2 border border-gray-300 rounded mt-2"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleDonate}
              className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500"
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
