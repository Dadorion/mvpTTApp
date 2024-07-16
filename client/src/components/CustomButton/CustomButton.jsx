import React from "react";
import s from "./CustomButton.module.scss";

function CustomButton({title, disabled, onClick}) {
  const btnStyle = disabled ? `${s.CustomButton} ${s.disabled}`:`${s.CustomButton} ${s.enabled}`

  return <div className={btnStyle} onClick={onClick}>{title}</div>;
}

export default CustomButton;
