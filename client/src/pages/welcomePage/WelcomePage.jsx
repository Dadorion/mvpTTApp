import React from "react";
import { Link } from "react-router-dom";

import s from "./WelcomePage.module.scss";

import welcomeImg from "../../assets/images/welcome.png";
import logoImg from "../../assets/images/Logo.png";
import CustomButton from "components/CustomButtonBold/CustomButtonBold";
import pingPongIcon from "@icons/Colored/PingPong.png";

import CardInfo from "components/CardInfo/CardInfo";

function WelcomePage() {
  const cards = [
    {
      img: pingPongIcon,
      title: "Упрости организацию",
      body: "Создай турнир в несколько шагов, добавь участников и начни соревнования",
    },
    {
      img: pingPongIcon,
      title: "Продвинь соревнования",
      body: "Добавь дополнительные уровни сложности, улучши игровую концентрацию",
    },
    {
      img: pingPongIcon,
      title: "Стабильность игры",
      body: "Поддерживай стабильный игровой процесс, предотвращая проблемы",
    },
  ];
  const printCards = cards.map((card, index) => {
    return (
      <CardInfo
        key={index}
        img={card.img}
        title={card.title}
        body={card.body}
      />
    );
  });
  return (
    <div className={s.WelcomePage}>
      <img src={welcomeImg} alt="welcomeImg" className={s.headImage} />
      <div className={s.firstScreen}>
        <img src={logoImg} alt="logoImg" className={s.logo} />
        <h1>Проводи турниры по настольному теннису</h1>
        <Link to="/home">
          <CustomButton title={"Начать"} />
        </Link>
      </div>
      <div className={s.secondScreen}>{printCards}</div>
      <div className={s.repeatButtons}>
        <Link to="/home">
          <CustomButton title={"Начать"} />
        </Link>
      </div>

      <p>TabTen app v. 4.0</p>
      <p>Created by Anton Babenko</p>
    </div>
  );
}

export default WelcomePage;
