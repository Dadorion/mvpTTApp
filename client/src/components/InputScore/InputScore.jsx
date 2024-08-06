import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "./InputScore.module.scss";

import CustomButton from "components/CustomButton/CustomButton";
import {
  changeFirstScore,
  changeSecondScore,
} from "services/redux/reducers/matches-reducer";

function InputScore({ match, players, clickBtn }) {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const firstScoreInput = useSelector((store) => store.matches.firstScoreInput);
  const secondScoreInput = useSelector((store) => store.matches.secondScoreInput);

  const firstPlayer = `${match.playersPair[0].name} ${match.playersPair[0].surname}`;
  const secondPlayer = `${match.playersPair[1].name} ${match.playersPair[1].surname}`;

  const handleChangeFirstScore = (e) => {
    dispatch(changeFirstScore(e.target.value));
  };
  const handleChangeSecondScore = (e) => {
    dispatch(changeSecondScore(e.target.value));
  };

  return (
    <div className={s.InputScore}>
      <div className={s.input_score_bgc} />
      <div className={s.input_score}>
        <div>
          <h2>Счет встречи</h2>
          <p>{firstPlayer}</p>
          <div>
            <input
              type="text"
              value={firstScoreInput}
              onChange={handleChangeFirstScore}
            />
            :
            <input
              type="text"
              value={secondScoreInput}
              onChange={handleChangeSecondScore}
            />
          </div>
          <p>{secondPlayer}</p>
        </div>
        <CustomButton title={"Ok"} onClick={clickBtn} disabled={isDisabled} />
      </div>
    </div>
  );
}

export default InputScore;
