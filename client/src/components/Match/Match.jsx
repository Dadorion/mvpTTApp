import React from "react";

import s from "./Match.module.scss";

function Match({ players, onClick }) {
  const firsScore = players[0].score;
  const secondScore = players[1].score;

  const isScore = firsScore >= 0 && secondScore >= 0;

  const firstPlayer = `${players[0].name} ${players[0].surname}`;
  const secondPlayer = `${players[1].name} ${players[1].surname}`;

  return (
    <div className={s.Match} onClick={onClick}>
      {isScore && (
        <div className={s.slot}>
          <div className={s.name_left}>{firstPlayer}</div>
          <div className={s.scoring}>
            <div className={s.inp}>{firsScore}</div>
            <div>:</div>
            <div className={s.inp}>{secondScore}</div>
          </div>
          <div className={s.name_right}>{secondPlayer}</div>
        </div>
      )}

      {!isScore && (
        <div className={s.slot}>
          <div className={s.name_left}>{firstPlayer}</div>
          <div className={s.scoring}>
            <div>—</div>:<div>—</div>
          </div>
          <div className={s.name_right}>{secondPlayer}</div>
        </div>
      )}
    </div>
  );
}

export default Match;
