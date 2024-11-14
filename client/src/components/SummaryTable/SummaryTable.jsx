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
                  return <td key={i}>x</td>;
                } else if (player.position < opponent.position) {
                  return <td key={i}>2</td>;
                } else {
                  return <td key={i}>0</td>;
                }
              })}
              <td>{player.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SummaryTable;
