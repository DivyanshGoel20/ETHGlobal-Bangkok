// import { useState } from "react";
// import Loading from "./Loading";
// export default function LoginPage() {
//     const [loading, setLoading] = useState(false)
//     const connectWalletHandler = () => {
//         setLoading(true)
//         try {
            
//         } catch (error) {
//             console.error(error)
//             setLoading(false)
//         }
//     }
//     return (
//         <div className="overflow-hidden max-h-screen h-screen bg-[url('./bg-home.svg')] text-center flex flex-col items-center gap-96">
//             <div className="w-[90%] pb-20 mt-20">
//                 <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FBD07D] raleway">
//                     Play BlackJack !
//                 </h1>
//                 <p className="text-[#FBD07D] text-[10px] max-w-md raleway">
//                     Lorem ipsum dolor sit amet consectetur. Faucibus ullamcorper
//                     facilisis Lorem ipsum dolor sit amet consectetur.
//                 </p>
//             </div>
//             <div className="-mt-20">
//                 <a
//                     href="/user"
//                     className="bg-gradient-to-b helvetica shadow-[0px_2px_2px_0px] shadow-[#A2AFA889] from-[#E7BD70] to-[#F3D495] text-base font-medium rounded-[10px] py-[10px] px-10"
//                     onClick={connectWalletHandler}
//                 >
//                     Connect Wallet
//                 </a>
//             </div>
//         </div>
//     );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const connectWalletHandler = async () => {
        setLoading(true);
        try {
            // Simulate an async operation (replace with your actual logic)
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
            setTimeout(() => {
                navigate("/user"); // Navigate to /user page
            }, 3000); // Optional delay to show full-page loader
        } catch (error) {
            console.error(error);
            alert("An error occurred: " + error.message); // Show error alert
            setLoading(false); // Stop button loader on error
        }
    };

    return (
        <div className="overflow-hidden max-h-screen h-screen bg-[url('./bg-home.svg')] text-center flex flex-col items-center gap-96">

                    <div className="w-[90%] pb-20 mt-20">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#FBD07D] raleway">
                            Play BlackJack!
                        </h1>
                        <p className="text-[#FBD07D] text-[10px] max-w-md raleway">
                            Lorem ipsum dolor sit amet consectetur. Faucibus ullamcorper
                            facilisis Lorem ipsum dolor sit amet consectetur.
                        </p>
                    </div>
                    <div className="-mt-20">
                        <button
                            className="bg-gradient-to-b helvetica shadow-[0px_2px_2px_0px] shadow-[#A2AFA889] from-[#E7BD70] to-[#F3D495] text-base font-medium rounded-[10px] py-[10px] px-10 hover:bg-gradient-to-t"
                            onClick={connectWalletHandler}
                            disabled={loading}
                        >
                            {loading ? <Loading loading /> : "Connect Wallet"}
                        </button>
                    </div>


        </div>
    );
}
