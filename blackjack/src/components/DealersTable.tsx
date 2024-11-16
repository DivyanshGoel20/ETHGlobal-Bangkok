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
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
                <img src="./chips.svg" alt="chips" className="w-8 h-8 mb-7" />
                <DealerAvatar name={name} />
                <div className="flex gap-2 mb-7">
                    {cards.map((card, index) => (
                        <PlayingCard key={index} {...card} />
                    ))}
                </div>
            </div>
        </div>
    );
};
