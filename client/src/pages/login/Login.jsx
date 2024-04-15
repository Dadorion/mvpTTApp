import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'
import s from "./Login.module.scss";

import loginImage from "../../assets/images/loginImage.jpg";
import {
  changeEmail,
  changePassword,
  loginTC,
} from "../../services/redux/reducers/login-reducer";

function Login() {
  const dispatch = useDispatch();
  const email = useSelector((store) => store.login.email);
  const password = useSelector((store) => store.login.password);
  const isAuth = useSelector((store) => store.auth.isAuth);

  function handleChangeEmail(e) {
    dispatch(changeEmail(e.target.value));
  }
  function handleChangePassword(e) {
    dispatch(changePassword(e.target.value));
  }
  function handleConfirm() {
    dispatch(loginTC({ email, password}));
  }

  if (isAuth) {
    return <Navigate to='/home' />
  }

  return (
    <div className={s.Login}>
      <img src={loginImage} alt="logo_img" />
      <h1>Вход</h1>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={handleChangeEmail}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={handleChangePassword}
      />
      <button type="button" onClick={handleConfirm}>
        Войти
      </button>
      <div className={s.hasAccount}>
        <span>Нет аккаунта?</span>
        <a href="/registration">Зарегистрироваться</a>
      </div>
    </div>
  );
}

export default Login;