import React from "react";
import { Link } from "react-router-dom";

import s from "./UserIndicatorExt.module.scss";

import userRedIcon from "@icons/Colored/User_red.svg";
import userGreenIcon from "@icons/Colored/User_green.svg";

function UserIndicatorExt({ onClick, countPlayers, btnName, link }) {
  const condition = countPlayers >= 2;
  const countColor = countPlayers < 2 ? s.countError : s.countSuccess;

  return (
    <div>
      <div className={s.check_counter}>
        <div className={s.indicator}>
          {condition ? (
            <img src={userGreenIcon} alt="Green Icon" />
          ) : (
            <img src={userRedIcon} alt="Red Icon" />
          )}
          <div className={countColor}>{countPlayers}</div>
        </div>
        {link && (
          <Link to={`/${link}`}>
            <span>{btnName}</span>
          </Link>
        )}
        {!link && <span onClick={onClick}>{btnName}</span>}
      </div>
    </div>
  );
}

export default UserIndicatorExt;
