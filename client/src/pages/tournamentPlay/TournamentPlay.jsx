import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import s from "./TournamentPlay.module.scss";

import Match from "components/Match/Match";

import InputScore from "components/InputScore/InputScore";

import { setLastMatchesTC } from "@reducers/matches-reducer";
import { addScoreToDataBaseTC } from "@reducers/matches-reducer";
import { closeTournamentTC } from "@reducers/tournament-reducer";
import CustomButtonBold from "components/CustomButtonBold/CustomButtonBold";
import CloseTournamentModal from "components/CloseTournamentModal/CloseTournamentModal";

function TournamentPlay() {
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  const lastMatches = useSelector((store) => store.matches.lastMatches);
  const fScore = useSelector((store) => store.matches.firstScoreInput);
  const sScore = useSelector((store) => store.matches.secondScoreInput);

  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(setLastMatchesTC());
      hasFetched.current = true;
    }
  }, [dispatch]);

  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [redirectToCongratulations, setRedirectToCongratulations] =
    useState(false);

  const handleClickOnMatch = (match) => {
    setSelectedMatch(match);
    setShowInput(true);
  };
  const handleAddScoreToDB = () => {
    const matchId = selectedMatch.id;
    dispatch(addScoreToDataBaseTC({ matchId, fScore, sScore }));
    dispatch(setLastMatchesTC());
    setShowInput(false);
  };
  const closeTournament = () => {
    dispatch(closeTournamentTC());
    setRedirectToCongratulations(true);
  };
  const handleCloseTournament = () => {
    setShowCloseModal(true);
  };
  const handleConfirmCloseTournament = () => {
    closeTournament();
    setShowCloseModal(false);
  };
  const handleCancelCloseTournament = () => {
    setShowCloseModal(false);
  };

  const readyMatches = lastMatches.filter(
    (match) => match.playersPair[0].score === null,
  );
  const doneMatches = lastMatches.filter(
    (match) => match.playersPair[0].score !== null,
  );
  const readyToClose =
    readyMatches.length === 0 &&
    doneMatches.length === lastMatches.length &&
    lastMatches.length !== 0;

  useEffect(() => {
    if (readyToClose) {
      dispatch(closeTournamentTC());
      hasFetched.current = true;
      setRedirectToCongratulations(true);
    }
  }, [dispatch, readyToClose]);

  const printReadyQueue = readyMatches.map((match) => {
    return (
      <Match
        key={match.id}
        players={match.playersPair}
        onClick={() => handleClickOnMatch(match)}
      />
    );
  });

  const printDoneQueue = doneMatches.map((match) => {
    return (
      <Match
        key={match.id}
        players={match.playersPair}
        onClick={() => handleClickOnMatch(match)}
      />
    );
  });

  if (redirectToCongratulations) {
    return <Navigate to="/congratulations" />;
  }

  return (
    <div className={s.TournamentPlay}>
      <h2>Турнир</h2>
      <div className={s.container}>
        <div className={s.item_match}>
          <p>Следующие встречи</p>
          <div className={s.matches}>{printReadyQueue}</div>
        </div>
        <div className={s.item_match}>
          <p>Завершенные</p>
          <div className={s.matches}>{printDoneQueue}</div>
        </div>
        <div className={s.button}>
          <CustomButtonBold
            title={"Завершить турнир"}
            onClick={handleCloseTournament}
          />
        </div>

        {showInput && (
          <InputScore
            match={selectedMatch}
            onSave={handleAddScoreToDB}
            onClose={() => setShowInput(false)}
          />
        )}
        {showCloseModal && <CloseTournamentModal onClose={handleCancelCloseTournament} onSave={handleConfirmCloseTournament}/>}
      </div>
    </div>
  );
}

export default TournamentPlay;
