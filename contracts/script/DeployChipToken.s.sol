// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";

import {ChipToken} from "../src/ChipToken.sol";

contract DeployChipToken is Script {
    function run() public returns (address) {
        vm.startBroadcast();
        ChipToken chipToken = new ChipToken();
        vm.stopBroadcast();

        return address(chipToken);
    }
}
