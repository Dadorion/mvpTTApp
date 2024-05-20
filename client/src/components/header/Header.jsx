import React from "react";
import { Link } from "react-router-dom";

import s from "./Header.module.scss";

import editIcon from "../../assets/icons/svg_pack/White/Light/Edit.svg";
import backIcon from "../../assets/icons/svg_pack/Black/Regular/ArrowLeft.svg";
import checkIcon from "../../assets/icons/svg_pack/White/Regular/Check.svg";

function Header({ leftBtn, headName, rightBtn, confirm }) {
  return (
    <div className={s.header}>
      <Link to={`/${leftBtn}`}>
        <div className={s.tapArea}>
          {leftBtn && <img src={backIcon} alt="backIcon" />}
        </div>
      </Link>

      <p>{headName}</p>

      <Link to={rightBtn}>
        <div className={s.tapArea}>
          {rightBtn && <img src={editIcon} alt="edit_pen" />}
          {confirm && <img src={checkIcon} alt="checkIcon" />}
        </div>
      </Link>
    </div>
  );
}

export default Header;
