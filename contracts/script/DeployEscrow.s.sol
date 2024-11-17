// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";

import {HelperConfig} from "./HelperConfig.s.sol";

import {Escrow} from "../src/Escrow.sol";

contract DeployEscrow is Script {
    function deployEscrow(address _chipToken) public returns (address) {
        vm.startBroadcast();

        Escrow escrow = new Escrow(_chipToken);
        vm.stopBroadcast();

        return address(escrow);
    }

    function deployEscrowUsingConfigs() public {
        HelperConfig helperConfig = new HelperConfig();

        address chipToken = helperConfig.getChipToken(block.chainid);

        deployEscrow(chipToken);
    }

    function run() public {
        deployEscrowUsingConfigs();
    }
}
