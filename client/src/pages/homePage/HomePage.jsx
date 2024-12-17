import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import s from "./HomePage.module.scss";
import { setStatsTC } from "services/redux/reducers/home-reducer";

function HomePage() {
  const isAuth = useSelector((store) => store.auth.isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStatsTC());
  }, [dispatch]);

  const players = [
    {
      name: "Алик Мартиросян",
      wins: 64,
      losses: 29,
    },
    {
      name: "Саня Саркисян",
      wins: 20,
      losses: 31,
    },
    {
      name: "Михаил Носов",
      wins: 34,
      losses: 3,
    },
  ];
  const mainInfo = {
    total: useSelector((store) => store.home.total),
    wins: useSelector((store) => store.home.allWins),
    matches: useSelector((store) => store.home.allMatches),
  };

  const playersSortLosses = players.sort((p1, p2) => p2.losses - p1.losses);

  const topList = playersSortLosses.map((p) => (
    <tr className={s.player}>
      <td>{p.name}</td>
      <td>{p.wins}</td>
      <td>{p.losses}</td>
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
            <th>Имя</th>
            <th>Побед</th>
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
