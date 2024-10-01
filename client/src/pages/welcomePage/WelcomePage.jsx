import React from "react";

import s from "./WelcomePage.module.scss";

import welcomeImg from "../../assets/images/welcome.png";
import logoImg from "../../assets/images/Logo.png";
import CustomButton from "components/CustomButtonBold/CustomButtonBold";
import caretDownIcon from "@icons/Black/Regular/CaretDown.svg";
import pingPongIcon from "@icons/Colored/PingPong.png";

import CardInfo from "components/CardInfo/CardInfo";

function WelcomePage() {
  return (
    <div className={s.WelcomePage}>
      <div className={s.firstScreen}>
        <img src={welcomeImg} alt="welcomeImg" />
        <img src={logoImg} alt="logoImg" className={s.logo} />
        <h1>Проводи турниры по настольному теннису</h1>
        <CustomButton title={"Войти"} />
        <CustomButton title={"Регистрация"} />
        <img src={caretDownIcon} alt="caretDownIcon" />
      </div>
      <div className={s.secondScreen}>
        <CardInfo
          img={pingPongIcon}
          title={"Упрости организацию"}
          body={
            "Создай турнир в несколько шагов, добавь участников и начни соревнования"
          }
        />
      </div>
    </div>
  );
}

export default WelcomePage;
