import React, { useState } from "react";
import caretLeftIcon from "@icons/Black/Regular/CaretLeft.svg";
import caretRightIcon from "@icons/Black/Regular/CaretRight.svg";

import s from "./ArrowInput.module.scss";

function ArrowInput({
  // showArrow = false,
  numbers,
  score,
  system,
  step,
  start,
}) {
  // const [showLeftCaret, setShowLeftCaret] = useState(showArrow);
  // const [showRightCaret, setShowRightCaret] = useState(showArrow);
  const [num, setNum] = useState(Number(start));
  const [btnClass, setBtnClass] = useState(s.btn);

  const setScore = ["сумма по партиям", "простой", "официальный"];
  const setSystem = ["круговая"];

  const handlerDecrement = () => {
    if (num - Number(step) <= 1) {
      // setShowLeftCaret(false);
      setBtnClass(`${btnClass} ${s.invisible}`);
      setNum(num - Number(step));
    }
    if (num + Number(step) >= 7) {
      // setShowRightCaret(true);
      setBtnClass(`${btnClass}`);
    }
  };

  const handlerIncrement = () => {
    setNum(num + Number(step));

    if (num - Number(step) <= 1) {
      // setShowLeftCaret(true);
      setBtnClass(`${btnClass}`);
    }
    if (num + Number(step) >= 7) {
      // setShowRightCaret(false);
      setBtnClass(`${btnClass} ${s.invisible}`);
    }
  };

  return (
    <div className={s.ArrowInput}>
      <button type="button" onClick={handlerDecrement} className={btnClass}>
        <img src={caretLeftIcon} alt="caretLeftIcon" />
      </button>
      {numbers && <p>{num}</p>}
      {score && <p>{setScore[num - 3]}</p>}
      {system && <p>{setSystem[num - 3]}</p>}
      <button type="button" onClick={handlerIncrement}>
        <img src={caretRightIcon} alt="caretRightIcon" />
      </button>
    </div>
  );
}

export default ArrowInput;
