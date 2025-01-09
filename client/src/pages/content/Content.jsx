import React from "react";
import { Route, Routes } from "react-router-dom";

import s from "./Content.module.scss";

import HomePage from "../homePage/HomePage";
import Preference from "../preference/Preference";
import Profile from "pages/profile/Profile";
import Tabbar from "../../components/Tabbar/Tabbar";
import Tournament from "../tournament/Tournament";
import TournamentPlay from "../tournamentPlay/TournamentPlay";
import TournamentSummary from "../TournamentSummary/TournamentSummary";
import PlayersHome from "../players_home/PlayersHome";
import Players from "../players/Players";
import Congratulations from "../Congratulations/Congratulations";
import TournamentStart from "pages/tournamentStart/TournamentStart";

function Content() {
  return (
    <div className={s.Content}>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/tournaments" element={<Tournament />} />
        <Route path="/preference" element={<Preference />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tournament-start" element={<TournamentStart />} />
        <Route path="/tournament-play" element={<TournamentPlay />} />
        <Route path="/congratulations" element={<Congratulations />} />
        <Route path="/tournament-summary" element={<TournamentSummary />} />

        <Route path="/players" element={<Players />} />
        <Route path="/players-home" element={<PlayersHome />} />
      </Routes>
      <Tabbar />
    </div>
  );
}

export default Content;
