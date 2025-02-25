import React, { useEffect, useState } from "react";
import "../css/WalletConnecting.css";
const WelcomeMessage = ({ onComplete }) => {
  const [animationClass, setAnimationClass] = useState("slide-in");

  useEffect(() => {
    // Sau 2.5 giây, kích hoạt animation slide-out
    const slideOutTimer = setTimeout(() => {
      setAnimationClass("slide-out");
    }, 2500);

    // Gọi hàm onComplete sau 3 giây
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);

    // Cleanup timers
    return () => {
      clearTimeout(slideOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-black z-50 ${animationClass}`}
    >
      <h1
        className="text-6xl font-bold text-transparent bg-clip-text animate-pulse"
        style={{
          backgroundImage: "linear-gradient(to right, #FF8A00, #E52E71)",
        }}
      >
        WELCOME TO COSMORIA
      </h1>
    </div>
  );
};
export default WelcomeMessage;
