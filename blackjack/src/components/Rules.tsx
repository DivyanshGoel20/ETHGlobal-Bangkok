import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export const Rules = ({
    setStep,
}: {
    setStep: Dispatch<SetStateAction<string>>;
}) => {
    const [isVisible, setIsVisible] = useState(true);

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

    const handleContinue = () => {
        setIsVisible(false);
        setTimeout(() => {
            setStep("2");
        }, 400);
    };

    return (
        <div className="min-h-screen backdrop-blur-2xl bg-opacity-10 bg-[#000000] flex items-center justify-center p-4 ">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={containerVariants}
                        className="w-[95%] rounded-xl p-px bg-gradient-to-b from-[#F5D799] to-[#666666]"
                    >
                        <div className="backdrop-blur-2xl bg-opacity-1 bg-[#181A27] p-1 rounded-xl">
                            <div className="p-8 space-y-8">
                                <h1 className="text-sm raleway w-[75%] underline mx-auto font-bold text-center text-[#F5D89B]">
                                    Before we start here is how the game works !
                                </h1>
                                <div className="space-y-6 text-[#BFBFBF] font-semibold text-[13px]">
                                    <div className="space-y-2">
                                        <h2 className="font-semibold">
                                            1. Objective:
                                        </h2>
                                        <ul className="list-disc list-inside pl-4 space-y-1">
                                            <li>
                                                Get as close to 21 as possible
                                                without going over, and beat the
                                                dealer&apos;s hand.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-2">
                                        <h2 className="font-semibold">
                                            2. Gameplay:
                                        </h2>
                                        <ul className="list-disc list-inside pl-4 space-y-1">
                                            <li>
                                                You and the dealer get two
                                                cards. You can &quot;hit&quot;
                                                (take a card) or
                                                &quot;stand&quot; (keep your
                                                hand).
                                            </li>
                                            <li>
                                                The dealer hits until they reach
                                                at least 17.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-2">
                                        <h2 className="font-semibold">
                                            3. Winning:
                                        </h2>
                                        <ul className="list-disc list-inside pl-4 space-y-1">
                                            <li>
                                                Win by having a hand closer to
                                                21 than the dealer without
                                                busting (going over 21).
                                            </li>
                                            <li>
                                                A &quot;Blackjack&quot; (Ace +
                                                10-value card) pays more.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        className="bg-transparent border border-[#FCE9B9] py-2 px-4 rounded-md text-[#FFF3CB]"
                                        onClick={handleContinue}
                                    >
                                        Continue &gt;
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
