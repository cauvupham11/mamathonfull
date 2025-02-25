import React from "react";
import Room from "../pages/Room";
import AvatarStatus from "../components/AvatarStatus";
import Coin from "../components/Coin";
import Menu from "../components/Menu";
import StatusBar from "../components/StatusBar"; // Import StatusBar

const CombinedView = () => {
  const updateStatus = (status) => {
    console.log(`Status updated to: ${status}`); // Hàm thay đổi trạng thái
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Giao diện 3D */}
      <Room />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          pointerEvents: "auto", // Cho phép tương tác
        }}
      >
        {/* Avatar + Status */}
        <AvatarStatus />

        {/* Coin */}
        <Coin />

        {/* Menu */}
        <Menu />
      </div>

      {/* Thanh trạng thái phía dưới */}
      <StatusBar updateStatus={updateStatus} />
    </div>
  );
};
export default CombinedView;
