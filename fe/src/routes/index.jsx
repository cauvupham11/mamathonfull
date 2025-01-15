import { Route, Routes } from "react-router-dom";
import IntroPage from "../pages/IntroPage";
import Backpack from "../components/Backpack";
import CombinedView from "../components/CombinedView";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/backpack" element={<Backpack />} />
        <Route path="/Room" element={<CombinedView />} />
      </Routes>
    </>
  );
};

export default Router;
