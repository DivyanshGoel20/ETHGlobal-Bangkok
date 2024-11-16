// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Utils} from "./Utils.sol";

contract BlackJack is Utils {
    event BlackJack__GameStarted();
    event BlackJack__GameEnded();
    event BlackJack__GameWon();
    event BlackJack__GameLose();
    event BlackJack__FundsReceived(address user, uint256 amount);
    event BlackJack__DeckDistributed();
    event BlackJack__Hit(address user, uint256 handTotal);

    error BlackJack__NotAllowed();
    error BlackJack__ErrorOccured();
    error BlackJack__GameNotActive(uint256 gameId);

    bool public status;
    bool public status_userA;

    address public userA;

    uint256 public totalAmt;
    uint256 public currentShare_userA;

    uint256[] public hand_userA;

    uint256 public firstHand_dealer;
    uint256 private secondHand_dealer;
    uint256[] public remainingHands_dealer;
    uint256 public totalRandomNumberGenerated;
    uint256[] nosGenerated;

    // Will be called by Dealer
    function startGame(address _userA) public {
        status = true;
        userA = _userA;

        distributeDeck();
        emit BlackJack__GameStarted();
    }

    function distributeDeck() public {
        uint256 _randomNo;

        _randomNo = _getRandomNumber();
        firstHand_dealer = _randomNo;
        nosGenerated[0] = _randomNo;

        _randomNo = _doesExist(_getRandomNumber(), nosGenerated);
        hand_userA[0] = _randomNo;
        nosGenerated[1] = _randomNo;

        _randomNo = _doesExist(_getRandomNumber(), nosGenerated);
        secondHand_dealer = _randomNo;
        nosGenerated[2] = _randomNo;

        _randomNo = _doesExist(_getRandomNumber(), nosGenerated);
        hand_userA[1] = _randomNo;
        nosGenerated[3] = _randomNo;

        totalRandomNumberGenerated = 4;

        emit BlackJack__DeckDistributed();
    }

    function hit() public returns (uint256[] memory) {
        if (status_userA) {
            uint256 _randomNo;
            uint256 currentLengthOfHand = hand_userA.length;

            _randomNo = _doesExist(_getRandomNumber(), nosGenerated);
            hand_userA[currentLengthOfHand] = (_randomNo);
            uint256 handTotal = _handTotal(hand_userA);
            nosGenerated[totalRandomNumberGenerated] = _randomNo;

            if (handTotal < 21) {
                emit BlackJack__Hit(msg.sender, handTotal);
            } else if (_handTotal(hand_userA) == 21) {
                uint256 winningAmt = (currentShare_userA * 150) / 100;

                (bool success,) = (msg.sender).call{value: winningAmt}("");
                if (!success) {
                    revert BlackJack__ErrorOccured();
                }
                status_userA = false;
                emit BlackJack__GameEnded();
            } else {
                status_userA = false;
                emit BlackJack__GameLose();
            }
            totalRandomNumberGenerated++;
            return hand_userA;
        } else {
            uint256 initialTotal = firstHand_dealer + secondHand_dealer;
            uint256[] memory initial_dealer = new uint256[](2);

            initial_dealer[0] = firstHand_dealer;
            initial_dealer[1] = secondHand_dealer;

            uint256 handTotal_dealer = _handTotal(remainingHands_dealer);
            uint256 handTotal_userA = _handTotal(hand_userA);

            if (initialTotal > 21) {
                uint256 winningAmt_userA = (currentShare_userA * 2);
                (bool success,) = (msg.sender).call{value: winningAmt_userA}("");
                if (!success) {
                    revert BlackJack__ErrorOccured();
                }
                emit BlackJack__GameWon();
                emit BlackJack__GameEnded();

                return initial_dealer;
            } else if (initialTotal < 21 && initialTotal > handTotal_userA) {
                emit BlackJack__GameLose();
                emit BlackJack__GameEnded();
                return initial_dealer;
            }
            while (initialTotal + handTotal_dealer < 21 && initialTotal + handTotal_dealer < handTotal_userA) {
                uint256 _randomNo;
                uint256 currentLengthOfHand = remainingHands_dealer.length;
                _randomNo = _doesExist(_getRandomNumber(), nosGenerated);
                remainingHands_dealer[currentLengthOfHand] = (_randomNo);
                nosGenerated[totalRandomNumberGenerated] = _randomNo;

                totalRandomNumberGenerated++;
                handTotal_dealer = _handTotal(remainingHands_dealer);

                emit BlackJack__Hit(msg.sender, initialTotal + handTotal_dealer);
            }
            if (initialTotal + handTotal_dealer > 21) {
                emit BlackJack__GameWon();
                emit BlackJack__GameEnded();
            } else if (initialTotal + handTotal_dealer > handTotal_userA) {
                emit BlackJack__GameLose();
                emit BlackJack__GameEnded();
            }

            return remainingHands_dealer;
        }
    }

    function stand() public {
        status_userA = false;
    }

    function _doesExist(uint256 no, uint256[] memory _nosGenerated) internal view returns (uint256) {
        uint256 length = _nosGenerated.length;
        for (uint256 i = 0; i < length; i++) {
            if (_nosGenerated[i] == no) {
                return _getRandomNumber();
            } else {
                return no;
            }
        }
        return no;
    }

    function _handTotal(uint256[] memory userHand) internal pure returns (uint256) {
        uint256 length = userHand.length;
        uint256 _total;
        for (uint256 i = 0; i < length; i++) {
            if (userHand[i] % 13 == 0) {
                _total += 11;
            } else if (userHand[i] % 13 > 10) {
                _total += 10;
            } else {
                _total += (userHand[i] % 13) + 1;
            }
        }

        return _total;
    }

    function clear() public {
        delete status;
        delete status_userA;
        delete userA;
        delete totalAmt;
        delete currentShare_userA;
        delete hand_userA;
        delete firstHand_dealer;

        delete secondHand_dealer;
        delete remainingHands_dealer;
        delete totalRandomNumberGenerated;
        delete nosGenerated;
    }

    receive() external payable {}

    fallback() external payable {
        uint256 amtReceived = msg.value;
        address user = msg.sender;

        currentShare_userA += amtReceived;

        emit BlackJack__FundsReceived(user, amtReceived);
    }
}
