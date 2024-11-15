export const PlayingCard = ({
    value,
    suit,
    faceDown,
}: {
    value: string;
    suit?: "♣" | "♠" | "♥" | "♦";
    faceDown?: boolean;
}) => {
    if (faceDown) {
        return (
            <div className="w-12 h-16 rounded-[3px] overflow-hidden">
                <img
                    src="./closed-card.svg"
                    alt="closed-card"
                    className="w-full h-full"
                />
            </div>
        );
    }

    return (
        <div className="w-14 h-16 p-1 pt-[6px] rounded-[3px] bg-white flex font-bold">
            <div
                className={`flex flex-col items-center gap-[6px] ${
                    suit === "♥" || suit === "♦" ? "text-red-600" : "text-black"
                }`}
            >
                <p className="leading-[12px]">{value}</p>
                <p className="leading-[12px] font-thin">{suit}</p>
            </div>
        </div>
    );
};
