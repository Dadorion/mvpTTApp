import React /*useState*/ from "react";
// import { Link } from "react-router-dom";

import s from "./Players.module.scss";

import Header from "@components/header/Header";

function Players() {
  return (
    <div className={s.Players}>
      <Header headName={"Выбор участников"} leftBtn={"tournaments"} />
    </div>
  );
}

export default Players;
