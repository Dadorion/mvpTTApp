import { profileAPI } from "../../api/api";

const SET_NEW_PASSWORD = "profile/SET_NEW_PASSWORD";
const SET_NEW_PASSWORD_REPEAT = "profile/SET_NEW_PASSWORD_REPEAT";

const initialState = {
  newPassword: "",
  newPasswordRepeat: "",
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEW_PASSWORD:
      return {
        ...state,
        newPassword: action.payload,
      };
    case SET_NEW_PASSWORD_REPEAT:
      return {
        ...state,
        newPasswordRepeat: action.payload,
      };
    default:
      return state;
  }
}

export function setNewPassword(pass) {
  return { type: SET_NEW_PASSWORD, payload: pass };
}

export function setNewPasswordRepeat(pass) {
  return { type: SET_NEW_PASSWORD_REPEAT, payload: pass };
}

export function changePasswordTC(newPassword) {
  return async (dispatch) => {
    try {
      const answer = await profileAPI.changePassword(newPassword);

      if (answer.status === 200) {
        dispatch(setNewPassword(""));
        dispatch(setNewPasswordRepeat(""));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
}

export default profileReducer;
