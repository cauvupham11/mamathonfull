import { Route, Routes } from "react-router-dom";
import IntroPage from "../pages/IntroPage";
import Backpack from "../components/Backpack";
import CombinedView from "../components/CombinedView";
import StartPage from "../pages/StartPage";
import WalletConnecting from "../components/WalletConnecting";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WalletConnecting />}/>
        <Route path="Intro" element={<IntroPage />} />
        <Route path="/backpack" element={<Backpack />} />
        <Route path="/Room" element={<CombinedView />} />
        <Route path="/Start" element={<StartPage />} />
      </Routes>
    </>
  );
};
export default Router;
