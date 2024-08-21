import React from "react";
import s from "./CustomButtonTiny.module.scss";

function CustomButton({ title, disabled, onClick }) {
  return (
    <button
      className={`${s.CustomButtonTiny} ${disabled ? s.disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export default CustomButton;
