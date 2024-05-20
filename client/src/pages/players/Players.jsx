import React, { useState, useEffect } from "react";

import s from "./Players.module.scss";
import UserIndicator from "@components/UserIndicator/UserIndicator";

import swapIcon from "@icons/Black/Light/Swap_light.svg";
import searchIcon from "@icons/Black/Light/Search_light.svg";
import plusIcon from "@icons/Colored/Plus.svg";

import Header from "components/Header/Header";
import CheckBox from "components/CheckBox/CheckBox";
import CustomButton from "components/CustomButton/CustomButton";

function Players() {
  const playersAnswer = [
    {
      id: 1,
      isChecked: false,
      name: "Алексей",
      surname: "Иванов",
    },
    {
      id: 2,
      isChecked: false,
      name: "Мария",
      surname: "Петрова",
    },
    {
      id: 3,
      isChecked: false,
      name: "Дмитрий",
      surname: "Сидоров",
    },
    {
      id: 4,
      isChecked: false,
      name: "Елена",
      surname: "Смирнова",
    },
    {
      id: 5,
      isChecked: false,
      name: "Андрей",
      surname: "Кузнецов",
    },
    {
      id: 6,
      isChecked: false,
      name: "Ольга",
      surname: "Попова",
    },
  ];

  const [players, setPlayers] = useState(playersAnswer);
  const [countPlayers, setCountPlayers] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerSurname, setNewPlayerSurname] = useState("");

  useEffect(() => {
    const count = players.filter((player) => player.isChecked).length;
    setCountPlayers(count);
  }, [players]);

  const handleChangeCheckBox = (id) => {
    setPlayers(
      players.map((player) =>
        player.id === id
          ? {
              ...player,
              isChecked: !player.isChecked,
            }
          : player,
      ),
    );
  };
  const handleUncheckCheckBox = () => {
    setPlayers(
      players.map((player) => {
        return {
          ...player,
          isChecked: false,
        };
      }),
    );
  };
  const handleShowInput = () => {
    setShowInput(!showInput);
  };
  const handleAddPlayer = () => {
    if (newPlayerName && newPlayerSurname) {
      setPlayers([
        ...players,
        {
          id: players.length + 1,
          isChecked: false,
          name: newPlayerName,
          surname: newPlayerSurname,
        },
      ]);
      setNewPlayerName("");
      setNewPlayerSurname("");
      setShowInput(false);
    }
  };

  const countColor = countPlayers < 2 ? s.countError : s.countSuccess;

  const printPlayers = players.map((player) => {
    return (
      <CheckBox
        key={player.id}
        label={`${player.name} ${player.surname}`}
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
          <img
            src={plusIcon}
            alt="plusIcon"
            onClick={handleAddPlayer}
          />
        </div>
      )}

      <div className={s.list_players}>{printPlayers}</div>

      <div className={s.confirm_btn}>
        <CustomButton title="Добавить участников" disabled={countPlayers < 2} />
      </div>
    </div>
  );
}

export default Players;
