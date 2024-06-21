import React from "react";
import s from "./CheckBox.module.scss";

function CheckBox({ label, isChecked, onChange, disabled = false }) {
  const textColor = isChecked ? s.labelTextSuccess : s.labelText;

  return (
    <label className={s.customCheckbox}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className={s.checkboxInput}
      />
      {!disabled && <span className={s.checkMark}></span>}
      <span className={textColor}>{label}</span>
    </label>
  );
}

export default CheckBox;
