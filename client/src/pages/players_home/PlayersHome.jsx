import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setAllUserPlayersTC,
  addNewUserPlayerTC,
  changeUserPlayers,
  changeCountPlayers,
} from "@reducers/players-reducer";

import s from "./PlayersHome.module.scss";

import plusIcon from "@icons/Colored/Plus.svg";

import Header from "@components/header/Header";
import CheckBox from "@components/CheckBox/CheckBox";
import Sorter from "components/Sorter/Sorter";

function Players() {
  const dispatch = useDispatch();

  const playersState = useSelector((store) => store.players.allUserPlayers);

  if (playersState.length === 0) {
    dispatch(setAllUserPlayersTC());
  }

  const [showInput, setShowInput] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerSurname, setNewPlayerSurname] = useState("");

  useEffect(() => {
    const count = playersState.filter((player) => player.isChecked).length;
    dispatch(changeCountPlayers(count));
  }, [playersState, dispatch]);

  const handleChangeCheckBox = (id) => {
    dispatch(
      changeUserPlayers(
        playersState.map((player) =>
          player.id === id
            ? {
                ...player,
                isChecked: !player.isChecked,
              }
            : player,
        ),
      ),
    );
  };

  const handleUncheckCheckBox = () => {
    dispatch(
      changeUserPlayers(
        playersState.map((player) => {
          return {
            ...player,
            isChecked: false,
          };
        }),
      ),
    );
    dispatch(changeCountPlayers(0));
  };

  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  const handleAddPlayer = () => {
    if (newPlayerName && newPlayerSurname) {
      dispatch(addNewUserPlayerTC(newPlayerName, newPlayerSurname));
      setNewPlayerName("");
      setNewPlayerSurname("");
      setShowInput(false);
    }
  };

  const printPlayers = playersState.map((player) => {
    return (
      <CheckBox
        key={player.id}
        label={`${player.p_name} ${player.p_surname}`}
        isChecked={player.isChecked}
        onChange={() => handleChangeCheckBox(player.id)}
        disabled
      />
    );
  });

  return (
    <div className={s.Players}>
      <Header
        headName={"Все мои игроки"}
        leftBtnLink={"home"}
        leftBtnHandler={handleUncheckCheckBox}
      />

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
            onChange={(e) => setNewPlayerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Фамилия"
            value={newPlayerSurname}
            onChange={(e) => setNewPlayerSurname(e.target.value)}
          />
          <img src={plusIcon} alt="plusIcon" onClick={handleAddPlayer} />
        </div>
      )}

      <div className={s.list_players}>{printPlayers}</div>
    </div>
  );
}

export default Players;
