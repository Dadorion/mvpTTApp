import React from "react";
import s from "./startPage.module.scss";

function StartPage({ initializeAppTC }) {
  const handleLogin = () => {
    initializeAppTC();
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
