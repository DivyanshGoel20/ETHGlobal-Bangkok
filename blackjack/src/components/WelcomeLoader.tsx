"use client";

import React from "react";
import { motion } from "framer-motion";

const ChipLoader = ({ isLoading }: { isLoading: boolean }) => {
    const chips = Array.from({ length: 20 }, (_, i) => i);

    return (
        <motion.div
            className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoading ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: isLoading ? "auto" : "none" }}
        >
            {chips.map((chip) => (
                <motion.div
                    key={chip}
                    className="absolute w-16 h-16 rounded-full border-4 border-white shadow-lg"
                    style={{
                        backgroundColor: chip % 2 === 0 ? "#ff0000" : "#ffffff",
                        top: `-${Math.random() * 20 + 10}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: ["0vh", "120vh"],
                        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                    }}
                    transition={{
                        duration: Math.random() + 1,
                        repeat: 1,
                        ease: "linear",
                    }}
                >
                    <div
                        className={`absolute inset-2 rounded-full border-2 flex items-center justify-center font-bold text-lg`}
                    >
                        <img src="./chipsAni.svg" alt="" />
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export const WelcomeLoader = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <ChipLoader isLoading={isLoading} />
        </div>
    );
};
