const WinComponent = () => {
    return (
        <div className="w-screen absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-screen backdrop-blur-2xl bg-opacity-10 bg-[#000000]">
            <div className="flex justify-center items-center h-full">
                <img src="./win.svg" alt="win" />
            </div>
        </div>
    );
};

export default WinComponent;
