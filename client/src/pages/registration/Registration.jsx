import React from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Registration.module.scss";

import loginImage from "../../assets/images/loginImage.jpg";
import {
  changeEmail,
  changePassword,
  registrationTC,
} from "../../services/redux/reducers/registration-reducer";

function Registration() {
  const dispatch = useDispatch();
  const email = useSelector((store) => store.registration.email);
  const password = useSelector((store) => store.registration.password);

  function handleChangeEmail(e) {
    dispatch(changeEmail(e.target.value));
  }
  function handleChangePassword(e) {
    dispatch(changePassword(e.target.value));
  }
  function handleConfirm() {
    dispatch(registrationTC({ email, password }));
  }

  return (
    <div className={s.Registration}>
      <img src={loginImage} alt="logo_img" />
      <h1>Регистрация</h1>
      <input
        type="text"
        placeholder="Почта"
        value={email}
        onChange={handleChangeEmail}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={handleChangePassword}
      />
      <button type="button" onClick={handleConfirm}>
        Зарегистрироваться
      </button>
      <div className={s.hasAccount}>
        <span>Уже есть аккаунт?</span>
        <a href="/login">Войти</a>
      </div>
    </div>
  );
}

export default Registration;
