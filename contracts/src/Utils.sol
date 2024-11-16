// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@oasisprotocol/sapphire-contracts/Sapphire.sol";

contract Utils {
    function _getRandomNumber() internal view returns (uint256 randomNumber) {
        bytes memory seed = Sapphire.randomBytes(32, bytes("twenty-one"));
        randomNumber = uint256(keccak256(abi.encodePacked(msg.sender, seed))) % 52;
    }
}
