import React, { useState } from "react";

import s from "./Match.module.scss";

function Match({ players, score, onClick }) {
  const [firsScore, setFirstScore] = useState(2);
  const [secondScore, setSecondScore] = useState(1);

  const firstPlayer = `${players[0].p_name} ${players[0].p_surname}`;
  const secondPlayer = `${players[1].p_name} ${players[1].p_surname}`;

  return (
    <div className={s.Match} onClick={onClick}>
      {score && (
        <div className={s.slot}>
          <div className={s.name_left}>{firstPlayer}</div>
          <div className={s.scoring}>
            <div className={s.inp}>{firsScore}</div>:
            <div className={s.inp}>{secondScore}</div>
          </div>
          <div className={s.name_right}>{secondPlayer}</div>
        </div>
      )}

      {!score && (
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
