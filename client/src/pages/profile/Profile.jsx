import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Profile.module.scss";

import {getProfile} from '../../services/redux/reducers/profile-reducer'

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.profile);

  useEffect(() => {
    // Выполняем запрос профиля при монтировании компонента
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className={s.Profile}>
      <h1>Profile</h1>
      <div className={s.personalInfo}>
        <h3>{`Имя => ${user.name}`}</h3>
        <h3>{`Фамилия => ${user.surname}`}</h3>
      </div>
    </div>
  );
}

export default Profile;
