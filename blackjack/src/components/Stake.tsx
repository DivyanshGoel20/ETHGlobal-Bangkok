import { Dispatch, SetStateAction, useEffect, useState } from "react";
// @ts-ignore
import { AnimatePresence, motion } from "motion/react";
import Loading from "./Loading";
import FullPageLoader from "./FullPageLoader";
import { useBlackjackStore } from "../store/store";
import { flowAddMoney } from "../utils/transactions2";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const Stake = ({ setStep }: { setStep: Dispatch<SetStateAction<string>> }) => {
    const [stakeAmount, setStakeAmount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [fullPageLoading, setFullPageLoading] = useState(false);
    const [chip, setChip] = useState(false)
    const { primaryWallet } = useDynamicContext()

    const Chip = () => {
        useEffect(() => {
            const audio = new Audio('/poker-chips.wav');
            //   audio.loop = true;
            audio.play();
            //   setChip(false)
        }, []);

        return null;
    };

    // Access store methods and state
    // @ts-ignore
    const { walletAmount, setStake, resetStake } = useBlackjackStore();

    const handleIncrement = () => {
        setStakeAmount((prev) => prev + 50);
        setChip(true);
        // setChip(false)
    };

    const handleDecrement = () => {
        setStakeAmount((prev) => (prev > 0 ? prev - 50 : 0)); // Prevent negative staking amounts
    };

    const handleStake = async () => {
        if (stakeAmount > walletAmount) {
            alert("You cannot stake more than your wallet amount!");
            return;
        }

        setLoading(true); // Show button loader
        try {
            // Update the store with the new stake amount
            setStake(stakeAmount);
            const flowStake = await flowAddMoney(primaryWallet, stakeAmount)
            console.log(flowStake)


            // Simulate an async operation (replace with your staking logic)
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay

            setLoading(false); // Stop button loader
            setFullPageLoading(true); // Show full-page loader
            setTimeout(() => {
                setStep("3"); // Navigate to the next step
            }, 200); // Optional delay to show the full-page loader
        } catch (error: any) {
            console.error(error);
            alert("An error occurred: " + error.message); // Show error alert
            setLoading(false); // Stop button loader on error
        }
    };

    const containerVariants = {
        hidden: {
            opacity: 0,
            y: 200,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
        exit: {
            opacity: 0,
            y: -200,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                when: "afterChildren",
                staggerChildren: 0.1,
                staggerDirection: 1,
            },
        },
    };

    return (
        <div className="min-h-screen backdrop-blur-2xl bg-opacity-10 bg-[#000000] flex flex-col gap-6 items-center justify-center p-4 shadow-[4px_5px_5px_0px] shadow-[#F5D799]">
            {fullPageLoading ? (
                <FullPageLoader loading={fullPageLoading} />
            ) : (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="w-[80%] flex flex-col items-center gap-6"
                >
                    {chip && <Chip />}
                    <div className="w-full rounded-xl p-px bg-gradient-to-b from-[#F5D799] to-[#666666]">
                        <div className="backdrop-blur-2xl bg-opacity-1 bg-[#181A27] p-1 rounded-xl">
                            <div className="p-4">
                                <h2 className="text-2xl font-semibold text-center mb-2 text-[#F5D89B] raleway">
                                    Stake!
                                </h2>
                                <p className="text-[10px] text-center text-[#FFFFFF] mb-6 raleway">
                                    Add the amount you wish to stake
                                </p>
                                <div className="h-36 mb-6 border border-slate-600 flex items-center justify-center text-2xl text-white w-[50%] mx-auto rounded-xl p-px bg-gradient-to-r from-[#F5D799] to-[#666666]">
                                    <div className="bg-[#11131E] backdrop-blur-2xl bg-opacity-1 p-1 rounded-xl w-full h-full flex flex-col gap-2 items-center justify-center">
                                        <img
                                            src="./coin.svg"
                                            alt="coin"
                                            className="size-16"
                                        />
                                        <p className="text-[#F8DDA4] text-[16px] font-bold raleway">
                                            {stakeAmount} $CHIPS
                                        </p>
                                    </div>
                                </div>
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
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleStake}
                        className="w-[40%] py-2.5 rounded-lg bg-transparent border border-[#F5D799] text-[#FFF3CB] text-[16px] font-medium hover:bg-[#FCE9B9]/20"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? <Loading loading={loading} /> : "Play !"}
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default Stake;
