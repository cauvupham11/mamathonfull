import React from "react";
import "../css/WalletConnecting.css";
const StartButton = ({ onStart }) => {
  return (
    <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 animate-gradient z-0"></div>

      <button
        className="relative z-10 px-8 py-4 bg-purple-600 text-white text-2xl font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-110 animate-fade-in"
        onClick={onStart}
      >
        Begin
      </button>
    </div>
  );
};

export default StartButton;
