import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import s from "./HomePage.module.scss";
import {
  setLossesListTC,
  setStatsTC,
} from "services/redux/reducers/home-reducer";

function HomePage() {
  const isAuth = useSelector((store) => store.auth.isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStatsTC());
    dispatch(setLossesListTC());
  }, [dispatch]);

  const players = useSelector((store) => store.home.lossesList);

  const mainInfo = {
    total: useSelector((store) => store.home.total),
    wins: useSelector((store) => store.home.allWins),
    matches: useSelector((store) => store.home.allMatches),
  };

  const topList = players.map((p) => (
    <tr className={s.player}>
      <td>{`${p.sp_name} ${p.sp_surname}`}</td>
      <td>{p.count}</td>
    </tr>
  ));

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={s.HomePage}>
      <h1>Мои победы</h1>
      <h3>Показатели эффективности</h3>
      <div className={s.wins_mainInfo}>
        <div className={s.info}>
          <div className={s.item}>
            <div>
              <span>{mainInfo.total}</span>
              <span>%</span>
            </div>
            <h5>Total</h5>
          </div>
          <div className={s.item}>
            <div>
              <span>{mainInfo.wins}</span>
              <span></span>
            </div>
            <h5>Wins</h5>
          </div>
          <div className={s.item}>
            <div>
              <span>{mainInfo.matches}</span>
              <span></span>
            </div>
            <h5>Matches</h5>
          </div>
        </div>
      </div>
      <h3>Топ самых сложных игроков</h3>
      <div className={s.wins_players}>
        <table>
          <tr>
            <th>Игрок</th>
            <th>Поражений</th>
          </tr>
          {topList}
        </table>
      </div>
      <div>Some else statistic data...</div>
      <div>Турниров проведено</div>
    </div>
  );
}

export default HomePage;
