import React /*useState*/ from "react";
// import { Link } from "react-router-dom";

import s from "./Players.module.scss";
import UserIndicator from "@components/UserIndicator/UserIndicator";

import swapIcon from "@icons/Black/Light/Swap_light.svg";
import searchIcon from "@icons/Black/Light/Search_light.svg";
import plusIcon from "@icons/Colored/Plus.svg";

import Header from "@components/header/Header";
import CheckBox from "@components/CheckBox/CheckBox";
import CustomButton from "components/CustomButton/CustomButton";

function Players() {
  const countPlayers = 0;
  const countColor = countPlayers < 2 ? s.countError : s.countSuccess;

  return (
    <div className={s.Players}>
      <Header headName={"Выбор участников"} leftBtn={"tournaments"} />

      <div className={s.check_counter}>
        <div className={s.indicator}>
          <UserIndicator />
          <div className={countColor}>{countPlayers}</div>
        </div>
        <span>Снять все</span>
      </div>

      <div className={s.sort}>
        <div className={s.swap}>
          <img src={swapIcon} alt="swapIcon" />
          Последние
        </div>
        <img src={searchIcon} alt="searchIcon" />
      </div>

      <div className={s.add_player_btn}>
        <img src={plusIcon} alt="plusIcon" />
        Добавить нового игрока
      </div>
      <div className={s.list_players}>
        <CheckBox label="Алексей Иванов" />
        <CheckBox label="Мария Петрова" />
        <CheckBox label="Дмитрий Сидоров" />
        <CheckBox label="Елена Смирнова" />
        <CheckBox label="Андрей Кузнецов" />
        <CheckBox label="Ольга Попова" />
        <CheckBox label="Николай Волков" />
        <CheckBox label="Анна Васильева" />
        <CheckBox label="Игорь Павлов" />
        <CheckBox label="Светлана Михайлова" />
      </div>
      <div className={s.confirm_btn}>
        <CustomButton title="Добавить участников"/>
      </div>
    </div>
  );
}

export default Players;
