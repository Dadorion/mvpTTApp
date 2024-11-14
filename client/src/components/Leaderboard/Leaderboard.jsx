import React from "react";
import s from "./Leaderboard.module.scss";

const Leaderboard = ({ players }) => {
  return (
    <table className={s.leaderboardTable}>
      <thead>
        <tr>
          <th>Место</th>
          <th>Игрок</th>
          <th>Очки</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <tr
            key={index}
            className={player.position <= 3 ? s.topPlayer : ""}
          >
            <td>{player.position}</td>
            <td>{player.name}</td>
            <td>{player.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
