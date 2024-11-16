export default function LoginPage() {
    return (
        <div className="overflow-hidden max-h-screen h-screen bg-[url('./bg-home.svg')] text-center flex flex-col items-center gap-96">
            <div className="w-[90%] pb-20 mt-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FBD07D] raleway">
                    Play BlackJack !
                </h1>
                <p className="text-[#FBD07D] text-[10px] max-w-md raleway">
                    Lorem ipsum dolor sit amet consectetur. Faucibus ullamcorper
                    facilisis Lorem ipsum dolor sit amet consectetur.
                </p>
            </div>
            <div className="-mt-20">
                <a
                    href="/user"
                    className="bg-gradient-to-b helvetica shadow-[0px_2px_2px_0px] shadow-[#A2AFA889] from-[#E7BD70] to-[#F3D495] text-base font-medium rounded-[10px] py-[10px] px-10"
                    onClick={() => console.log("Connect wallet clicked")}
                >
                    Connect Wallet
                </a>
            </div>
        </div>
    );
}
