import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import s from "./Tabbar.module.scss";

import preferenceIcon from "../../assets/icons/svg_pack/Black/Regular/Preference.svg";
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
        <div className={currentPath === "/home" ? s.active : s.deactivated}>
          <Link to="/home">
            <img src={homeIcon} alt="homeIcon" />
          </Link>
          <font>Главная</font>
        </div>

        <div
          className={currentPath === "/tournaments" ? s.active : s.deactivated}
        >
          <Link to="/tournaments">
            <img
              src={tournamentIcon}
              alt="tournamentIcon"
              className={s.tournamentIcon}
            />
          </Link>
          <font>Счёт</font>
        </div>

        <div
          className={currentPath === "/preference" ? s.active : s.deactivated}
        >
          <Link to="/preference">
            <img src={preferenceIcon} alt="preferenceIcon" />
          </Link>
          <font>Настройки</font>
        </div>
      </div>
    )
  );
}

export default Tabbar;
