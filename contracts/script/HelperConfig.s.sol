// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

contract HelperConfig is Script {
    function getRandomNumberContract(uint256 chainId_) public view returns (address) {
        address randomNumberContract = DevOpsTools.get_most_recent_deployment("RandomNumber", chainId_);

        return randomNumberContract;
    }
}
