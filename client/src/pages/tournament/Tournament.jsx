import React, { useState } from "react";
import s from "./Tournament.module.scss";
// import closeIcon from "../../assets/icons/svg_pack/Black/Regular/Close.svg";
import closeIcon from "@icons/Black/Regular/Close.svg";
import ArrowInput from "../../components/ArrowInput/ArrowInput";

function Tournament() {
  const [showNotice, setShowNotice] = useState(true);

  function handleCloseNotice() {
    setShowNotice(false);
  }

  return (
    <div className={s.Tournament}>
      <h1>Настройки турнира</h1>

      {showNotice && (
        <div className={s.notice}>
          <span>
            Пока доступна только круговая система: все играют со всеми
          </span>
          <img src={closeIcon} alt="closeIcon" onClick={handleCloseNotice} />
        </div>
      )}

      <div className={s.settings_list}>
        <div className={s.settings_list_item}>
          Разряд
          <ArrowInput showArrow numbers step="1" start="1" />
        </div>
      </div>
    </div>
  );
}

export default Tournament;
