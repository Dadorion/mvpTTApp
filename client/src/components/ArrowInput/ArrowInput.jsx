import React, { useState } from "react";
import caretLeftIcon from "@icons/Black/Regular/CaretLeft.svg";
import caretRightIcon from "@icons/Black/Regular/CaretRight.svg";

import s from "./ArrowInput.module.scss";

/**
 * Компонент ArrowInput представляет собой элемент управления для инкремента и декремента числового значения с помощью стрелок.
 * Он предоставляет пользователю кнопки для увеличения и уменьшения значения на определенный шаг.
 *
 * @param {Object} props - Свойства компонента.
 * @param {boolean} [props.showArrow=false] - Флаг для отображения стрелок. По умолчанию не отображается.
 * @param {boolean} [props.numbers] - Флаг для отображения числа.
 * @param {boolean} [props.score] - Флаг для отображения значения из массива listScore.
 * @param {boolean} [props.system] - Флаг для отображения значения из массива listSystem.
 * @param {number} props.step - Шаг инкремента и декремента числового значения.
 * @param {number} props.start - Начальное значение числа.
 *
 * @returns {JSX.Element} Возвращает JSX элемент ArrowInput.
 *
 * @example
 * // Пример использования компонента:
 *
 * import ArrowInput from "./ArrowInput";
 *
 * const ExampleComponent = () => {
 *   return (
 *     <div>
 *       <ArrowInput
 *         showArrow={true}
 *         numbers={true}
 *         score={true}
 *         system={true}
 *         step={1}
 *         start={3}
 *       />
 *     </div>
 *   );
 * };
 *
 * export default ExampleComponent;
 */

function ArrowInput({
  numbers,
  score,
  system,
  category,
  step = 1,
  start = 1,
  end = 7,
}) {
  const listCategory = ["личный", "парный"];
  const listScore = ["сумма по партиям", "простой", "официальный"];
  const listSystem = ["круговая"];

  let arr = [];
  if (score) {
    arr = listScore;
  } else if (system) {
    arr = listSystem;
  } else if (category) {
    arr = listCategory;
  }

  const stepNum = Number(step);
  const startNum = Number(start);
  const endNum = numbers ? Number(end) : arr.length;

  const [position, setPosition] = useState(startNum);
  const [leftBtnClass, setLeftBtnClass] = useState(s.btn);
  const [rightBtnClass, setRightBtnClass] = useState(s.btn);

  const handlerIncrement = () => {
    if (position + stepNum > endNum) return;

    const newPosition = position + stepNum;
    setPosition(newPosition);

    setLeftBtnClass(s.btn);
    if (newPosition >= endNum) {
      setRightBtnClass(`${s.btn} ${s.invisible}`);
    }
  };

  const handlerDecrement = () => {
    if (position - stepNum < 1) return;

    const newPosition = position - stepNum;
    setPosition(newPosition);

    setRightBtnClass(s.btn);
    if (newPosition <= 1) {
      setLeftBtnClass(`${s.btn} ${s.invisible}`);
    } else {
      setLeftBtnClass(s.btn);
    }
  };

  return (
    <div className={s.ArrowInput}>
      <button type="button" onClick={handlerDecrement} className={leftBtnClass}>
        <img src={caretLeftIcon} alt="caretLeftIcon" />
      </button>
      {numbers && <p>{position}</p>}
      {score && <p>{listScore[position - 1]}</p>}
      {system && <p>{listSystem[position - 1]}</p>}
      {category && <p>{listCategory[position - 1]}</p>}
      <button
        type="button"
        onClick={handlerIncrement}
        className={rightBtnClass}
      >
        <img src={caretRightIcon} alt="caretRightIcon" />
      </button>
    </div>
  );
}

export default ArrowInput;
