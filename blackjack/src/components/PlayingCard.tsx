// export const PlayingCard = ({
//     value,
//     suit,
//     faceDown,
// }: {
//     value: string;
//     suit?: "♣" | "♠" | "♥" | "♦";
//     faceDown?: boolean;
// }) => {
//     if (faceDown) {
//         return (
//             <div className="w-[42px] h-16 rounded-[3px] overflow-hidden ">
//                 <img
//                     src="./closed-card.svg"
//                     alt="closed-card"
//                     className="w-full h-full"
//                 />
//             </div>
//         );
//     }

//     return (
//         <div className="w-[42px] h-[56px] pl-[3px] pt-[6px] rounded-[3px] bg-white flex font-bold ">
//             <div
//                 className={`flex flex-col items-center gap-[6px] ${
//                     suit === "♥" || suit === "♦" ? "text-red-600" : "text-black"
//                 }`}
//             >
//                 <p className="leading-[12px]">{value}</p>
//                 <p className="leading-[12px] font-thin">{suit}</p>
//             </div>
//         </div>
//     );
// };
import { useState } from "react";
// import "./PlayingCard.css"; // Add the CSS file for styling

export const PlayingCard = ({
  value,
  suit,
  faceDown: initialFaceDown,
}: {
  value: string;
  suit?: "♣" | "♠" | "♥" | "♦";
  faceDown?: boolean;
}) => {
  const [isFlipped, setIsFlipped] = useState(initialFaceDown || false);

  const handleFlip = () => {
    if(!isFlipped){return}
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-container" onClick={handleFlip}>
      <div className={`card ${isFlipped ? "flipped" : ""}`}>
        {/* Front of the Card */}
        <div className="card-front">
          <div
            className={`flex flex-col items-centre text-centre justify-start p-1 gap-[6px] ${
              suit === "♥" || suit === "♦" ? "text-red-600" : "text-black"
            }`}
          >
            <p className="leading-[12px] text-[15px] font-bold">{value}</p>
            <p className="leading-[12px] text-[15px] font-thin">{suit}</p>
          </div>
        </div>

        {/* Back of the Card */}
        <div className="card-back">
          <img
            src="./closed-card.svg"
            alt="closed-card"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
