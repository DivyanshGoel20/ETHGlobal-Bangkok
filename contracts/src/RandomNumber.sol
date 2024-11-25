// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {IEntropy} from "node_modules/@pythnetwork/entropy-sdk-solidity/IEntropy.sol";
import {IEntropyConsumer} from "node_modules/@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";

contract RandomNumber {
    event RandomNumberReceived(bytes32 randomNumber);

    address public immutable i_entropy;

    IEntropy entropy;

    constructor(address entropy_) {
        i_entropy = entropy_;
        entropy = IEntropy(entropy_);
    }

    function getEntropy() internal view returns (address) {
        return address(entropy);
    }

    function requestRandomNumber(bytes32 _input) public returns (uint64) {
        address provider = entropy.getDefaultProvider();

        uint256 fee = entropy.getFee(provider);
        uint64 sequenceNumber = entropy.requestWithCallback{value: fee}(provider, _input);

        return sequenceNumber;
    }

    function entropyCallback(
        uint64 sequenceNumber,
        // If your app uses multiple providers, you can use this argument to
        // distinguish which one is calling the app back.
        address provider,
        bytes32 randomNumber
    ) internal {
        // Implement your callback logic here.

        emit RandomNumberReceived(randomNumber);
    }
}
