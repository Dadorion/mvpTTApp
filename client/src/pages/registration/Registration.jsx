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
  const emailValue = useSelector((store) => store.registration.email);
  const passwordValue = useSelector((store) => store.registration.password);

  function handleChangeEmail(e) {
    dispatch(changeEmail(e.target.value));
  }
  function handleChangePassword(e) {
    dispatch(changePassword(e.target.value));
  }
  function handleConfirm() {
    console.log("confirm form with:", emailValue, passwordValue);
    dispatch(registrationTC({ email: emailValue, password: passwordValue }));
  }

  return (
    <div className={s.Registration}>
      <img src={loginImage} alt="logo_img" />
      <h1>Регистрация</h1>
      <input
        type="text"
        placeholder="email"
        value={emailValue}
        onChange={handleChangeEmail}
      />
      <input
        type="password"
        placeholder="password"
        value={passwordValue}
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
