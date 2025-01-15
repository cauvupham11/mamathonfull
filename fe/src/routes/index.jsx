import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import IntroPage from "../pages/IntroPage";
import Room from "../pages/Room";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Begin" element={<IntroPage />} />
        <Route path="/Room" element={<Room />} />
      </Routes>
    </>
  );
};

export default Router;
