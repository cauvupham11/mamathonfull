import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import WalletConnect from "../components/WalletConnecting";
import IntroPage from "../pages/IntroPage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<WalletConnect />} />
        <Route path="/intro" element={<IntroPage />} />
      </Routes>
    </>
  );
};

export default Router;
