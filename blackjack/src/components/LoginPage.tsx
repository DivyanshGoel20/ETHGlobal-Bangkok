import { DynamicWidget, useDynamicContext, useTelegramLogin } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function LoginPage() {
    const { sdkHasLoaded, user, primaryWallet } = useDynamicContext();
    const { telegramSignIn } = useTelegramLogin();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // @ts-ignore
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!sdkHasLoaded) return;
        console.log('sdk loaded')

        const signIn = async () => {
            if (!user) {
                console.log('about to sign user in', user)
                await telegramSignIn({ forceCreateUser: true });
                console.log('signed in')
            }
            setIsLoading(false);
        };

        signIn();
    }, [sdkHasLoaded]);

    const startHandler = async () => {
        setLoading(true);
        try {
            // Simulate an async operation (replace with your actual logic)
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
            setTimeout(() => {
                navigate("/user"); // Navigate to /user page
            }, 3000); // Optional delay to show full-page loader
        } catch (error: any) {
            console.error(error);
            alert("An error occurred: " + error.message); // Show error alert
            setLoading(false); // Stop button loader on error
        }
    };

    return (
        <div className="overflow-hidden max-h-screen h-screen text-center flex flex-col justify-center items-center bg-[radial-gradient(50%_30%_at_50%_55%,#F3D495_-300%,#181A27_90%)]">
            <div className="w-[90%] pb-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FBD07D] raleway">
                    Play BlackJack!
                </h1>
                <p className="text-[#FBD07D] text-[10px] max-w-md raleway">
                    Lorem ipsum dolor sit amet consectetur. Faucibus ullamcorper
                    facilisis Lorem ipsum dolor sit amet consectetur.
                </p>
            </div>
            <img src="./home-img.svg" alt="21" />
            <div className="flex flex-col gap-6 mt-20">
                {isLoading ? <Loading loading={true}/> : <DynamicWidget innerButtonComponent={
                    <div className="-mt-20">
                        <a
                            className="bg-gradient-to-b helvetica shadow-[0px_2px_2px_0px] shadow-[#A2AFA889] from-[#E7BD70] to-[#F3D495] text-base font-medium rounded-[10px] py-[10px] px-10"
                            
                        >
                            Connect Wallet
                        </a>
                    </div>} />}
                    {primaryWallet &&  
                        <a
                            className="mt-9 bg-gradient-to-b helvetica shadow-[0px_2px_2px_0px] shadow-[#A2AFA889] from-[#E7BD70] to-[#F3D495] text-base font-medium rounded-[10px] py-[10px] px-10"
                            onClick={startHandler}
                        >
                            {loading? <Loading loading={true}/>: "Start!"}
                        </a>}
            </div>
        </div>
    );
}
