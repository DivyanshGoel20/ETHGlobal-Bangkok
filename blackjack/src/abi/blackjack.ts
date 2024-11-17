import { Contract } from "../utils/transactions";

const BLACJACK_CONTRACT: Contract = {
    // address: "0xAFD9f5c7c00A9e225f3f5aAD492bEbdeb31E0BB5",
    address: "0xF3451c19a70852533C3416E76e229E15166d5F33",//flow
    abi: [
        {
            "type": "fallback",
            "stateMutability": "payable"
        },
        {
            "type": "receive",
            "stateMutability": "payable"
        },
        {
            "type": "function",
            "name": "clear",
            "inputs": [],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "currentShare_userA",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "distributeDeck",
            "inputs": [],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "firstHand_dealer",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "hand_userA",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "hit",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256[]",
                    "internalType": "uint256[]"
                }
            ],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "remainingHands_dealer",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "stand",
            "inputs": [],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "startGame",
            "inputs": [
                {
                    "name": "_userA",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
        },
        {
            "type": "function",
            "name": "status",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "bool",
                    "internalType": "bool"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "status_userA",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "bool",
                    "internalType": "bool"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "totalAmt",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "totalRandomNumberGenerated",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "userA",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "event",
            "name": "BlackJack__DeckDistributed",
            "inputs": [],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "BlackJack__FundsReceived",
            "inputs": [
                {
                    "name": "user",
                    "type": "address",
                    "indexed": false,
                    "internalType": "address"
                },
                {
                    "name": "amount",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                }
            ],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "BlackJack__GameEnded",
            "inputs": [],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "BlackJack__GameLose",
            "inputs": [],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "BlackJack__GameStarted",
            "inputs": [],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "BlackJack__GameWon",
            "inputs": [],
            "anonymous": false
        },
        {
            "type": "event",
            "name": "BlackJack__Hit",
            "inputs": [
                {
                    "name": "user",
                    "type": "address",
                    "indexed": false,
                    "internalType": "address"
                },
                {
                    "name": "handTotal",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                }
            ],
            "anonymous": false
        },
        {
            "type": "error",
            "name": "BlackJack__ErrorOccured",
            "inputs": []
        },
        {
            "type": "error",
            "name": "BlackJack__GameNotActive",
            "inputs": [
                {
                    "name": "gameId",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ]
        },
        {
            "type": "error",
            "name": "BlackJack__NotAllowed",
            "inputs": []
        }
    ]
}

export default BLACJACK_CONTRACT;