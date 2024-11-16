import { create } from 'zustand';


type Card = {
  value: string;
  suit?: "♣" | "♠" | "♥" | "♦";
  faceDown?: boolean;
};


interface PlayerCardStore {
  cards: Card[];
  newCard: (card: Card) => void;
}

const usePlayerCardStore = create<PlayerCardStore>((set) => ({
  cards: [{ value: "3", faceDown: true, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "", faceDown: true }],
  newCard: (card: Card) =>
    set((state) => ({
      cards: [...state.cards, card], 
    })),
}));

interface DealerCardStore {
  cards: Card[];
  newCard: (card: Card) => void;
}

const useDealerCardStore = create<DealerCardStore>((set) => ({
  cards: [{ value: "3", faceDown: false, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "3", faceDown: false, suit:"♥" },{ value: "", faceDown: true }], // Initial state
  newCard: (card: Card) =>
    set((state) => ({
      cards: [...state.cards, card], // Safely add the new card
    })),
}));


interface BlackjackStore {
  walletAmount: number;
  amountStaked: number;
  potentialWin: number;
  potentialLoss: number;
  setStake: (stake: number) => void;
  updateWallet: (amount: number) => void;
  resetStake: () => void;
}

const useBlackjackStore = create<BlackjackStore>((set) => ({
  walletAmount: 1000, // Initial wallet amount
  amountStaked: 0,
  potentialWin: 0,
  potentialLoss: 0,
  setStake: (stake: number) =>
    set((state) => ({
      amountStaked: stake,
      potentialWin: stake * 0.5, // Example: Winning 50% of the stake
      potentialLoss: stake,
    })),
  updateWallet: (amount: number) =>
    set((state) => ({
      walletAmount: state.walletAmount + amount,
    })),
  resetStake: () =>
    set({
      amountStaked: 0,
      potentialWin: 0,
      potentialLoss: 0,
    }),
}));

export {useDealerCardStore, usePlayerCardStore, useBlackjackStore};

