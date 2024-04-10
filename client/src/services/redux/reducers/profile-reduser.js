const SET_PLAYER_ID = "profile/SET_PLAYER_ID";
const SET_NAME = "profile/SET_NAME";
const SET_SURNAME = "profile/SET_SURNAME";

const initialState = {
  id: null,
  name: null,
  surname: null,
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
    default:
      return state;
  }
}

// appActionCreator
export function setIdAC(id) {
  return { type: SET_PLAYER_ID, payload: id };
}
export function setNameAC(name) {
  return { type: SET_NAME, payload: name };
}
export function setSurnameAC(surname) {
  return { type: SET_SURNAME, payload: surname };
}

export default profileReducer;
