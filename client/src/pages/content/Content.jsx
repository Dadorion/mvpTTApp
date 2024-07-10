import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "../startPage/StartPage";
import HomePage from "../homePage/HomePage";
import Profile from "../profile/Profile";
import Tabbar from "../../components/Tabbar/Tabbar";
import Tournament from "../tournament/Tournament";
import TournamentPlay from "../tournamentPlay/TournamentPlay";
import Players from "../players/Players";

function Content() {
  return (
    <div className="Content">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/tournaments" element={<Tournament />} />
        <Route path="/tournament-play" element={<TournamentPlay />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/players" element={<Players />} />
      </Routes>
      <Tabbar />
    </div>
  );
}

export default Content;
