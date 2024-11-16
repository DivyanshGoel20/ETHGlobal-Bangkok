import { motion } from "framer-motion";
import { useEffect } from "react";
import Confetti from "react-confetti-boom";

const WinComponent = ({ amount = "150" }: { amount: string }) => {
    useEffect(()=>{
        const audio = new Audio('/winning.mp3');
        audio.play();
    },[])
    const itemVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.5,
            },
        },
    };
    return (
        <div className="w-screen z-50 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-screen backdrop-blur-2xl bg-opacity-10 bg-[#000000]">
            <Confetti mode="boom" particleCount={150} colors={["#F8DDA4"]} />
            <motion.div
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                className="flex justify-center items-center h-full"
            >
                <div className="relative">
                    <img src="./win.svg" alt="win" />
                    <p className="absolute bottom-[50px] left-[50%] -translate-x-[50%] uppercase bg-gradient-to-b from-[#F8DDA4] to-[#DB9A5F] raleway font-extrabold text-[24px] bg-clip-text text-transparent">
                        ${amount} USD
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default WinComponent;
