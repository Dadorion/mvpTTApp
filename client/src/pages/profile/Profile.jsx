import React from "react";
import s from "./Profile.module.scss";

function Profile() {
  return (
    <div className={s.Profile}>
      <h1>Profile</h1>
      <div className={s.personalInfo}>
        <h3>Name</h3>
        <h3>Surname</h3>
      </div>
    </div>
  );
}

export default Profile;
