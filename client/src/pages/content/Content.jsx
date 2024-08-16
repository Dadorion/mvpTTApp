import React from "react";
import { Route, Routes } from "react-router-dom";

import s from "./Content.module.scss"

import StartPage from "../startPage/StartPage";
import HomePage from "../homePage/HomePage";
import Profile from "../profile/Profile";
import Tabbar from "../../components/Tabbar/Tabbar";
import Tournament from "../tournament/Tournament";
import TournamentPlay from "../tournamentPlay/TournamentPlay";
import TournamentResults from "../tournamentResults/TournamentResults";
import Players from "../players/Players";
import Congratulations from "../Congratulations/Congratulations";

function Content() {
  return (
    <div className={s.Content}>
      <Routes>
        <Route path="/" element={<StartPage />} />
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route path="/home" element={<TournamentResults />} />
        <Route path="/tournaments" element={<Tournament />} />
        <Route path="/tournament-play" element={<TournamentPlay />} />
        <Route path="/congratulations" element={<Congratulations />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/players" element={<Players />} />
      </Routes>
      <Tabbar />
    </div>
  );
}

export default Content;
