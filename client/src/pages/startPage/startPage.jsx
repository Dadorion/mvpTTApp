import React from "react";
import s from "./startPage.module.scss";
import { Link } from "react-router-dom";

function StartPage() {

  return (
    <div className={s.StartPage}>
      <div>
        <h2>Welcome to</h2>
        <h1>Table Tennis App</h1>
        <Link to="/home">
          <button type="button">
            Login
          </button>
        </Link>
        <h3>minimal viable product</h3>
      </div>
    </div>
  );
}

export default StartPage;
