import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import s from "./Tournament.module.scss";

import closeIcon from "@icons/Black/Regular/Close.svg";
import questIcon from "@icons/Black/Light/Question_light.svg";
import userPlusIcon from "@icons/Black/Regular/UserPlus.svg";

import ArrowInput from "@components/ArrowInput/ArrowInput";
import CustomButton from "@components/CustomButton/CustomButton";
import CheckBox from "@components/CheckBox/CheckBox";
import UserIndicatorExt from "@components/UserIndicatorExt/UserIndicatorExt";

import { setMatchesTC, checkTournamentOnAirTC } from "services/redux/reducers/tournament-reducer";
import makeQueueRequest from "services/queueAlg/queueRequest";
import TournamentPlay from "pages/tournamentPlay/TournamentPlay";

function Tournament() {
  const dispatch = useDispatch();

  // уже здесь нужно проверить, есть ли не завершенный турнир. И, если в бд такого не найдется, тогда показываем настройки.
  const isOnAir = useSelector((store) => store.tournament.onAir);

  if (!isOnAir) {
    dispatch(checkTournamentOnAirTC());
  }

  const checkedPlayers = useSelector((store) => store.players.checkedPlayers);
  const countPlayers = useSelector(
    (store) => store.players.countCheckedPlayers,
  );
  const [showNotice, setShowNotice] = useState(true);

  if (isOnAir) {
    return <TournamentPlay />;
  }

  const queue = makeQueueRequest(checkedPlayers);

  function handleCloseNotice() {
    setShowNotice(false);
  }
  function handleStartTournament() {
    dispatch(setMatchesTC(queue));

    return <Navigate to="/tournament-play" />;
  }

  const printPlayers = checkedPlayers.map((player) => {
    return (
      <CheckBox
        key={player.id}
        label={`${player.p_name} ${player.p_surname}`}
        disabled
      />
    );
  });

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
          <div className={s.title}>
            Разряд
            <img src={questIcon} alt="questIcon" />
          </div>
          <ArrowInput category list={["личный", "парный"]} />
        </div>
        <div className={s.list_item}>
          <div className={s.title}>
            Круги
            <img src={questIcon} alt="questIcon" />
          </div>
          <ArrowInput numbers />
        </div>
        <div className={s.list_item}>
          <div className={s.title}>
            Партии
            <img src={questIcon} alt="questIcon" />
          </div>
          <ArrowInput numbers step="2" />
        </div>
        <div className={s.list_item}>
          <div className={s.title}>
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

        {countPlayers === 0 && (
          <Link to="/players">
            <div className={s.add_btn}>
              <img src={userPlusIcon} alt="userPlusIcon" />
              Добавить
            </div>
          </Link>
        )}
        {countPlayers > 0 && (
          <div className={s.players_list}>
            <UserIndicatorExt
              btnName={"Изменить"}
              countPlayers={countPlayers}
              link={"players"}
            />
            <div className={s.list}>{printPlayers}</div>
          </div>
        )}
      </div>


        <div className={s.confirm_btn}>
          <CustomButton
            title="Начать турнир"
            disabled={countPlayers < 2}
            onClick={handleStartTournament}
          />
        </div>
    </div>
  );
}

export default Tournament;
