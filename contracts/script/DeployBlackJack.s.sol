// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";

import {BlackJack} from "../src/BlackJack.sol";

contract DeployBlackJack is Script {
    function run() public returns (address) {
        vm.startBroadcast();
        BlackJack blackJack = new BlackJack();
        vm.stopBroadcast();

        return address(blackJack);
    }
}
