import { useEffect, useState } from "react";
import { useDealerCardStore, usePlayerCardStore } from "../store/store";
import { DealersTable } from "./DealersTable";
import { GameStatus } from "./GameStatus";
import { PlayersTable } from "./PlayersTable";
import WinComponent from "./WinComponent";
import { Rules } from "./Rules";
import Stake from "./Stake";
type Card = {
    value: string;
    suit?: "♣" | "♠" | "♥" | "♦";
    faceDown?: boolean;
};
// @ts-ignore
interface PlayerProps {
    name: string;
    cards: Array<Card>; // Correctly reference the Card type
}

export default function Table() {
    useEffect(() => {
    //   START GANE
    }, [])
    

    const [step, setStep] = useState<string>("1");
    // @ts-ignore
    const [win, setWin] = useState<boolean>(false);

    // CARD STORES
    const { cards: dealerCards, newCard: newDealerCard } = useDealerCardStore();
    // @ts-ignore
    const addDealerCard = () => {
        const card: Card = { value: "K", suit: "♦", faceDown: true };
        newDealerCard(card);
    };
    const { cards: playerCards, newCard: newPlayerCard } = usePlayerCardStore();
    // @ts-ignore
    const addPlayerCard = () => {
        const card: Card = { value: "A", suit: "♠", faceDown: false };
        newPlayerCard(card);
    };

    // SC CALLS
    // @ts-ignore
    const [newCardLoader, setNewCardLoader] = useState(false);
    // @ts-ignore
    const [standLoader, setStandLoader] = useState(false);

    const hitHandler = () => {
        setNewCardLoader(true);
        try {
            // CALL SMART CONTRACT
        } catch {}
        setNewCardLoader(false);
    };
    const standHandler = () => {
        setStandLoader(true);
        try {
            // CALL SMART CONTRACT
        } catch {}
        setStandLoader(false);
    };

    return (
        <div className="relative h-screen bg-[url('./bg.svg')] bg-no-repeat bg-cover">
            {win && <WinComponent amount="150" />}
            {step === "1" ? (
                <Rules setStep={setStep} />
            ) : step === "2" ? (
                <Stake setStep={setStep} />
            ) : (
                <>
                    <div className="max-w-2xl mx-auto h-full flex flex-col items-center">
                        <div className="flex flex-col items-center gap-[45px]">
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
                        <div className="space-y-5 mt-[36px]">
                            <div className="text-center">
                                <p className="text-[#F8DDA4] mb-4 raleway">
                                    Would you like to?
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        className="w-32 bg-gradient-to-b helvetica shadow-[0px_2px_2px_0px] shadow-[#A2AFA889] from-[#E7BD70] to-[#F3D495] text-base font-medium rounded-[8px] py-[6px]"
                                        onClick={hitHandler}
                                    >
                                        HIT
                                    </button>
                                    <button
                                        className="w-32 bg-gradient-to-b helvetica shadow-[1px_2px_2px_0px] shadow-[#A2AFA889] from-[#E7BD70] to-[#F3D495] text-base font-medium rounded-[8px] py-[6px]"
                                        onClick={standHandler}
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
