import Loading from "./Loading";

export const GameStatus = () => {
    return (
        <div className="space-y-2 text-center mt-20">
            <h2 className="text-sm raleway font-bold text-[#D1D1D1]">
                Black jack{" "}
                <span className="text-[#D1D1D1] font-normal">
                    Round 1 is being played.
                </span>
            </h2>
            <div className="mx-auto bg-[#1F2235] rounded-[8px] p-4 flex items-center justify-center text-center w-[80%] h-[100px]">
                <div>
                    <Loading loading />
                </div>
                {/* <div className="flex justify-between items-center">
                <span className="text-amber-400">Amount Staked</span>
                <span className="text-white">100 $USD</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-green-400">If Won:</span>
                <span className="text-white">+50 $USD</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-red-400">If Lost:</span>
                <span className="text-white">-100 $USD</span>
            </div> */}
            </div>
        </div>
    );
};
