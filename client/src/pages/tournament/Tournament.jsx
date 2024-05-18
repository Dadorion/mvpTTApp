import React, { useState } from "react";
import { Link } from "react-router-dom";
import s from "./Tournament.module.scss";
import closeIcon from "@icons/Black/Regular/Close.svg";
import questIcon from "@icons/Black/Light/Question_light.svg";
import userPlusIcon from "@icons/Black/Regular/UserPlus.svg";
import ArrowInput from "@components/ArrowInput/ArrowInput";
import CustomButton from "@components/CustomButton/CustomButton";

function Tournament() {
  const [showNotice, setShowNotice] = useState(true);

  function handleCloseNotice() {
    setShowNotice(false);
  }

  return (
    <div className={s.Tournament}>
      <h1>Настройки турнира</h1>

      {showNotice && (
        <div className={s.notice}>
          <span>
            Пока доступна только круговая система: все играют со всеми
          </span>
          <img src={closeIcon} alt="closeIcon" onClick={handleCloseNotice} />
        </div>
      )}

      <div className={s.settings_list}>
        <div className={s.list_item}>
          <div>
            Разряд
            <img src={questIcon} alt="questIcon" />
          </div>
          <ArrowInput category list={["личный", "парный"]} />
        </div>
        <div className={s.list_item}>
          <div>
            Круги
            <img src={questIcon} alt="questIcon" />
          </div>
          <ArrowInput numbers />
        </div>
        <div className={s.list_item}>
          <div>
            Партии
            <img src={questIcon} alt="questIcon" />
          </div>
          <ArrowInput numbers step="2" />
        </div>
        <div className={s.list_item}>
          <div>
            Итоги
            <img src={questIcon} alt="questIcon" />
          </div>
          <ArrowInput
            system
            list={["сумма по партиям", "простой", "официальный"]}
          />
        </div>
      </div>

      <div className={s.players}>
        <h3>Участники турнира</h3>
        <div className={s.players_list}>
          <Link to="/players">
            <div className={s.add_btn}>
              <img src={userPlusIcon} alt="userPlusIcon" />
              Добавить
            </div>
          </Link>
        </div>
      </div>

      <CustomButton title="Начать турнир" />
    </div>
  );
}

export default Tournament;
