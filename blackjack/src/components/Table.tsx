// import { useEffect, useState } from "react";
// import { useDealerCardStore, usePlayerCardStore } from "../store/store";
// import { DealersTable } from "./DealersTable";
// import { GameStatus } from "./GameStatus";
// import { PlayersTable } from "./PlayersTable";
// import WinComponent from "./WinComponent";
// import { Rules } from "./Rules";
// import Stake from "./Stake";
// import deck from "../utils/cards"
// type Card = {
//     value: string;
//     suit?: "♣" | "♠" | "♥" | "♦";
//     faceDown?: boolean;
// };
// // @ts-ignore
// interface PlayerProps {
//     name: string;
//     cards: Array<Card>; // Correctly reference the Card type
// }

// export default function Table() {
//     useEffect(() => {
//     //   START GANE
//     }, [])

//     const [step, setStep] = useState<string>("1");
//     // @ts-ignore
//     const [win, setWin] = useState<boolean>(false);

//     // CARD STORES
//     const { cards: dealerCards, newCard: newDealerCard } = useDealerCardStore();
//     // @ts-ignore
//     const addDealerCard = () => {
//         const card: Card = { value: "K", suit: "♦", faceDown: true };
//         newDealerCard(card);
//     };
//     const { cards: playerCards, newCard: newPlayerCard } = usePlayerCardStore();
//     // @ts-ignore
//     const addPlayerCard = () => {
//         const card: Card = { value: "A", suit: "♠", faceDown: false };
//         newPlayerCard(card);
//     };

//     // SC CALLS
//     // @ts-ignore
//     const [newCardLoader, setNewCardLoader] = useState(false);
//     // @ts-ignore
//     const [standLoader, setStandLoader] = useState(false);

//     const hitHandler = () => {
//         setNewCardLoader(true);
//         try {
//             // CALL

//         } catch {}
//         setNewCardLoader(false);
//     };
//     const standHandler = () => {
//         setStandLoader(true);
//         try {
//             // CALL
//         } catch {}
//         setStandLoader(false);
//     };

//     return (
//         <div className="relative h-screen bg-[url('./bg.svg')] bg-no-repeat bg-cover">
//             {win && <WinComponent amount="150" />}
//             {step === "1" ? (
//                 <Rules setStep={setStep} />
//             ) : step === "2" ? (
//                 <Stake setStep={setStep} />
//             ) : (
//                 <>
//                     <div className="max-w-2xl mx-auto h-full flex flex-col items-center">
//                         <div className="flex flex-col items-center gap-[45px]">
//                             {/* Players Section */}
//                             <div className="mt-6">
//                                 <DealersTable
//                                     name="Dealer"
//                                     cards={dealerCards}
//                                 />
//                             </div>

//                             {/* Players Section */}
//                             {/* <div className="grid grid-cols-2 mx-5"> */}
//                             <PlayersTable
//                                 name="BOB (you)"
//                                 cards={playerCards}
//                             />
//                             {/* <PlayersTable
//                             name="Alice"
//                             cards={[{ value: "8", suit: "♠" }]}
//                         /> */}
//                             {/* </div> */}
//                         </div>

//                         {/* Controls Section */}
//                         <div className="space-y-5 mt-[36px]">
//                             <div className="text-center">
//                                 <p className="text-[#F8DDA4] mb-4 raleway">
//                                     Would you like to?
//                                 </p>
//                                 <div className="flex gap-4 justify-center">
//                                     <button
//                                         className="w-32 bg-gradient-to-b helvetica shadow-[0px_2px_2px_0px] shadow-[#A2AFA889] from-[#E7BD70] to-[#F3D495] text-base font-medium rounded-[8px] py-[6px]"
//                                         onClick={hitHandler}
//                                     >
//                                         HIT
//                                     </button>
//                                     <button
//                                         className="w-32 bg-gradient-to-b helvetica shadow-[1px_2px_2px_0px] shadow-[#A2AFA889] from-[#E7BD70] to-[#F3D495] text-base font-medium rounded-[8px] py-[6px]"
//                                         onClick={standHandler}
//                                     >
//                                         STAND
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                         <GameStatus />
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import {
  useBlackjackStore,
  useDealerCardStore,
  usePlayerCardStore,
} from "../store/store";
import {
  calculateHandValue,
  getRandomCard,
  determineWinner,
} from "../utils/gameLogic";
import { GameStatus } from "./GameStatus";
import { PlayersTable } from "./PlayersTable";
import { DealersTable } from "./DealersTable";
import Stake from "./Stake";
import { Rules } from "./Rules";
import WinComponent from "./WinComponent";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { claimMoney } from "../utils/transactions2";

