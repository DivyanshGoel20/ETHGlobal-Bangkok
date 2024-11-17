import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Table from "./components/Table";
import Test from "./components/Test";
// @ts-ignore
import { DynamicWidget, useDynamicContext, useEmbeddedReveal, useTelegramLogin } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";

function App() {
    const { sdkHasLoaded, user } = useDynamicContext();
    const { telegramSignIn } = useTelegramLogin();
    // @ts-ignore
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!sdkHasLoaded) return;

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
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/user" element={<Table />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
