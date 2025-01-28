import React, { useState, useEffect, useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import s from "./PlayerStats.module.scss";

import { fetchPlayerStatsTC } from "services/redux/reducers/playerStats-reducer";

import Preloader from "components/PreloaderMini/Preloader";

function PlayerStats() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const isAuth = useSelector((store) => store.auth.isAuth);

  const playerStats = useSelector((store) => store.playerStats[id]);

  const mainInfo = useMemo(
    () => ({
      total: playerStats?.total || 0,
      wins: playerStats?.wins || 0,
      matches: playerStats?.matches || 0,
      tournaments: playerStats?.tournaments || 0,
    }),
    [playerStats]
  );

  const topList = useMemo(
    () =>
      playerStats?.lossesList?.map((p, index) => (
        <tr key={index} className={s.player}>
          <td>{`${p.name} ${p.surname}`}</td>
          <td>{p.count}</td>
        </tr>
      )) || [],
    [playerStats]
  );

  const renderStat = (value, key, label) => (
    <div className={s.item}>
      <div>
        {loading ? (
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
        await dispatch(fetchPlayerStatsTC(id));
        setLoading(false);
      } catch (error) {
        console.error("Ошибка загрузки данных игрока:", error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className={s.HomePage}>
      <h1>{`${playerStats?.name} ${playerStats?.surname}`}</h1>
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
    </div>
  );
}

export default PlayerStats;
