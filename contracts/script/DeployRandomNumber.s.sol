// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";

import {RandomNumber} from "../src/RandomNumber.sol";

contract DeployRandomNumber is Script {
    function run() public returns (address) {
        vm.startBroadcast();
        RandomNumber randomNumber = new RandomNumber();
        vm.stopBroadcast();

        return address(randomNumber);
    }
}
