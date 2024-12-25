import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import s from "./Profile.module.scss";

import Header from "components/header/Header";

import {
  setNewPassword,
  setNewPasswordRepeat,
  changePasswordTC,
} from "@reducers/profile-reducer";
import { setGoToProfile } from "services/redux/reducers/preference-reducer";
import CustomButton from "components/CustomButtonTiny/CustomButtonTiny";
import CustomButtonBold from "components/CustomButtonBold/CustomButtonBold";

function Profile() {
  const dispatch = useDispatch();
  const newPassword = useSelector((store) => store.profile.newPassword);
  const newPasswordRepeat = useSelector(
    (store) => store.profile.newPasswordRepeat,
  );
  const user = useSelector((store) => store.auth);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const isAuth = useSelector((store) => store.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  function handleGoToPreference() {
    dispatch(setGoToProfile(false));
  }

  function handleShowPasswordInput() {
    setShowPasswordInput(!showPasswordInput);
  }
  function handleChangeNewPassword(e) {
    dispatch(setNewPassword(e.target.value));
  }
  function handleChangeNewPasswordRepeat(e) {
    dispatch(setNewPasswordRepeat(e.target.value));
  }
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleShowPasswordRepeat() {
    setShowPasswordRepeat(!showPasswordRepeat);
  }
  function handleConfirmNewPassword() {
    dispatch(changePasswordTC(newPassword));
    setShowPasswordInput(!showPasswordInput);
  }

  return (
    <div className={s.Profile}>
      <Header
        headName="Профиль"
        leftBtnLink="preference"
        leftBtnHandler={handleGoToPreference}
      />

      <div className={s.menu}>
        <div className={s.itemMenu}>
          <div>Эл. почта</div>
          <div>{`${user.email}`}</div>
        </div>
        {!showPasswordInput && (
          <div className={s.itemMenu}>
            <div>Пароль</div>
            <div type="button" className={s.linkType} onClick={handleShowPasswordInput}>
              Сменить пароль
            </div>
          </div>
        )}
      </div>

      {showPasswordInput && (
        <>
          <div className={s.PasswordInput}>
            <label htmlFor="newPassword" onClick={handleShowPassword}>
              Новый пароль
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              value={newPassword}
              onChange={handleChangeNewPassword}
            />
          </div>
          <div className={s.PasswordInput}>
            <label
              htmlFor="newPasswordRepeat"
              onClick={handleShowPasswordRepeat}
            >
              Новый пароль еще раз
            </label>
            <input
              type={showPasswordRepeat ? "text" : "password"}
              name="newPasswordRepeat"
              id="newPasswordRepeat"
              value={newPasswordRepeat}
              onChange={handleChangeNewPasswordRepeat}
            />
          </div>
          <div className={s.buttons}>
            <CustomButton title="Отменить" onClick={handleShowPasswordInput} />
            <CustomButtonBold
              title="Сохранить"
              onClick={handleConfirmNewPassword}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
