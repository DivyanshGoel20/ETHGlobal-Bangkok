// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@oasisprotocol/sapphire-contracts/Sapphire.sol";

contract RandomNumber {
    function getRandomNumber(bytes memory initialSeed_) public view returns (uint256 randomNumber) {
        bytes memory seed = Sapphire.randomBytes(32, initialSeed_);
        randomNumber = uint256(keccak256(abi.encodePacked(msg.sender, seed))) % 100;
    }
}
