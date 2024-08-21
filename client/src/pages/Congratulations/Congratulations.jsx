import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import s from "./Congratulations.module.scss";

import trophyIcon from "@icons/Colored/Basic_Trophy.svg";

function Congratulations() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/tournament-summary");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={s.Congratulations}>
      <div className={s.container}>
        <h1>Поздравляем!</h1>
        <img src={trophyIcon} alt="trophyIcon" />
        <div>Составляем список победителей</div>
      </div>
    </div>
  );
}

export default Congratulations;
