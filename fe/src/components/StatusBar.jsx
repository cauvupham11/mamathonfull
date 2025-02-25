import React from "react";
import { FaSmile, FaUtensils, FaBed, FaMoon } from "react-icons/fa";
const StatusBar = ({ updateStatus }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Nền mờ
        padding: "1rem 0",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 20,
      }}
    >
      <div
        onClick={() => updateStatus("Happy")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <FaSmile style={{ fontSize: "1.5rem", color: "#FFD700" }} />
        <span style={{ color: "#FFF", fontSize: "0.75rem" }}>Happy</span>
      </div>
      <div
        onClick={() => updateStatus("Hungry")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <FaUtensils style={{ fontSize: "1.5rem", color: "#32CD32" }} />
        <span style={{ color: "#FFF", fontSize: "0.75rem" }}>Hungry</span>
      </div>
      <div
        onClick={() => updateStatus("Tired")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <FaBed style={{ fontSize: "1.5rem", color: "#1E90FF" }} />
        <span style={{ color: "#FFF", fontSize: "0.75rem" }}>Tired</span>
      </div>
      <div
        onClick={() => updateStatus("Resting")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <FaMoon style={{ fontSize: "1.5rem", color: "#9370DB" }} />
        <span style={{ color: "#FFF", fontSize: "0.75rem" }}>Resting</span>
      </div>
    </div>
  );
};

export default StatusBar;
