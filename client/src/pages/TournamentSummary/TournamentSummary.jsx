import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";

import html2canvas from "html2canvas";

import s from "./TournamentSummary.module.scss";

import CustomButtonBold from "components/CustomButtonBold/CustomButtonBold";
import downloadIcon from "@icons/Colored/Download.svg";
import callbackIcon from "@icons/Colored/Callback.svg";
import historyIcon from "@icons/Colored/History.svg";
import Leaderboard from "components/Leaderboard/Leaderboard";
import SummaryTable from "components/SummaryTable/SummaryTable";
import { setSummaryTC } from "services/redux/reducers/tournament-reducer";

function TournamentSummary() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSummaryTC());
  }, [dispatch]);

  const players = useSelector((store) => store.tournament.summary);

  const [redirectToHome, setRedirectToHome] = useState(false);
  const [viewAsTable, setViewAsTable] = useState(false);

  if (redirectToHome) {
    return <Navigate to="/home" />;
  }

  const handleClose = () => {
    setRedirectToHome(true);
  };

  const handleViewToggle = () => {
    setViewAsTable(!viewAsTable);
  };

  // Функция для захвата скриншота
  const handleDownloadScreenshot = () => {
    const element = document.getElementById("tournament-summary");

    html2canvas(element, {
      scrollX: 0,
      scrollY: -window.scrollY, // Корректировка по оси Y
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: element.scrollHeight,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "tournament_summary.png";
      link.click();
    });
  };

  return (
    <div className={s.TournamentSummary} >
      <h2>Итоги турнира</h2>
      <div className={s.viewToggle}>
        <button onClick={handleViewToggle}>
          {viewAsTable ? "Показать списком" : "Показать таблицей"}
        </button>
      </div>
      <div className={s.container} >
        {viewAsTable ? (
          <SummaryTable players={players}/>
        ) : (
          <div className={s.listView} id="tournament-summary">
            <Leaderboard players={players} />
          </div>
        )}
        <div className={s.end_block}>
          <div className={s.links}>
            <div className={s.links_item} onClick={handleDownloadScreenshot}>
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
