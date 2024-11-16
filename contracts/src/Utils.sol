// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@oasisprotocol/sapphire-contracts/Sapphire.sol";

contract Utils {
    uint256[] deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    function _getRandomNumber() internal view returns (uint256 randomNumber) {
        bytes memory seed = Sapphire.randomBytes(32, bytes("twenty-one"));
        randomNumber = uint256(keccak256(abi.encodePacked(msg.sender, seed))) % 52;
    }
}
