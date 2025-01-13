import React, { useState, useEffect } from "react";
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
  });

  const isAuth = useSelector((store) => store.auth.isAuth);

  const players = useSelector((store) => store.home.lossesList);

  const mainInfo = {
    total: useSelector((store) => store.home.total),
    wins: useSelector((store) => store.home.allWins),
    matches: useSelector((store) => store.home.allMatches),
    tournaments: useSelector((store) => store.home.allTournaments),
  };

  const topList = players.map((p, index) => (
    <tr key={index} className={s.player}>
      <td>{`${p.sp_name} ${p.sp_surname}`}</td>
      <td>{p.count}</td>
    </tr>
  ));

  const handleGoToPlayers = () => {
    setNavToPlayers(true);
  };

  const simulateLoading = (key) => {
    setTimeout(() => {
      setLoadingState((prev) => ({ ...prev, [key]: false }));
    }, 700);
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
      dispatch(setStatsTC());
      dispatch(setLossesListTC());

      Object.keys(loadingState).forEach(simulateLoading);
    };

    fetchData();
  }, [dispatch, loadingState]);

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
        <table>
          <thead>
            <tr>
              <th>Игрок</th>
              <th>Поражений</th>
            </tr>
          </thead>
          <tbody>{topList}</tbody>
        </table>
      </div>
      <CustomButton
        title={"Посмотреть всех игроков"}
        onClick={handleGoToPlayers}
      />
    </div>
  );
}

export default HomePage;
