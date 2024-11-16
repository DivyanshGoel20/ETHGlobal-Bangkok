// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@oasisprotocol/sapphire-contracts/Sapphire.sol";

contract Utils {
    address public constant CADENCE_ARCH = 0x0000000000000000000000010000000000000001;

    function _getRandomNumber() internal view returns (uint64 randomNumber) {
        return revertibleRandom();
    }

    function revertibleRandom() public view returns (uint64) {
        // Static call to the Cadence Arch contract's revertibleRandom function
        (bool ok, bytes memory data) = CADENCE_ARCH.staticcall(abi.encodeWithSignature("revertibleRandom()"));
        require(ok, "Failed to fetch a random number through Cadence Arch");
        uint64 output = abi.decode(data, (uint64));

        uint64 max = 51;
        uint64 min = 0;

        // Return the random value
        return (output % (max + 1 - min)) + min;
    }
}
