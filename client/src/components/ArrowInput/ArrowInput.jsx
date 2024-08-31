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
 * @param {number} props.list - Массив строк для итерации.
 * @param {number} props.step - Шаг инкремента и декремента числового значения.
 * @param {number} props.start - Начальное значение числа.
 * @param {number} props.end - Конечное значение числа.
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
 *         step={1}
 *         start={3}
 *         end={5}
 *       />
 *     </div>
 *   );
 * };
 *
 * export default ExampleComponent;
 */

function ArrowInput({ numbers, list, step = 1, start = 1, end = 7 }) {
  const stepNum = Number(step);
  const startNum = Number(start);
  const endNum = numbers ? Number(end) : list.length;

  const [position, setPosition] = useState(startNum);
  const [leftBtnClass, setLeftBtnClass] = useState(`${s.btn} ${s.leftColumn}`);
  const [rightBtnClass, setRightBtnClass] = useState(
    `${s.btn} ${s.rightColumn}`,
  );

  const handlerIncrement = () => {
    if (position + stepNum > endNum) return;

    const newPosition = position + stepNum;
    setPosition(newPosition);

    setLeftBtnClass(`${s.btn} ${s.leftColumn}`);
    if (newPosition >= endNum) {
      setRightBtnClass(`${s.invisible}`);
    }
  };

  const handlerDecrement = () => {
    if (position - stepNum < 1) return;

    const newPosition = position - stepNum;
    setPosition(newPosition);

    setRightBtnClass(`${s.btn} ${s.rightColumn}`);
    if (newPosition <= 1) {
      setLeftBtnClass(`${s.invisible}`);
    }
  };

  return (
    <div className={s.ArrowInput}>
      <button type="button" onClick={handlerDecrement} className={leftBtnClass}>
        <img src={caretLeftIcon} alt="caretLeftIcon" />
      </button>

      <div className={s.centerColumn}>
        {numbers && <p>{position}</p>}
        {list && <p>{list[position - 1]}</p>}
      </div>

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
