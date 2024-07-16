import React, { useState } from "react";

import s from "./InputScore.module.scss";

import CustomButton from "components/CustomButton/CustomButton";

function InputScore({ players, clickBtn }) {
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <div className={s.InputScore}>
      <div className={s.input_score_bgc} />
      <div className={s.input_score}>
        <div>
          <h2>Счет встречи</h2>
          <p>Name One</p>
          <div>
            <input type="text" />
            :
            <input type="text" />
          </div>
          <p>Name Two</p>
        </div>
        <CustomButton title={"Ok"} onClick={clickBtn} disabled={isDisabled} />
      </div>
    </div>
  );
}

export default InputScore;
