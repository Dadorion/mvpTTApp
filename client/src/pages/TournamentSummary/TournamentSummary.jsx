import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import s from "./TournamentSummary.module.scss";

import CustomButtonBold from "components/CustomButtonBold/CustomButtonBold";
import downloadIcon from "@icons/Colored/Download.svg";
import callbackIcon from "@icons/Colored/Callback.svg";
import historyIcon from "@icons/Colored/History.svg";
import Leaderboard from "components/Leaderboard/Leaderboard";
import { setSummaryTC } from "services/redux/reducers/tournament-reducer";
import { Navigate } from "react-router";

function TournamentSummary() {
  // const players = [
  //   { position: 1, name: "Антон Бабенко", points: 25 },
  //   { position: 2, name: "Алик Мартиросян", points: 23 },
  //   { position: 3, name: "Саша Саркисян", points: 21 },
  //   { position: 4, name: "Михал Саныч", points: 20 },
  //   { position: 5, name: "Илона Ковза", points: 15 },
  //   { position: 6, name: "Даниил Кобельков", points: 12 },
  // ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSummaryTC());
  }, [dispatch]);

  const players = useSelector((store) => store.tournament.summary);

  const [redirectToHome, setRedirectToHome] = useState(false);

  if (redirectToHome) {
    return <Navigate to="/home" />;
  }

  const handleClose = () => {
    setRedirectToHome(true);
  };

  return (
    <div className={s.TournamentSummary}>
      <h2>Итоги турнира</h2>
      <div className={s.container}>
        <div className={s.table}>
          <Leaderboard players={players} />
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
          <CustomButtonBold title={"Закрыть"} onClick={handleClose} />
        </div>
      </div>
    </div>
  );
}

export default TournamentSummary;
