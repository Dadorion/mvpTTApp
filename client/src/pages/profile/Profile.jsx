import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Profile.module.scss";

import {
  setNewPassword,
  setNewPasswordRepeat,
  changePasswordTC,
} from "../../services/redux/reducers/profile-reducer";
import {
  logoutTC
} from "../../services/redux/reducers/auth-reducer";

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
  function handleLogout() {
    dispatch(logoutTC());
  }

  return (
    <div className={s.Profile}>
      <h2>Profile</h2>
      <h1>{`${user.email}`}</h1>

      <button type="button" onClick={handleShowPasswordInput}>
        Изменить пароль
      </button>

      <button type="button" onClick={handleLogout}>
        Выйти из профиля
      </button>

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

          <button type="button" onClick={handleConfirmNewPassword}>
            Подтвердить изменение
          </button>
        </>
      )}
    </div>
  );
}

export default Profile;
