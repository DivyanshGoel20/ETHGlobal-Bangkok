// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {VennFirewallConsumer} from "@ironblocks/firewall-consumer/contracts/consumers/VennFirewallConsumer.sol";
import {EIP155Signer} from "@oasisprotocol/sapphire-contracts/EIP155Signer.sol";

import {BlackJack} from "./BlackJack.sol";

struct EthereumKeypair {
    address addr;
    bytes32 secret;
    uint64 nonce;
}

// Proxy for gasless transaction.
contract Gasless is VennFirewallConsumer {
    EthereumKeypair private kp;

    BlackJack public blackJack;

    constructor(EthereumKeypair memory keypair, address _blackJack) payable {
        kp = keypair;
        if (msg.value > 0) {
            payable(kp.addr).transfer(msg.value);
        }
        blackJack = BlackJack(payable(_blackJack));
    }

    function setBlackJack(address _blackJack) external firewallProtected {
        blackJack = BlackJack(payable(_blackJack));
    }

    function proxyHit(uint64 nonce) external view returns (bytes memory output) {
        // Call will invoke proxy().
        return EIP155Signer.sign(
            kp.addr,
            kp.secret,
            EIP155Signer.EthTx({
                nonce: nonce,
                gasPrice: 100_000_000_000,
                gasLimit: 250000,
                to: address(blackJack),
                value: 0,
                data: abi.encodeCall(BlackJack.hit, ()),
                chainId: block.chainid
            })
        );
    }

    function proxyStand(uint64 nonce) external view returns (bytes memory output) {
        // Call will invoke proxy().
        return EIP155Signer.sign(
            kp.addr,
            kp.secret,
            EIP155Signer.EthTx({
                nonce: nonce,
                gasPrice: 100_000_000_000,
                gasLimit: 250000,
                to: address(blackJack),
                value: 0,
                data: abi.encodeCall(BlackJack.stand, ()),
                chainId: block.chainid
            })
        );
    }
}
