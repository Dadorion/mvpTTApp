import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import s from "./Preference.module.scss";

import userIcon from "@icons/Black/Regular/User.svg"
import infoIcon from "@icons/Black/Regular/Info.svg"
import exitIcon from "@icons/Colored/SignOut_error_red.svg"

import {
  setGoToProfile,
  setGoToAbout,
} from "services/redux/reducers/preference-reducer";
import { logoutTC } from "@reducers/auth-reducer";

function Preference() {
  const dispatch = useDispatch();

  const isAuth = useSelector((store) => store.auth.isAuth);
  const redirectToProfile = useSelector(
    (store) => store.preference.redirectToProfile,
  );
  const redirectToAbout = useSelector(
    (store) => store.preference.redirectToAbout,
  );

  if (!isAuth) {
    return <Navigate to="/" />;
  }
  if (redirectToProfile) {
    return <Navigate to="/profile" />;
  }
  if (redirectToAbout) {
    return <Navigate to="/about" />;
  }

  function handleGoToProfile() {
    dispatch(setGoToProfile(true));
  }
  function handleGoToAbout() {
    dispatch(setGoToAbout());
  }

  function handleLogout() {
      dispatch(logoutTC());
    }

  return (
    <div className={s.Preference}>
      <h2>Настройки</h2>
      <div className={s.menu}>
        <div className={s.itemMenu} onClick={handleGoToProfile}>
          <img src={userIcon} alt="userIcon" />
          <span>Профиль</span>
        </div>
        <div className={s.itemMenu} onClick={handleGoToAbout}>
          <img src={infoIcon} alt="infoIcon" />
          <span>О приложении</span>
        </div>
        <div className={s.itemMenu} onClick={handleLogout}>
          <img src={exitIcon} alt="exitIcon" />
          <span className={s.exit}>Выйти</span>
        </div>
      </div>
    </div>
  );
}

export default Preference;
