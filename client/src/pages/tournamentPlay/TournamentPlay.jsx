import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";

import s from "./TournamentPlay.module.scss";

import Match from "components/Match/Match";

import makeQueue from "services/queueAlg/queueAlg";
import InputScore from "components/InputScore/InputScore";

function TournamentPlay() {
  // const dispatch = useDispatch();

  const [showInput, setShowInput] = useState(false);

  const players = useSelector((store) => store.players.checkedPlayers);

  const queue = makeQueue(players);

  const handleClickOnMatch = (e) => {
    console.log(e);
  };

  const printQueue = queue.map((match) => {
    return (
      <Match
        key={match.id}
        players={match.playersPair}
        onClick={handleClickOnMatch}
      />
    );
  });

  return (
    <div className={s.TournamentPlay}>
      <h2>Турнир</h2>
      <div className={s.container}>
        <div className={s.item_match}>
          <p>Следующие встречи</p>
          <div className={s.matches}>{printQueue}</div>
        </div>
        <div className={s.item_match}>
          <p>Завершенные</p>
          <div className={s.matches}></div>
        </div>

        {showInput && <InputScore />}
      </div>
    </div>
  );
}

export default TournamentPlay;
