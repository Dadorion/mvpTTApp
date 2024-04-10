import { profileAPI } from "../../api/api";

const SET_PLAYER_ID = "profile/SET_PLAYER_ID";
const SET_NAME = "profile/SET_NAME";
const SET_SURNAME = "profile/SET_SURNAME";
const SET_PROFILE = "profile/SET_PROFILE";

const initialState = {
  id: 154,
  name: "Антон",
  surname: "Бабенко",
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER_ID:
      return {
        ...state,
        id: action.payload,
      };
    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case SET_SURNAME:
      return {
        ...state,
        surname: action.payload,
      };
    case SET_PROFILE:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        surname: action.payload.surname,
      };
    default:
      return state;
  }
}

export function setIdAC(id) {
  return { type: SET_PLAYER_ID, payload: id };
}
export function setNameAC(name) {
  return { type: SET_NAME, payload: name };
}
export function setSurnameAC(surname) {
  return { type: SET_SURNAME, payload: surname };
}
export function setMyProfile(profile) {
  return { type: SET_PROFILE, payload: profile };
}

export function getProfile() {
  return async (dispatch) => {
    try {
      const profile = await profileAPI.getMyProfile();
      dispatch(setMyProfile(profile));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
}

export default profileReducer;
