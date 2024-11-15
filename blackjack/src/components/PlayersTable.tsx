import { PlayerAvatar } from "./PlayerAvatar";
import { PlayingCard } from "./PlayingCard";

interface PlayerProps {
    name: string;
    cards: Array<{
        value: string;
        suit?: "♣" | "♠" | "♥" | "♦";
        faceDown?: boolean;
    }>;
}

export const PlayersTable = ({ name, cards }: PlayerProps) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex items-end gap-3">
                <PlayerAvatar name={name} />
                <div className="flex flex-col gap-5 justify-end">
                    {cards.map((card, index) => (
                        <PlayingCard key={index} {...card} />
                    ))}
                    <img src="./chips.svg" alt="chips" className="w-8 h-8" />
                </div>
            </div>
        </div>
    );
};
