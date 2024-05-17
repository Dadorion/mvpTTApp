import React, { /*useState*/ } from "react";
import s from "./CustomButton.module.scss";

function CustomButton({title}) {
  return <div className={s.CustomButton}>{title}</div>;
}

export default CustomButton;
