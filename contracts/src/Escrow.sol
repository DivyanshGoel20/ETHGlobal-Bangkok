// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {VennFirewallConsumer} from "@ironblocks/firewall-consumer/contracts/consumers/VennFirewallConsumer.sol";

contract Escrow {
    event Escrow__FundsReceived(address user, uint256 amount);
    event Escrow__FundsDistributed(address user, uint256 amount);

    address public chipToken;

    mapping(address => uint256) public balances;

    constructor(address _chipToken) {
        chipToken = _chipToken;
    }

    function setChipToken(address _chipToken) public {
        chipToken = _chipToken;
    }

    function deposit(uint256 _amount) public {
        ERC20(chipToken).approve(address(this), _amount);

        ERC20(chipToken).transferFrom(msg.sender, address(this), _amount);

        balances[msg.sender] += _amount;

        emit Escrow__FundsReceived(msg.sender, _amount);
    }

    function distributeFunds(uint256 _amount) public firewallProtected {
        ERC20(chipToken).approve(msg.sender, _amount);
        ERC20(chipToken).transfer(msg.sender, _amount);

        balances[msg.sender] -= _amount;

        emit Escrow__FundsDistributed(msg.sender, _amount);
    }
}