export default function Table() {
  const Start = () => {
    useEffect(() => {
      const audio = new Audio('/cards-distributing.wav');
      //   audio.loop = true;
      audio.play();
      setDealSound(true)
    }, []);

    return null;
  };
  const DealSound = () => {
    useEffect(() => {
      const audio = new Audio('/cards-flip.wav');
      //   audio.loop = true;
      audio.play();
    }, []);

    return null;
  };

  const [step, setStep] = useState<string>("1");
  const [win, setWin] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<string>("");
  const [dealSound, setDealSound] = useState(false)
  const { primaryWallet } = useDynamicContext()
  //   @ts-ignore
  const [dealerToUser, setDealerToUser] = useState<boolean>(false)

  const {
    cards: dealerCards,
    newCard: newDealerCard,
    setCards: setDealerCards,
  } = useDealerCardStore();
  const { cards: playerCards, newCard: newPlayerCard } = usePlayerCardStore();
  const { potentialWin } = useBlackjackStore();

  //   @ts-ignore
  const [newCardLoader, setNewCardLoader] = useState(false);
  //   @ts-ignore
  const [standLoader, setStandLoader] = useState(false);

  useEffect(() => {
    if (step === "3") {
      // Initial deal
      const firstCard = getRandomCard([]);
      const secondCard = getRandomCard([firstCard]);
      const dealerCard = getRandomCard([firstCard, secondCard]);

      newPlayerCard(firstCard);
      newPlayerCard(secondCard);
      // Dealer's first card face up, second card face down
      newDealerCard({ ...dealerCard, faceDown: false });
    }
  }, [step]);

  const hitHandler = () => {
    setNewCardLoader(true);
    setDealerToUser(true);
    setDealSound(true)
    const audio = new Audio('/card-flip.wav');
    //   audio.loop = true;
    audio.play();
    try {
      // @ts-ignore
      const playerValue = calculateHandValue(playerCards);
      if (playerValue < 21) {
        // @ts-ignore
        const newCard = getRandomCard([...playerCards, ...dealerCards]);
        newPlayerCard(newCard);

        // Check if player busts after new card
        // @ts-ignore
        const newValue = calculateHandValue([...playerCards, newCard]);
        if (newValue > 21) {
          handleGameEnd("dealer");
        }
      }
    } catch (error) {
      console.error("Error in hit handler:", error);
    }
    setNewCardLoader(false);
    setDealerToUser(false)
  };

  const dealerPlay = async () => {
    let currentDealerCards = [...dealerCards];

    // Reveal dealer's face down card if it exists
    currentDealerCards = currentDealerCards.map((card) => ({
      ...card,
      faceDown: false,
    }));
    setDealerCards(currentDealerCards);

    // Dealer hits until reaching 17 or higher
    // @ts-ignore
    while (calculateHandValue(currentDealerCards) < 17) {
      // @ts-ignore
      const newCard = getRandomCard([...playerCards, ...currentDealerCards]);
      currentDealerCards = [...currentDealerCards, newCard];
      newDealerCard({ ...newCard, faceDown: false });

      // Add a small delay for animation
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Determine winner
    // @ts-ignore
    const dealerValue = calculateHandValue(currentDealerCards);
    // @ts-ignore
    const playerValue = calculateHandValue(playerCards);
    const winner = determineWinner(playerValue, dealerValue);

    handleGameEnd(winner);
  };
  const { setShowDynamicUserProfile } = useDynamicContext();
  const handleGameEnd = async (result: string) => {
    setGameOver(true);
    setGameResult(result);

    if (result === "player") {
      const txnHash = await claimMoney(primaryWallet, potentialWin)
      console.log("txnHash in Table:", txnHash)
      setWin(true);

    } else if (result === "tie") {
      // Handle tie case - you might want to add a tie component or message
      setWin(false);
      const audio = new Audio('/losing.wav');
      //   audio.loop = true;
      audio.play();
      setShowDynamicUserProfile(true)
    } else {
      setWin(false);
      const audio = new Audio('/losing.wav');
      //   audio.loop = true;
      audio.play();
      setShowDynamicUserProfile(true)
    }
  };

  const standHandler = () => {
    setStandLoader(true);
    const audio = new Audio('/cards-distributing.wav');
    //   audio.loop = true;
    audio.play();
    try {
      dealerPlay();
    } catch (error) {
      console.error("Error in stand handler:", error);
    }
    setStandLoader(false);
  };

  return (
    <div className="relative h-screen bg-[url('./bg.svg')] bg-no-repeat bg-cover">
      {gameOver && (
        <>
          {win && <WinComponent amount={`${potentialWin}`} />}
          {gameResult === "tie" && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl">
              Push! It's a tie!
            </div>
          )}
          {gameResult === "dealer" && !win && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#e88f21] text-2xl text-bold">
              Dealer wins!
            </div>
          )}
        </>
      )}
      {step === "1" ? (
        <Rules setStep={setStep} />
      ) : step === "2" ? (
        <Stake setStep={setStep} />
      ) : (
        <>

          {dealSound ? <DealSound /> : <Start />}
          <div className="max-w-2xl mx-auto h-full flex flex-col items-center">
            <div className="flex flex-col items-center gap-[45px]">
              <div className="mt-6">
                <DealersTable name="Dealer" cards={dealerCards} />
                {!gameOver && (
                  <div className="text-white text-center mt-2">
                    {/* @ts-ignore */}
                    Dealer's value:{" "}
                    {calculateHandValue(
                      // @ts-ignore
                      dealerCards.filter((card) => !card.faceDown)
                    )}
                  </div>
                )}
              </div>
              <PlayersTable name="BOB (you)" cards={playerCards} />
              <div className="text-white text-center mt-2">
                {/* @ts-ignore */}
                Your hand value: {calculateHandValue(playerCards)}
              </div>
            </div>

            <div className="space-y-5 mt-[36px]">
              <div className="text-center">
                {!gameOver && (
                  <p className="text-[#F8DDA4] mb-4 raleway">
                    Would you like to?
                  </p>
                )}
                <div className="flex gap-4 justify-center">
                  <button
                    // @ts-ignore
                    className={`w-32 bg-gradient-to-b helvetica shadow-[0px_2px_2px_0px] shadow-[#A2AFA889] from-[#E7BD70] to-[#F3D495] text-base font-medium rounded-[8px] py-[6px] ${
                      //   @ts-ignore
                      gameOver || calculateHandValue(playerCards) >= 21
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                      }`}
                    onClick={hitHandler}
                    // @ts-ignore
                    disabled={gameOver || calculateHandValue(playerCards) >= 21}
                  >
                    HIT
                  </button>
                  <button
                    className={`w-32 bg-gradient-to-b helvetica shadow-[1px_2px_2px_0px] shadow-[#A2AFA889] from-[#E7BD70] to-[#F3D495] text-base font-medium rounded-[8px] py-[6px] ${gameOver ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    onClick={standHandler}
                    disabled={gameOver}
                  >
                    STAND
                  </button>
                </div>
              </div>
            </div>
            <GameStatus />
          </div>
        </>
      )}
    </div>
  );
}
