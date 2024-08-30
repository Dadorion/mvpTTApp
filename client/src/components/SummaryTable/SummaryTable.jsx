// SummaryTable.js
import React from "react";
import s from "./SummaryTable.module.scss";

function SummaryTable({ players }) {
  return (
    <div className={s.tableContainer}>
      <table className={s.summaryTable}>
        <thead>
          <tr>
            <th></th>
            {players.map((_, index) => (
              <th key={index}>{index + 1}</th>
            ))}
            <th>Итого</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id}>
              <td>
                {index + 1} | {player.name}
              </td>
              {players.map((opponent, i) => {
                if (index === i) {
                  return <td key={i}>x</td>; // если игрок сравнивается с самим собой, то "x"
                } else if (player.position < opponent.position) {
                  return <td key={i}>2</td>; // например, 2 очка, если выиграл
                } else {
                  return <td key={i}>0</td>; // 0 очков, если проиграл
                }
              })}
              <td>{player.points}</td> {/* Отображаем итоговые баллы игрока */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SummaryTable;
