export type Card = {
    value: string;
    suit: "♣" | "♠" | "♥" | "♦";
    faceDown?: boolean;
};

const deck: Card[] = [
    // Clubs
    { value: "2", suit: "♣" }, { value: "3", suit: "♣" }, { value: "4", suit: "♣" },
    { value: "5", suit: "♣" }, { value: "6", suit: "♣" }, { value: "7", suit: "♣" },
    { value: "8", suit: "♣" }, { value: "9", suit: "♣" }, { value: "10", suit: "♣" },
    { value: "J", suit: "♣" }, { value: "Q", suit: "♣" }, { value: "K", suit: "♣" },
    { value: "A", suit: "♣" },

    // Spades
    { value: "2", suit: "♠" }, { value: "3", suit: "♠" }, { value: "4", suit: "♠" },
    { value: "5", suit: "♠" }, { value: "6", suit: "♠" }, { value: "7", suit: "♠" },
    { value: "8", suit: "♠" }, { value: "9", suit: "♠" }, { value: "10", suit: "♠" },
    { value: "J", suit: "♠" }, { value: "Q", suit: "♠" }, { value: "K", suit: "♠" },
    { value: "A", suit: "♠" },

    // Hearts
    { value: "2", suit: "♥" }, { value: "3", suit: "♥" }, { value: "4", suit: "♥" },
    { value: "5", suit: "♥" }, { value: "6", suit: "♥" }, { value: "7", suit: "♥" },
    { value: "8", suit: "♥" }, { value: "9", suit: "♥" }, { value: "10", suit: "♥" },
    { value: "J", suit: "♥" }, { value: "Q", suit: "♥" }, { value: "K", suit: "♥" },
    { value: "A", suit: "♥" },

    // Diamonds
    { value: "2", suit: "♦" }, { value: "3", suit: "♦" }, { value: "4", suit: "♦" },
    { value: "5", suit: "♦" }, { value: "6", suit: "♦" }, { value: "7", suit: "♦" },
    { value: "8", suit: "♦" }, { value: "9", suit: "♦" }, { value: "10", suit: "♦" },
    { value: "J", suit: "♦" }, { value: "Q", suit: "♦" }, { value: "K", suit: "♦" },
    { value: "A", suit: "♦" },
];

export default deck;