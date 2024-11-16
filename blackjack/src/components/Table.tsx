import { useState } from "react";
import { useDealerCardStore, usePlayerCardStore } from "../store/store";
import { DealersTable } from "./DealersTable";
import { GameStatus } from "./GameStatus";
import { PlayersTable } from "./PlayersTable";
import WinComponent from "./WinComponent";

interface PlayerProps {
    name: string;
    cards: Array<{
        value: string;
        suit?: "♣" | "♠" | "♥" | "♦";
        faceDown?: boolean;
    }>;
}

export default function Table() {
    // CARD STORES 
    const { cards: dealerCards, newCard: newDealerCard } = useDealerCardStore();
    const addDealerCard = () => {
      const card = { value: "K", suit: "♦", faceDown: true };
      newDealerCard(card);
    };
    const { cards: playerCards, newCard: newPlayerCard } = usePlayerCardStore();
    const addPlayerCard = () => {
      const card = { value: "A", suit: "♠", faceDown: false };
      newPlayerCard(card);
    };

    // SC CALLS
    const [newCardLoader, setNewCardLoader] = useState(false)
    const [standLoader, setStandLoader] = useState(false)
    const hitHandler = () => {
       setNewCardLoader(true);
       try{
        // CALL SMART CONTRACT
       }catch{

       }
       setNewCardLoader(false)
    }
    const standHandler = () => {
        setStandLoader(true);
        try{
         // CALL SMART CONTRACT
        }catch{
 
        }
        setStandLoader(false)
    }

    return (
        <div className="relative h-screen bg-[url('./bg.svg')] bg-no-repeat bg-cover">
            {/* <WinComponent amount="150" /> */}
            <div className="max-w-2xl mx-auto h-full">
                <div className="flex flex-col gap-[60px] items-center">
                    {/* Players Section */}
                    <div className="mt-6">
                        <DealersTable
                            name="Dealer"
                            cards={dealerCards}
                        />
                    </div>

                    {/* Players Section */}
                    {/* <div className="grid grid-cols-2 mx-5"> */}
                        <PlayersTable
                            name="BOB (you)"
                            cards={playerCards}
                        />
                        {/* <PlayersTable
                            name="Alice"
                            cards={[{ value: "8", suit: "♠" }]}
                        /> */}
                    {/* </div> */}
                </div>

                {/* Controls Section */}
                <div className="space-y-5 mt-[51px]">
                    <div className="text-center">
                        <p className="text-[#F8DDA4] mb-4 raleway">
                            Would you like to?
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                className="w-32 bg-gradient-to-b helvetica shadow-[0px_2px_2px_0px] shadow-[#A2AFA889] from-[#E7BD70] to-[#F3D495] text-base font-medium rounded-[8px] py-[6px]"
                                onClick={hitHandler}
                                disabled={standLoader || newCardLoader}
                            >
                                HIT
                            </button>
                            <button
                                className="w-32 bg-gradient-to-b helvetica shadow-[1px_2px_2px_0px] shadow-[#A2AFA889] from-[#E7BD70] to-[#F3D495] text-base font-medium rounded-[8px] py-[6px]"
                                onClick={standHandler}
                                disabled={standLoader || newCardLoader}
                            >
                                STAND
                            </button>
                        </div>
                    </div>
                </div>
                <GameStatus />
            </div>
        </div>
    );
}
