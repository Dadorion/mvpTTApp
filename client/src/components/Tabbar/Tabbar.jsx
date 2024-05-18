import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import s from "./Tabbar.module.css";

import profileIcon from "../../assets/icons/svg_pack/Black/Light/User_light.svg";
import tournamentIcon from "../../assets/icons/svg_pack/Black/Light/Trophy_light.svg";
import homeIcon from "../../assets/icons/svg_pack/Black/Regular/House.svg";

const blockArr = ["/", "/login", "/registration"];

function Tabbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showTabbar, setShowTabbar] = useState(true);

  useEffect(() => {
    setShowTabbar(!blockArr.includes(currentPath));
  }, [currentPath]);

  return (
    showTabbar && (
      <div className={s.Tabbar}>
        <div className={currentPath === "/" ? s.active : s.deactivated}>
          <Link to="/home">
            <img src={homeIcon} alt="homeIcon" />
          </Link>
          <font>Главная</font>
        </div>

        <div className={currentPath === "/counter" ? s.active : s.deactivated}>
          <Link to="/tournaments">
            <img
              src={tournamentIcon}
              alt="tournamentIcon"
              className={s.tournamentIcon}
            />
          </Link>
          <font>Счёт</font>
        </div>

        <div className={currentPath === "/profile" ? s.active : s.deactivated}>
          <Link to="/profile">
            <img src={profileIcon} alt="profileIcon" />
          </Link>
          <font>Профиль</font>
        </div>
      </div>
    )
  );
}

export default Tabbar;
