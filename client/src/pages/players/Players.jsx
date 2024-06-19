import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setAllUserPlayersTC,
  addNewUserPlayerTC,
  changeUserPlayers,
} from "@reducers/players-reducer";

import s from "./Players.module.scss";
import UserIndicator from "@components/UserIndicator/UserIndicator";

import swapIcon from "@icons/Black/Light/Swap_light.svg";
import searchIcon from "@icons/Black/Light/Search_light.svg";
import plusIcon from "@icons/Colored/Plus.svg";

import Header from "@components/Header/Header";
import CheckBox from "@components/CheckBox/CheckBox";
import CustomButton from "@components/CustomButton/CustomButton";

function Players() {
  const dispatch = useDispatch();

  const playersState = useSelector((store) => store.players.allUserPlayers);

  if (playersState.length === 0) {
    dispatch(setAllUserPlayersTC());
  }

  const [countPlayers, setCountPlayers] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerSurname, setNewPlayerSurname] = useState("");

  useEffect(() => {
    const count = playersState.filter((player) => player.isChecked).length;
    setCountPlayers(count);
  }, [playersState]);

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
  const handleConfirmPlayer = () => {
    dispatch(setAllUserPlayersTC());
  };

  const countColor = countPlayers < 2 ? s.countError : s.countSuccess;

  const printPlayers = playersState.map((player) => {
    return (
      <CheckBox
        key={player.id}
        label={`${player.p_name} ${player.p_surname}`}
        isChecked={player.isChecked}
        onChange={() => handleChangeCheckBox(player.id)}
      />
    );
  });

  return (
    <div className={s.Players}>
      <Header headName={"Выбор участников"} leftBtn={"tournaments"} />

      <div className={s.check_counter}>
        <div className={s.indicator}>
          <UserIndicator count={countPlayers} />
          <div className={countColor}>{countPlayers}</div>
        </div>
        <span onClick={handleUncheckCheckBox}>Снять все</span>
      </div>

      <div className={s.sort}>
        <div className={s.swap}>
          <img src={swapIcon} alt="swapIcon" />
          Последние
        </div>
        <img src={searchIcon} alt="searchIcon" />
      </div>

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

      <div className={s.confirm_btn}>
        <CustomButton
          title="Добавить участников"
          disabled={countPlayers < 2}
          onClick={handleConfirmPlayer}
        />
      </div>
    </div>
  );
}

export default Players;
