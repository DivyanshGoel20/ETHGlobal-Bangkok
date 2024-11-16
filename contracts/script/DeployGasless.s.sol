// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";

import {HelperConfig} from "./HelperConfig.s.sol";
import {Gasless} from "../src/Gasless.sol";

contract DeployGasless is Script {
    function deployGasless(address _blackjack) public {
        vm.startBroadcast();
        Gasless gasless = new Gasless();
        vm.stopBroadcast();
    }

    function deployGaslessUsingConfig() public {
        HelperConfig helperConfig = new HelperConfig();
        address blackJack = helperConfig.getBlackJack(block.chainid);

        deployGasless(blackJack);
    }

    function run() public {
        deployGaslessUsingConfig();
    }
}
