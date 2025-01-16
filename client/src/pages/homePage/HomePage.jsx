import React, { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import s from "./HomePage.module.scss";

import {
  setLossesListTC,
  setStatsTC,
} from "services/redux/reducers/home-reducer";

import CustomButton from "components/CustomButtonBold/CustomButtonBold";
import Preloader from "components/PreloaderMini/Preloader";

function HomePage() {
  const dispatch = useDispatch();

  const [navToPlayers, setNavToPlayers] = useState(false);

  const [loadingState, setLoadingState] = useState({
    total: true,
    wins: true,
    matches: true,
    tournaments: true,
    players: true,
  });

  const isAuth = useSelector((store) => store.auth.isAuth);

  const players = useSelector((store) => store.home.lossesList);

  const total = useSelector((store) => store.home.total);
  const wins = useSelector((store) => store.home.allWins);
  const matches = useSelector((store) => store.home.allMatches);
  const tournaments = useSelector((store) => store.home.allTournaments);

  const mainInfo = useMemo(() => ({
    total,
    wins,
    matches,
    tournaments,
  }), [total, wins, matches, tournaments]);

  const topList = players.map((p, index) => (
    <tr key={index} className={s.player}>
      <td>{`${p.sp_name} ${p.sp_surname}`}</td>
      <td>{p.count}</td>
    </tr>
  ));

  const handleGoToPlayers = () => {
    setNavToPlayers(true);
  };

  const renderStat = (value, key, label) => (
    <div className={s.item}>
      <div>
        {loadingState[key] ? (
          <Preloader />
        ) : (
          <>
            <span>{value}</span>
            <span>{key === "total" ? "%" : ""}</span>
          </>
        )}
      </div>
      <h5>{label}</h5>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(setStatsTC());
        setLoadingState((prev) => ({
          ...prev,
          total: mainInfo.total !== undefined ? false : prev.total,
          wins: mainInfo.wins !== undefined ? false : prev.wins,
          matches: mainInfo.matches !== undefined ? false : prev.matches,
          tournaments: mainInfo.tournaments !== undefined ? false : prev.tournaments,
        }));

        await dispatch(setLossesListTC());
        setLoadingState((prev) => ({
          ...prev,
          players: players.length > 0 ? false : prev.players,
        }));
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();
  }, [dispatch, mainInfo, players]);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  if (navToPlayers) {
    return <Navigate to="/players-home" />;
  }

  return (
    <div className={s.HomePage}>
      <h1>Мои победы</h1>
      <h3>Показатели эффективности</h3>
      <div className={s.wins_mainInfo}>
        <div className={s.info}>
          {renderStat(mainInfo.total, "total", "Total")}
          {renderStat(mainInfo.wins, "wins", "Wins")}
          {renderStat(mainInfo.matches, "matches", "Matches")}
          {renderStat(mainInfo.tournaments, "tournaments", "Tournaments")}
        </div>
      </div>
      <h3>Топ самых сложных игроков</h3>
      <div className={s.wins_players}>
        {loadingState.players ? (
          <Preloader />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Игрок</th>
                <th>Поражений</th>
              </tr>
            </thead>
            <tbody>{topList}</tbody>
          </table>
        )}
      </div>
      <CustomButton
        title={"Посмотреть всех игроков"}
        onClick={handleGoToPlayers}
      />
    </div>
  );
}

export default HomePage;
