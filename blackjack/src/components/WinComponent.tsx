const WinComponent = ({ amount = "150" }: { amount: string }) => {
    return (
        <div className="w-screen absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-screen backdrop-blur-2xl bg-opacity-10 bg-[#000000]">
            <div className="flex justify-center items-center h-full">
                <div className="relative">
                    <img src="./win.svg" alt="win" />
                    <p className="absolute bottom-[50px] left-[50%] -translate-x-[50%] uppercase bg-gradient-to-b from-[#F8DDA4] to-[#DB9A5F] raleway font-extrabold text-[24px] bg-clip-text text-transparent">
                        ${amount} USD
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WinComponent;
