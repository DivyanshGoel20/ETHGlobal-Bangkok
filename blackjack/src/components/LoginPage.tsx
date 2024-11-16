import { DynamicWidget, useDynamicContext, useTelegramLogin } from "@dynamic-labs/sdk-react-core";
import { h1 } from "motion/react-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function LoginPage() {
    const { sdkHasLoaded, user, primaryWallet } = useDynamicContext();
    const { telegramSignIn } = useTelegramLogin();
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
    return (
        <div className="overflow-hidden max-h-screen h-screen bg-[url('./bg-home.svg')] bg-no-repeat bg-cover text-center flex flex-col items-center gap-96">
            <div className="w-[90%] pb-20 mt-36">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FBD07D] raleway">
                    Play BlackJack !
                </h1>
                <p className="text-[#FBD07D] text-[10px] max-w-md raleway">
                    Lorem ipsum dolor sit amet consectetur. Faucibus ullamcorper
                    facilisis Lorem ipsum dolor sit amet consectetur.
                </p>
            </div>
            <div className="flex flex-col gap-6 -mt-20">
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
                            onClick={() => { navigate("/user");}}
                        >
                            Start!
                        </a>}
            </div>
        </div>
    );
}
