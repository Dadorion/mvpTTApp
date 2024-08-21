import React from "react";

import s from "./TournamentSummary.module.scss";

import CustomButtonBold from "components/CustomButtonBold/CustomButtonBold";
import downloadIcon from "@icons/Colored/Download.svg";
import callbackIcon from "@icons/Colored/Callback.svg";
import historyIcon from "@icons/Colored/History.svg";
import Leaderboard from "components/Leaderboard/Leaderboard";

function TournamentSummary() {
  const playersData = [
    { position: 1, name: "Антон Бабенко", points: 25 },
    { position: 2, name: "Алик Мартиросян", points: 23 },
    { position: 3, name: "Саша Саркисян", points: 21 },
    { position: 4, name: "Михал Саныч", points: 20 },
    { position: 5, name: "Илона Ковза", points: 15 },
    { position: 6, name: "Даниил Кобельков", points: 12 },
  ];

  return (
    <div className={s.TournamentSummary}>
      <h2>Итоги турнира</h2>
      <div className={s.container}>
        <div className={s.table}>
          <Leaderboard players={playersData} />
        </div>
        <div className={s.end_block}>
          <div className={s.links}>
            <div className={s.links_item}>
              <img src={downloadIcon} alt="downloadIcon" />
              <span>Скачать</span>
            </div>
            <div className={s.links_item}>
              <img src={callbackIcon} alt="callbackIcon" />
              <span>Поделиться</span>
            </div>
            <div className={s.links_item}>
              <img src={historyIcon} alt="historyIcon" />
              <span>История</span>
            </div>
          </div>
          <CustomButtonBold title={"Закрыть"} />
        </div>
      </div>
    </div>
  );
}

export default TournamentSummary;
