import { useState } from "react";
import { DealersTable } from "./DealersTable";
import { GameStatus } from "./GameStatus";
import { PlayersTable } from "./PlayersTable";
import WinComponent from "./WinComponent";
import { Rules } from "./Rules";
import Stake from "./Stake";

export default function Table() {
    const [step, setStep] = useState<string>("1");
    const [win, setWin] = useState<boolean>(false);

    return (
        <div className="relative h-screen bg-[url('./bg.svg')] bg-no-repeat bg-cover">
            {win && <WinComponent amount="150" />}
            {step === "1" ? (
                <Rules setStep={setStep} />
            ) : step === "2" ? (
                <Stake setStep={setStep} />
            ) : (
                <>
                    <div className="max-w-2xl mx-auto h-full">
                        <div className="flex flex-col gap-40">
                            {/* Players Section */}
                            <div className="mt-6">
                                <DealersTable
                                    name="Dealer"
                                    cards={[{ value: "", faceDown: true }]}
                                />
                            </div>

                            {/* Players Section */}
                            <div className="flex justify-center items-center w-full mx-5">
                                <PlayersTable
                                    name="BOB (you)"
                                    cards={[{ value: "8", suit: "♣" }]}
                                />
                            </div>
                        </div>

                        {/* Controls Section */}
                        <div className="space-y-5 mt-16">
                            <div className="text-center">
                                <p className="text-[#F8DDA4] mb-4 raleway">
                                    Would you like to?
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        className="w-32 bg-gradient-to-b helvetica shadow-[0px_2px_2px_0px] shadow-[#A2AFA889] from-[#E7BD70] to-[#F3D495] text-base font-medium rounded-[8px] py-[6px]"
                                        onClick={() => console.log("Hit")}
                                    >
                                        HIT
                                    </button>
                                    <button
                                        className="w-32 bg-gradient-to-b helvetica shadow-[1px_2px_2px_0px] shadow-[#A2AFA889] from-[#E7BD70] to-[#F3D495] text-base font-medium rounded-[8px] py-[6px]"
                                        onClick={() => console.log("Stand")}
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
