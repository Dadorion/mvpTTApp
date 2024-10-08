import React from "react";
import s from "./CustomButtonBold.module.scss";

function CustomButton({ title, disabled, onClick }) {
  return (
    <button
      className={`${s.CustomButtonBold} ${disabled ? s.disabled : s.enabled}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
// function CustomButton({title, disabled, onClick}) {
//   const btnStyle = disabled ? `${s.CustomButton} ${s.disabled}`:`${s.CustomButton} ${s.enabled}`

//   return <div className={btnStyle} onClick={onClick} disabled={!disabled}>{title}</div>;
// }

export default CustomButton;
