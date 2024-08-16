import React from "react";

import s from "./Congratulations.module.scss";

import trophyIcon from "@icons/Colored/Basic_Trophy.svg";

function Congratulations() {
  return (
    <div className={s.Congratulations}>
      <div className={s.container}>
        <h1>Поздравляем!</h1>
        <img src={trophyIcon} alt="trophyIcon" />
        <div>Составляем список победителей</div>
      </div>
    </div>
  );
}

export default Congratulations;
