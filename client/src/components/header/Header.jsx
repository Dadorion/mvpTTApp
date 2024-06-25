import React from "react";
import { Link } from "react-router-dom";

import s from "./Header.module.scss";

import editIcon from "../../assets/icons/svg_pack/White/Light/Edit.svg";
import backIcon from "../../assets/icons/svg_pack/Black/Regular/ArrowLeft.svg";
import checkIcon from "../../assets/icons/svg_pack/White/Regular/Check.svg";

function Header({
  leftBtnLink,
  leftBtnHandler,
  headName,
  rightBtnLink,
  rightBtnHandler,
  confirm,
  confirmHandler,
}) {
  if (confirm) rightBtnLink = false;

  return (
    <div className={s.header}>
      <Link to={`/${leftBtnLink}`}>
        <div className={s.tapArea}>
          {leftBtnLink && (
            <img src={backIcon} alt="backIcon" onClick={leftBtnHandler} />
          )}
        </div>
      </Link>

      <h1>{headName}</h1>

      <Link to={rightBtnLink}>
        <div className={s.tapArea}>
          {rightBtnLink && (
            <img src={editIcon} alt="edit_pen" onClick={rightBtnHandler} />
          )}
          {confirm && (
            <img src={checkIcon} alt="checkIcon" onClick={confirmHandler} />
          )}
        </div>
      </Link>
    </div>
  );
}

export default Header;
