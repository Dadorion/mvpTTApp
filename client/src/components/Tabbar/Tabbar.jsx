import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import s from './Tabbar.module.css'

import profileIcon from '../../assets/icons/svg_pack/Black/Light/User_light.svg'
import tournamentIcon from '../../assets/icons/svg_pack/Black/Light/Trophy_light.svg'
import homeIcon from '../../assets/icons/svg_pack/Black/Regular/House.svg'

function Tabbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showTabbar, setShowTabbar] = useState(true);

  const blockArr = ['/edit-my-profile', '/edit-photo'];
  useEffect(() => {
    setShowTabbar(!blockArr.includes(currentPath));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  return (
    showTabbar && (
      <div className={s.Tabbar}>
        <div className={currentPath === '/' ? s.active : s.deactivated}>
          <Link to='/'>
            <img src={homeIcon} alt='homeIcon' />
          </Link>
          <font>Главная</font>
        </div>

        <div className={currentPath === '/counter' ? s.active : s.deactivated}>
          <Link to='/counter'>
            <img src={tournamentIcon} alt='tournamentIcon' className={s.tournamentIcon} />
          </Link>
          <font>Счёт</font>
        </div>

        <div className={currentPath === '/profile' ? s.active : s.deactivated}>
          <Link to='/profile'>
            <img src={profileIcon} alt='profileIcon' />
          </Link>
          <font>Профиль</font>
        </div>
      </div>
    )
  );
}

export default Tabbar
