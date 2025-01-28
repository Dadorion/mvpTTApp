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

export default CustomButton;
