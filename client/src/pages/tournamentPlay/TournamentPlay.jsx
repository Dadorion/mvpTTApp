import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "./TournamentPlay.module.scss";

import Match from "components/Match/Match";

import InputScore from "components/InputScore/InputScore";

import { setLastMatchesTC } from "@reducers/matches-reducer";
import { addScoreToDataBaseTC } from "services/redux/reducers/matches-reducer";

function TournamentPlay() {
  const dispatch = useDispatch();

  const lastMatches = useSelector((store) => store.matches.lastMatches);
  const fScore = useSelector((store) => store.matches.firstScoreInput);
  const sScore = useSelector((store) => store.matches.secondScoreInput);

  if (lastMatches.length === 0) {
    dispatch(setLastMatchesTC());
  }

  const [showInput, setShowInput] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleClickOnMatch = (match) => {
    console.log(match);
    setSelectedMatch(match);
    setShowInput(true);
  };
  const handleAddScoreToDB = () => {
    const matchId = selectedMatch.id;
    dispatch(addScoreToDataBaseTC({ matchId, fScore, sScore }));
    setShowInput(false);
  };

  const printQueue = lastMatches.map((match) => {
    return (
      <Match
        key={match.id}
        players={match.playersPair}
        onClick={() => handleClickOnMatch(match)}
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

        {showInput && (
          <InputScore match={selectedMatch} clickBtn={handleAddScoreToDB} />
        )}
      </div>
    </div>
  );
}

export default TournamentPlay;
