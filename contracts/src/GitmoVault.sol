// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25;

import {IVerifier} from "./IVerifier.sol";
import {StringUtils} from "@zk-email/contracts/utils/StringUtils.sol";

contract GitmoVault {
    IVerifier public verifier;
    mapping(string => uint256) public claimableBalances;

    uint16 private constant packedUsernameLength = 3;
    uint16 private constant packSize = 31;

    event Donated(string indexed username, uint256 indexed value);
    event Claimed(string indexed username, uint256 indexed value);

    constructor(address _verifier) {
        verifier = IVerifier(_verifier);
    }

    function donate(string calldata username) external payable {
        require(bytes(username).length < 40, "GitmoVault: GitHub usernames are limited to 39 characters");

        uint256 donationValue = msg.value;
        require(donationValue > 0, "GitmoVault: donation value must be greater than 0");

        claimableBalances[username] += donationValue;
        emit Donated(username, donationValue);
    }

    function claim(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[4] memory signals
    ) external {
        verifier.verify(a, b, c, signals);
        
        uint[] memory packedUsername = new uint[](packedUsernameLength);
        for (uint i = 0; i < packedUsernameLength; i++) {
            packedUsername[i] = signals[1 + i];
        }
        string memory unpackedUsername = StringUtils.convertPackedBytesToString(packedUsername, packSize * packedUsernameLength, packSize); 

        uint256 claimableBalance = claimableBalances[unpackedUsername];
        require(claimableBalance > 0, "GitmoVault: no claimable balance");

        claimableBalances[unpackedUsername] = 0;
        payable(msg.sender).transfer(claimableBalance);

        emit Claimed(unpackedUsername, claimableBalance);
    }
}
