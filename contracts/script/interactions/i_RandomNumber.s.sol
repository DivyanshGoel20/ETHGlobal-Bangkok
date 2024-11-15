// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";

import {RandomNumber} from "../../src/RandomNumber.sol";

import {HelperConfig} from "../HelperConfig.s.sol";

contract GetRandomNumber is Script {
    function getRandomNumber(address randomNumberContract_) public returns (uint256 randomNumber) {
        vm.startBroadcast();
        RandomNumber _randomNumber = RandomNumber(randomNumberContract_);
        randomNumber = _randomNumber.getRandomNumber(bytes("megabyte"));
        vm.stopBroadcast();
    }

    function getRandomNumberUsingConfigs() public {
        HelperConfig helperConfig = new HelperConfig();
        address randomNumberContract = helperConfig.getRandomNumberContract(block.chainid);

        getRandomNumber(randomNumberContract);
    }

    function run() public {
        getRandomNumberUsingConfigs();
    }
}
