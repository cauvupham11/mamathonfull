import { useState, useRef } from "react";
import WalletConnecting from "../components/WalletConnecting";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IntroPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const handleConnectionSuccess = () => {
    setIsConnected(true);
  };

  const handleStart = () => {
    setHasStarted(true);
    if (videoRef.current && audioRef.current) {
      videoRef.current.play();
      audioRef.current.play();
    }

    toast.success("Bắt đầu thành công!");
  };

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      <ToastContainer />
      {!isConnected ? (
        <WalletConnecting onConnectSuccess={handleConnectionSuccess} />
      ) : !hasStarted ? (
        <div className="flex items-center justify-center h-full">
          <button
            className="px-6 py-3 bg-purple-500 text-white text-xl rounded shadow-lg hover:bg-purple-600"
            onClick={handleStart}
          >
            Bắt đầu
          </button>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="/video/6208926054757.mp4"
            autoPlay
            loop
            controls={false}
          />
          <audio ref={audioRef} src="/audio/background.mp3" loop />
        </>
      )}
    </div>
  );
};

export default IntroPage;
