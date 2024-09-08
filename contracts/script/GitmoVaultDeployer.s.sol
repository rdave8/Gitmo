// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25;

import {Script} from "forge-std/src/Script.sol";
import {GitmoVault} from "../src/GitmoVault.sol";

contract GitmoVaultDeployer is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address verifierAddress = vm.envAddress("VERIFIER_ADDRESS");
        vm.startBroadcast(deployerPrivateKey);

        GitmoVault gitmoVault = new GitmoVault(verifierAddress);

        vm.stopBroadcast();
    }
}
