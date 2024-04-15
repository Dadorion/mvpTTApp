import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "../startPage/StartPage";
import HomePage from "../homePage/HomePage";
import Profile from "../profile/Profile";
import Tabbar from "../../components/Tabbar/Tabbar";
import Tournament from "../tournament/Tournament";

function Content() {
  return (
    <div className="Content">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/counter" element={<Tournament />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Tabbar />
    </div>
  );
}

export default Content;
