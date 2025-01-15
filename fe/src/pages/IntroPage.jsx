import { useState, useRef } from "react";
import WalletConnecting from "../components/WalletConnecting";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IntroPage = () => {
  const [isConnected, setIsConnected] = useState(false); // Kiểm tra trạng thái kết nối ví
  const [hasStarted, setHasStarted] = useState(false); // Kiểm tra trạng thái bắt đầu
  const [skipTriggered, setSkipTriggered] = useState(false); // Trạng thái bỏ qua video
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);


  const handleConnectionSuccess = () => {
    setIsConnected(true); // Đánh dấu ví đã được kết nối
  };

  const handleStart = () => {
    setHasStarted(true);
    if (videoRef.current && audioRef.current) {
      videoRef.current.play();
      audioRef.current.play();
    }

    // Hiển thị thông báo khi bắt đầu
    toast.success("Bắt đầu thành công!");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !timeoutRef.current) {
      // Bắt đầu đếm thời gian khi giữ phím Enter
      timeoutRef.current = setTimeout(() => {
        setSkipTriggered(true);
        toast.info("Video has skipped !!!");
        setHasStarted(false); // Bỏ qua video và trở về giao diện chính

        // Dừng video và audio
        if (videoRef.current) {
          videoRef.current.pause();
        }
        if (audioRef.current) {
          audioRef.current.pause();
        }

        timeoutRef.current = null;
      }, 5000); // 5 giây
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter" && timeoutRef.current) {
      // Dừng đếm thời gian khi nhả phím Enter
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <div
      className="relative min-h-screen min-w-full bg-black overflow-hidden"
      tabIndex={0} // Đảm bảo div có thể nhận sự kiện bàn phím
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <ToastContainer />
      {!isConnected ? (
        // Hiển thị component WalletConnecting nếu chưa kết nối ví
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
          {/* Hiển thị video và audio khi nhấn nút "Bắt đầu" */}
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-screen h-screen object-contain"
            src="/video/6208926054757.mp4"
            autoPlay
            loop
            controls={false}
          />
          <audio ref={audioRef} src="/audio/background.mp3" loop />
          {skipTriggered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <p className="text-white text-2xl">Video has skipped !!!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default IntroPage;
