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
        <div className="flex flex-col items-center gap-2 max-w-[84%]">
            <div className="flex flex-row items-centre gap-3">
                <PlayerAvatar name={name} />
                <div className="flex flex-row flex-wrap gap-2 items-start justify-start h-fit place-self-center">
                    {cards.map((card, index) => (
                        <PlayingCard key={index} {...card} />
                    ))}
                    
                </div>
                <img src="./chips.svg" alt="chips" className="w-8 h-8" />
            </div>
        </div>
    );
};
