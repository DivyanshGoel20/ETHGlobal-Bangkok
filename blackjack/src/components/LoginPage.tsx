export default function LoginPage() {
    return (
        <div className="max-h-screen h-screen bg-gradient-to-b from-gray-900 to-black text-center px-4 py-12 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
                Play BlackJack !
            </h1>
            <p className="text-amber-100/80 max-w-md mb-12">
                Lorem ipsum dolor sit amet consectetur. Faucibus ullamcorper
                facilisis Lorem ipsum dolor sit amet consectetur.
            </p>

            <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12">
                <img
                    src="/placeholder.svg?height=320&width=320"
                    alt="BlackJack Blitz Logo"
                    width={320}
                    height={320}
                    className="animate-pulse-slow"
                />
            </div>

            <button
                className="px-8 py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-amber-400 hover:to-yellow-500 text-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25"
                onClick={() => console.log("Connect wallet clicked")}
            >
                Connect Wallet
            </button>
        </div>
    );
}
