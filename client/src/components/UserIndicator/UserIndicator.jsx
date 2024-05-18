import React from "react";

import userRedIcon from "@icons/Colored/User_red.svg"
import userGreenIcon from "@icons/Colored/User_green.svg"

function UserIndicator({condition}){
    return <div>
      {condition ? (
        <img src={userGreenIcon} alt="Green Icon"/>
      ) : (
        <img src={userRedIcon} alt="Red Icon"/>
      )}
    </div>
}

export default UserIndicator;
