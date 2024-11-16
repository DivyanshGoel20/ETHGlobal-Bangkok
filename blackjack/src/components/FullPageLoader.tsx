import { useEffect, useState } from "react";

const FullPageLoader = ({ loading = true }: { loading: boolean | undefined }) => {
  const [cd, setCd] = useState(3); // Start countdown at 3

  useEffect(() => {
    const audio = new Audio('/countdown.mp3');
    audio.play();
  }, []);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCd((prev) => {
          if (prev > 0) {
            return prev - 1; // Decrement countdown
          } else {
            clearInterval(interval); // Clear interval when countdown ends
            return prev;
          }
        });
      }, 1000); // 1-second interval

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [loading]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {cd === 3 && <img src="./3.svg" alt="3" className="smalltobig opacity-1" />}
      {cd === 2 && <img src="./2.svg" alt="2" className="smalltobig opacity-1" />}
      {cd === 1 && <img src="./1.svg" alt="1" className="smalltobig opacity-1" />}
      {cd === 0 && <img src="./0.svg" alt="0" className="smalltobig opacity-1" />}
    </div>
  );
};

export default FullPageLoader;
