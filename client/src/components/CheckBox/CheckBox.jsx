import React, { useState } from "react";
import s from "./CheckBox.module.scss";

function CheckBox({ label }) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const textColor = checked ? s.labelTextSuccess : s.labelText;

  return (
    <label className={s.customCheckbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className={s.checkboxInput}
      />
      <span className={s.checkMark}></span>
      <span className={textColor}>{label}</span>
    </label>
  );
}

export default CheckBox;
