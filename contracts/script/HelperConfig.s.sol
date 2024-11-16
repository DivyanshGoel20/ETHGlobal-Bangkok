// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

contract HelperConfig is Script {
    function getBlackJack(uint256 _chainId) public view returns (address) {
        address blackJack = DevOpsTools.get_most_recent_deployment("BlackJack", block.chainid);
        return blackJack;
    }

    function getKeyPair(string memory userId) public view {}
}
