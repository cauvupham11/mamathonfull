import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import IntroPage from "../pages/IntroPage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Begin" element={<IntroPage />} />
      </Routes>
    </>
  );
};

export default Router;
