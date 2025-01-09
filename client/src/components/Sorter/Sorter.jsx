import React, { useState } from "react";

import s from "./Sorter.module.scss";

import swapIcon from "@icons/Black/Light/Swap_light.svg";
import searchIcon from "@icons/Black/Light/Search_light.svg";

function Sorter() {
  const [showSortMode, setShowSortMode] = useState(false);
  const [currentSortMode, setCurrentSortMode] = useState("Последние");

  const handleSortModeClick = (e) => {
    setCurrentSortMode(e.target.innerText);
    setShowSortMode(!showSortMode);
  };

  const sortMode = ["Последние", "По имени", "По фамилии", "По дате"];

  const sortModes = sortMode.map((mod, index) => {
    return (
      <div
        key={index}
        className={s.sortMode}
        onClick={(e) => handleSortModeClick(e)}
      >
        {mod}
      </div>
    );
  });


  return (
    <div className={s.Sorter}>
      <div className={s.swap} onClick={handleSortModeClick}>
        <img src={swapIcon} alt="swapIcon" />
        {currentSortMode}
      </div>
      {showSortMode && <div className={s.sortModes}>{sortModes}</div>}
      <img src={searchIcon} alt="searchIcon" />
    </div>
  );
}

export default Sorter;
