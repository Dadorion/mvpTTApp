import React from "react";
import s from "./StartPage.module.scss";
import { useDispatch } from "react-redux";

function StartPage({ initializedSuccess }) {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(initializedSuccess());
  };

  return (
    <div className={s.StartPage}>
      <div>
        <h2>Welcome to</h2>
        <h1>Table Tennis App</h1>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default StartPage;
