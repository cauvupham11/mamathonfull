import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
import '../css/StartPage.css';

// Import video từ thư mục assets
import introVideo from '../assets/Intro.mp4';

const StartPage = () => {
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();  // Sử dụng useNavigate để điều hướng

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Lấy frame cuối của video làm ảnh nền
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageUrl = canvas.toDataURL();

    // Đặt ảnh cuối của video làm hình nền
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  };

  // Hàm khi nhấn nút Start
  const handleStartClick = () => {
    // Chuyển hướng đến trang /Room thay vì /Intro
    navigate("/Room");
  };

  return (
    <div className="video-background">
      {/* Video được hiển thị khi trang tải */}
      {!isVideoEnded && (
        <video
          ref={videoRef}
          onEnded={handleVideoEnd}
          autoPlay
          muted
          loop={false}
        >
          <source
            src={introVideo} // Sử dụng video đã import
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Hiển thị heading sau khi video kết thúc */}
      {isVideoEnded && (
        <motion.h1
          className="luminous-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
        >
          Welcome to NFT TAMAGOCHI
        </motion.h1>
      )}

      {/* Hiển thị nút Start */}
      {isVideoEnded && (
        <motion.button
          onClick={handleStartClick}  // Gọi hàm khi nhấn nút Start
          className="start-button"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 10 }} /* Thêm xoay và phóng to khi hover */
          whileTap={{ scale: 0.95 }} /* Giảm kích thước khi nhấn */
          transition={{ delay: 1.5, duration: 1, type: "spring", stiffness: 100 }}
        >
          Start
        </motion.button>
      )}
    </div>
  );
};

export default StartPage;
