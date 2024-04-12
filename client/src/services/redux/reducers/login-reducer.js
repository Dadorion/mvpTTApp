import { authAPI } from "../../api/api";

const LOGIN = "login/LOGIN";
const CHANGE_EMAIL = "login/CHANGE_EMAIL";
const CHANGE_PASSWORD = "login/CHANGE_PASSWORD";

const initialState = {
  email: '',
  password: '',
};

export function changeEmail(email) {
  return { type: CHANGE_EMAIL, payload: email };
}
export function changePassword(password) {
  return { type: CHANGE_PASSWORD, payload: password };
}

export function loginTC(formData) {
  return async (dispatch) => {
    const response = await authAPI.login(formData);
    const token = response.data

    localStorage.setItem('token', token)

    dispatch(changeEmail(""));
    dispatch(changePassword(""));
  };
}

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    default:
      return state;
  }
}

export default loginReducer;
