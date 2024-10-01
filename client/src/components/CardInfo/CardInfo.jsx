import React from "react";

import s from "./CardInfo.module.scss";

function CardInfo({ img, title, body }) {
  return (
    <div className={s.CardInfo}>
      <div className={s.header}>
        <h1 className={s.title}>{title}</h1>
        <img src={img} alt="img" />
      </div>

      <div className={s.body}>{body}</div>
    </div>
  );
}

export default CardInfo;
