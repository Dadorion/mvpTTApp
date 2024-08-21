import React from "react";

import s from "./CloseTournamentModal.module.scss";

import CustomButtonBold from "components/CustomButtonBold/CustomButtonBold";
import CustomButtonTiny from "components/CustomButtonTiny/CustomButtonTiny";
import closeIcon from "@icons/Black/Regular/Close.svg";

function CloseTournamentModal({ onClose, onSave, isDisabled }) {
  return (
    <div className={s.modalContainer}>
      <div className={s.modalBackground} />
      <div className={s.modalContent}>
        <div className={s.modalBody}>
          <div className={s.modalHeader}>
            <h2>Прервать турнир?</h2>
            <img src={closeIcon} alt="closeIcon" onClick={onClose} />
          </div>
        </div>

        <p>Не сыгранные встречи сохранятся</p>
        <p>со счётом 0:0</p>

        <CustomButtonBold
          title={"Сохранить"}
          onClick={onSave}
        />
        <CustomButtonTiny title={"Выйти без сохранения"} onClick={onClose} />
      </div>
    </div>
  );
}

export default CloseTournamentModal;
