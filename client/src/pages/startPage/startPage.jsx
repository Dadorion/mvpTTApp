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
        <h1>Welcome to</h1>
        <h1>Table Tennis App</h1>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <h2>minimal viable product</h2>
      </div>
    </div>
  );
}

export default StartPage;
