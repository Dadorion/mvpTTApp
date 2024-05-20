import React from "react";
import s from "./CheckBox.module.scss";

function CheckBox({ label, isChecked, onChange }) {



  const textColor = isChecked ? s.labelTextSuccess : s.labelText;

  return (
    <label className={s.customCheckbox}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className={s.checkboxInput}
      />
      <span className={s.checkMark}></span>
      <span className={textColor}>{label}</span>
    </label>
  );
}

export default CheckBox;
