// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";
import {ChipToken} from "../../src/ChipToken.sol";

contract SendFunds is Script {
    function run() public {
        vm.startBroadcast();
        uint256 amount = 1000e18;
        ChipToken chipToken = ChipToken(0x6C27b8604e7DAe0D7e319a9C45006BAd71EaB7a9);
        chipToken.mint(0x7d4a0E3c64d8740b01527218624393fB948195F2, amount);
        vm.stopBroadcast();
    }
}
