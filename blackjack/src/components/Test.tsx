import { DynamicWidget, useDynamicContext, useTelegramLogin } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";



function Test() {
    const { sdkHasLoaded, user } = useDynamicContext();
    const { telegramSignIn } = useTelegramLogin();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!sdkHasLoaded) return;

        const signIn = async () => {
            if (!user) {
                await telegramSignIn({ forceCreateUser: true });
            }
            setIsLoading(false);
        };

        signIn();
    }, [sdkHasLoaded]);

    return (

        <div>
            {isLoading ? "Loadingg....." : <DynamicWidget />}
        </div>
    )
}

export default Test