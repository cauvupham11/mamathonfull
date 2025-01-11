import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import WalletConnect from "../components/WalletConnecting";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<WalletConnect />} />
      </Routes>
    </>
  );
};

export default Router;
