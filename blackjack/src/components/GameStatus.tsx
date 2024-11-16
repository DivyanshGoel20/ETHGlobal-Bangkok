import { useState } from "react";
import { useBlackjackStore } from "../store/store";
import Loading from "./Loading";

export const GameStatus = () => {
    // @ts-ignore
    const [amountLoader, setAmountLoader] = useState(false)
        const {
                // @ts-ignore
          walletAmount,
          amountStaked,
          potentialWin,
          potentialLoss,
          setStake,
          updateWallet,
          resetStake,
        } = useBlackjackStore();
          // @ts-ignore
        const handleStake = () => {
          setStake(100); // Example: Staking $100
        };
          // @ts-ignore
        const handleWin = () => {
          updateWallet(potentialWin); // Add winnings to the wallet
          resetStake();
        };
          // @ts-ignore
        const handleLoss = () => {
          updateWallet(-amountStaked); // Deduct the stake from the wallet
          resetStake();
        };
        return (
            <div className="p-4 bg-gray-800 rounded-md text-[15px] text-white flex justify-between items-center max-w-[87%] place-self-center gap-[27px] px-[30px] mt-[30px]">
              {/* <div className="flex flex-col text-left justify-between items-start mb-4">
        <span className="text-blue-400">Wallet Amount:</span>
        {amountLoader ? (
          <Loading loading />
        ) : (
          <span className="text-white">{walletAmount} $USD</span>
        )}
      </div> */}

      {/* Amount Staked */}
      <div className="flex flex-col text-left justify-between items-start mb-4">
        <span className="text-amber-400">Amount Staked:</span>
        {amountLoader ? (
          <Loading loading />
        ) : (
          <span className="text-white">{amountStaked} $USD</span>
        )}
      </div>

      {/* If Won */}
      <div className="flex flex-col text-left justify-between items-start mb-4">
        <span className="text-green-400">If Won:</span>
        {amountLoader ? (
          <Loading loading />
        ) : (
          <span className="text-white">+{potentialWin} $USD</span>
        )}
      </div>

      {/* If Lost */}
      <div className="flex flex-col text-left justify-between items-start mb-4">
        <span className="text-red-400">If Lost:</span>
        {amountLoader ? (
          <Loading loading />
        ) : (
          <span className="text-white">-{potentialLoss} $USD</span>
        )}
      </div>

        

            </div>
          );
        
};
