import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import s from "./HomePage.module.scss";

function HomePage() {
  const isAuth = useSelector((store) => store.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={s.HomePage}>
      <h2>Home page</h2>
      <h1>Table Tennis App</h1>
    </div>
  );
}

export default HomePage;
