import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WalletConnecting from "../components/WalletConnecting";
import StartButton from "../components/StartButton";
import Notification from "../components/Notification"; // Import Notification
import WelcomeMessage from "../components/Welcome";
// Import WelcomeMessage

const IntroPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [skipTriggered, setSkipTriggered] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "",
  });
  const [showWelcome, setShowWelcome] = useState(false); // Hiển thị WelcomeMessage
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const navigate = useNavigate();

  const handleConnectionSuccess = () => {
    setIsConnected(true);
    showNotification("Kết nối ví thành công!", "success");
  };

  const handleStart = () => {
    setHasStarted(true);
    if (videoRef.current && audioRef.current) {
      videoRef.current.play();
      audioRef.current.play();
    }
    showNotification("Bắt đầu thành công!", "success");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        setSkipTriggered(true);
        showNotification("Navigating to Room...", "info");
        if (videoRef.current) {
          videoRef.current.pause();
        }
        if (audioRef.current) {
          audioRef.current.pause();
        }
        triggerWelcome();
      }, 3000); // 3 seconds hold

      // Start progress
      progressIntervalRef.current = setInterval(() => {
        setHoldProgress((prev) => Math.min(prev + 1.67, 100));
      }, 50);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter" && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      clearInterval(progressIntervalRef.current);
      timeoutRef.current = null;
      progressIntervalRef.current = null;
      setHoldProgress(0);
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    showNotification("Video ended. Navigating to Room...", "info");
    triggerWelcome();
  };

  const triggerWelcome = () => {
    setShowWelcome(true); // Hiển thị WelcomeMessage
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    navigate("/Room"); // Điều hướng sau khi WelcomeMessage kết thúc
  };

  const showNotification = (message, type) => {
    setNotification({ open: true, message, type });
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (videoEnded && hasStarted) {
      videoRef.current && videoRef.current.pause();
      audioRef.current && audioRef.current.pause();
    }
  }, [videoEnded]);

  return (
    <div
      className="relative min-h-screen min-w-full bg-black overflow-hidden"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <Notification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />
      {!isConnected ? (
        <WalletConnecting onConnectSuccess={handleConnectionSuccess} />
      ) : !hasStarted ? (
        <StartButton onStart={handleStart} />
      ) : (
        <>
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-screen h-screen object-contain"
            src="/video/6208926054757.mp4"
            autoPlay
            controls={false}
            onEnded={handleVideoEnd}
          />
          <audio ref={audioRef} src="/audio/background.mp3" loop />
          {!videoEnded && !skipTriggered && (
            <div className="absolute top-4 right-4 flex items-center gap-2 text-white">
              <div className="relative">
                <div
                  className="w-10 h-10 border-4 border-gray-500 rounded-full flex items-center justify-center"
                  style={{
                    background: `conic-gradient(#4caf50 ${holdProgress}%, #ccc ${holdProgress}%)`,
                    transition: "background 50ms linear",
                  }}
                >
                  ⏎
                </div>
              </div>
              <p className="text-sm">Hold Enter to skip</p>
            </div>
          )}
          {showWelcome && <WelcomeMessage onComplete={handleWelcomeComplete} />}
        </>
      )}
    </div>
  );
};

export default IntroPage;
