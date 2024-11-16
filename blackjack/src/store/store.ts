// import { create } from 'zustand';


// type Card = {
//   value: string;
//   suit?: "♣" | "♠" | "♥" | "♦";
//   faceDown?: boolean;
// };


// interface PlayerCardStore {
//   cards: Card[];
//   newCard: (card: Card) => void;
// }

// const usePlayerCardStore = create<PlayerCardStore>((set) => ({
//   cards: [],
//   newCard: (card: Card) =>
//     set((state) => ({
//       cards: [...state.cards, card], 
//     })),
// }));

// interface DealerCardStore {
//   cards: Card[];
//   newCard: (card: Card) => void;
// }

// const useDealerCardStore = create<DealerCardStore>((set) => ({
//   cards: [], // Initial state
//   newCard: (card: Card) =>
//     set((state) => ({
//       cards: [...state.cards, card], // Safely add the new card
//     })),
// }));


// interface BlackjackStore {
//   walletAmount: number;
//   amountStaked: number;
//   potentialWin: number;
//   potentialLoss: number;
//   setStake: (stake: number) => void;
//   updateWallet: (amount: number) => void;
//   resetStake: () => void;
// }

// const useBlackjackStore = create<BlackjackStore>((set) => ({
//   walletAmount: 1000, // Initial wallet amount
//   amountStaked: 0,
//   potentialWin: 0,
//   potentialLoss: 0,
//   setStake: (stake: number) =>
//     // @ts-ignore
//     set((state) => ({
//       amountStaked: stake,
//       potentialWin: stake * 0.5, // Example: Winning 50% of the stake
//       potentialLoss: stake,
//     })),
//   updateWallet: (amount: number) =>
//     set((state) => ({
//       walletAmount: state.walletAmount + amount,
//     })),
//   resetStake: () =>
//     set({
//       amountStaked: 0,
//       potentialWin: 0,
//       potentialLoss: 0,
//     }),
// }));

// export {useDealerCardStore, usePlayerCardStore, useBlackjackStore};

import { create } from 'zustand';

type Card = {
  value: string;
  suit?: "♣" | "♠" | "♥" | "♦";
  faceDown?: boolean;
};

interface PlayerCardStore {
  cards: Card[];
  newCard: (card: Card) => void;
  setCards: (cards: Card[]) => void;  // Added method
  reset: () => void;
}

const usePlayerCardStore = create<PlayerCardStore>((set) => ({
  cards: [],
  newCard: (card: Card) =>
    set((state) => ({
      cards: [...state.cards, card],
    })),
  setCards: (cards: Card[]) =>
    set(() => ({
      cards: cards,
    })),
  reset: () =>
    set({
      cards: [],
    }),
}));

interface DealerCardStore {
  cards: Card[];
  newCard: (card: Card) => void;
  setCards: (cards: Card[]) => void;  // Added method
  reset: () => void;
}

const useDealerCardStore = create<DealerCardStore>((set) => ({
  cards: [],
  newCard: (card: Card) =>
    set((state) => ({
      cards: [...state.cards, card],
    })),
  setCards: (cards: Card[]) =>
    set(() => ({
      cards: cards,
    })),
  reset: () =>
    set({
      cards: [],
    }),
}));

interface GameState {
  status: 'initial' | 'playing' | 'playerTurn' | 'dealerTurn' | 'ended';
  result: '' | 'player' | 'dealer' | 'tie';
}

interface BlackjackStore {
  walletAmount: number;
  amountStaked: number;
  potentialWin: number;
  potentialLoss: number;
  gameState: GameState;
  setStake: (stake: number) => void;
  updateWallet: (amount: number) => void;
  resetStake: () => void;
  handleWin: () => void;
  handleLoss: () => void;
  handleTie: () => void;  // Added method
  setGameState: (state: Partial<GameState>) => void;  // Added method
  resetGame: () => void;  // Added method
}

const useBlackjackStore = create<BlackjackStore>((set) => ({
  walletAmount: 1000,
  amountStaked: 0,
  potentialWin: 0,
  potentialLoss: 0,
  gameState: {
    status: 'initial',
    result: '',
  },
  setStake: (stake: number) =>
    set((state) => ({
      amountStaked: stake,
      potentialWin: stake * 2,
      potentialLoss: stake,
      gameState: { ...state.gameState, status: 'playing' },
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
  handleWin: () =>
    set((state) => ({
      walletAmount: state.walletAmount + state.potentialWin,
      gameState: { ...state.gameState, result: 'player', status: 'ended' },
    })),
  handleLoss: () =>
    set((state) => ({
      walletAmount: state.walletAmount - state.amountStaked,
      gameState: { ...state.gameState, result: 'dealer', status: 'ended' },
    })),
  handleTie: () =>
    set((state) => ({
      walletAmount: state.walletAmount + state.amountStaked, // Return the stake
      gameState: { ...state.gameState, result: 'tie', status: 'ended' },
    })),
  setGameState: (newState: Partial<GameState>) =>
    set((state) => ({
      gameState: { ...state.gameState, ...newState },
    })),
  resetGame: () =>
    // @ts-ignore
    set((state) => ({
      gameState: { status: 'initial', result: '' },
      amountStaked: 0,
      potentialWin: 0,
      potentialLoss: 0,
    })),
}));

export { useDealerCardStore, usePlayerCardStore, useBlackjackStore };
export type { GameState, Card };

