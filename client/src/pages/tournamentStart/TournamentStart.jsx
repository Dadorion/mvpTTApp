import React from "react";

import s from "./TournamentStart.module.scss";

import playIcon from "@icons/Colored/Tennis_play.svg";

function TournamentStart() {
  return (
    <div className={s.TournamentStart}>
      <div className={s.container}>
        <h1>Турнир сейчас начнётся!</h1>
        <img src={playIcon} alt="playIcon" />
        <div>Составляем список встреч</div>
      </div>
    </div>
  );
}

export default TournamentStart;
