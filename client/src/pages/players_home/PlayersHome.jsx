import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  setAllUserPlayersTC,
  addNewUserPlayerTC,
  changeCountPlayers,
} from "@reducers/players-reducer";

import s from "./PlayersHome.module.scss";
import plusIcon from "@icons/Colored/Plus.svg";

import Header from "@components/header/Header";
import Sorter from "components/Sorter/Sorter";

function Players() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const playersState = useSelector((store) => store.players.allUserPlayers);

  const [showInput, setShowInput] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerSurname, setNewPlayerSurname] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [wasChangedName, setWasChangedName] = useState(false);
  const [wasChangedSurname, setWasChangedSurname] = useState(false);

  const trimmedName = newPlayerName.trim();
  const trimmedSurname = newPlayerSurname.trim();

  useEffect(() => {
    if (playersState.length === 0) {
      dispatch(setAllUserPlayersTC());
    }
  }, [playersState.length, dispatch]);

  useEffect(() => {
    const count = playersState.filter((player) => player.isChecked).length;
    dispatch(changeCountPlayers(count));
  }, [playersState, dispatch]);

  useEffect(() => {
    if (wasChangedName) {
      setNameError(!trimmedName);
    }
    if (wasChangedSurname) {
      setSurnameError(!trimmedSurname);
    }
  }, [trimmedName, trimmedSurname, wasChangedName, wasChangedSurname]);

  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  const handleAddPlayer = () => {
    setNameError(!trimmedName);
    setSurnameError(!trimmedSurname);

    if (!trimmedName || !trimmedSurname) {
      setErrorMessage("Имя и фамилия не могут быть пустыми!");
      return;
    }

    dispatch(addNewUserPlayerTC(trimmedName, trimmedSurname));
    setNewPlayerName("");
    setNewPlayerSurname("");
    setShowInput(false);
  };

  const handleChangeName = (name) => {
    setNewPlayerName(name);
    setNameError(!trimmedName);
    setWasChangedName(true);
  };

  const handleChangeSurname = (surname) => {
    setNewPlayerSurname(surname);
    setSurnameError(!trimmedSurname);
    setWasChangedSurname(true);
  };

  const handleClickPlayer = (id) => {
    navigate(`/player-${id}`);
  };

  const printPlayers = playersState.map((player) => (
    <div
      key={player.id}
      className={s.playerItem}
      onClick={() => handleClickPlayer(player.id)}
    >
      {`${player.p_name} ${player.p_surname}`}
    </div>
  ));

  return (
    <div className={s.Players}>
      <Header headName={"Все мои игроки"} leftBtnLink={"home"} />

      <Sorter />

      {!showInput && (
        <div className={s.add_player_btn} onClick={handleShowInput}>
          <img src={plusIcon} alt="plusIcon" />
          Добавить нового игрока
        </div>
      )}
      {showInput && (
        <div className={s.add_player_inputs}>
          <input
            type="text"
            placeholder="Имя"
            value={newPlayerName}
            onChange={(e) => handleChangeName(e.target.value)}
            className={nameError ? s.inputError : ""}
          />
          <input
            type="text"
            placeholder="Фамилия"
            value={newPlayerSurname}
            onChange={(e) => handleChangeSurname(e.target.value)}
            className={surnameError ? s.inputError : ""}
          />
          <img src={plusIcon} alt="plusIcon" onClick={handleAddPlayer} />
        </div>
      )}
      {errorMessage && <div className={s.error}>{errorMessage}</div>}

      <div className={s.list_players}>{printPlayers}</div>
    </div>
  );
}

export default Players;
