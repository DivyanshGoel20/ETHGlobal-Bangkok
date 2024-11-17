import { useState } from "react";
import ToDealer from "./Anims/ToDealer";
import { DealerAvatar } from "./DealerAvatar";
import { PlayingCard } from "./PlayingCard";

interface PlayerProps {
    name: string;
    cards: Array<{
        value: string;
        suit?: "♣" | "♠" | "♥" | "♦";
        faceDown?: boolean;
    }>;
}

export const DealersTable = ({ name, cards }: PlayerProps) => {
    const [dealDealer, setDealDealer] = useState(false)

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-4" onClick={()=> {
                setDealDealer(true)
                console.log(dealDealer)
            }}>
                <img src="./chips.svg" alt="chips" className="w-8 h-8 mb-7" />
                <DealerAvatar name={name} />
                <div className="flex gap-2 mb-7 ">
                    {/* <PlayingCard faceDown={true} value={""} /> */}
                <ToDealer display={dealDealer}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-2 mb-7 max-w-[75%]">
                    {cards.map((card, index) => (
                        <PlayingCard key={index} {...card} />
                    ))}
                </div>
        </div>
    );
};
