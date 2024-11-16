import { Dispatch, SetStateAction, useState } from "react";

const Stake = ({ setStep }: { setStep: Dispatch<SetStateAction<string>> }) => {
    const [stakeAmount, setStakeAmount] = useState<number>(0);

    const handleIncrement = () => {
        setStakeAmount((prev) => prev + 1);
    };

    const handleDecrement = () => {
        setStakeAmount((prev) => prev - 1);
    };

    return (
        <div className="min-h-screen backdrop-blur-2xl bg-opacity-10 bg-[#000000] flex flex-col gap-6 items-center justify-center p-4 shadow-[4px_5px_5px_0px] shadow-[#F5D799]">
            <div className="w-[80%] rounded-xl p-px bg-gradient-to-b from-[#F5D799] to-[#666666]">
                <div className="backdrop-blur-2xl bg-opacity-1 bg-[#181A27] p-1 rounded-xl">
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold text-center mb-2 text-[#F5D89B] raleway">
                            Stake!
                        </h2>
                        {/* Subtitle */}
                        <p className="text-[10px] text-center text-[#FFFFFF] mb-6 raleway">
                            Add the amount you wish to stake
                        </p>

                        {/* Stake Input Display */}
                        <div className="h-36 mb-6 border border-slate-600 flex items-center justify-center text-2xl text-white w-[50%] mx-auto rounded-xl p-px bg-gradient-to-r from-[#F5D799] to-[#666666]">
                            <div className="bg-[#11131E] backdrop-blur-2xl bg-opacity-1 p-1 rounded-xl w-full h-full flex flex-col gap-2 items-center justify-center">
                                <img
                                    src="./coin.svg"
                                    alt="coin"
                                    className="size-16"
                                />
                                <p className="text-[#F8DDA4] text-[16px] font-bold raleway">
                                    $ {stakeAmount}
                                </p>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex justify-center items-center gap-4 w-[50%] mx-auto mb-6 bg-[#F5D89B] rounded-xl p-1 font-bold">
                            <button
                                onClick={handleDecrement}
                                className="w-10 h-10 flex items-center justify-center text-[#000000]"
                            >
                                -
                            </button>

                            <span className="text-center text-[#000000] font-medium">
                                {stakeAmount}
                            </span>

                            <button
                                onClick={handleIncrement}
                                className="w-10 h-10 flex items-center justify-center text-[#000000] hover:bg-amber-200/20 rounded-full transition-colors"
                            >
                                +
                            </button>
                        </div>

                        {/* Play Button */}
                    </div>
                </div>
            </div>
            <button
                onClick={() => setStep("3")}
                className="w-[40%] py-2.5 rounded-lg bg-transparent border border-[#F5D799] text-[#FFF3CB] text-[16px] font-medium"
            >
                Play !
            </button>
        </div>
    );
};

export default Stake;
