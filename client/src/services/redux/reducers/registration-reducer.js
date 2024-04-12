import { authAPI } from "../../api/api";

const REGISTRATION = "registration/REGISTRATION";
const CHANGE_EMAIL = "registration/CHANGE_EMAIL";
const CHANGE_PASSWORD = "registration/CHANGE_PASSWORD";

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

export function registrationTC(formData) {
  return async () => {
    const response = await authAPI.registration(formData);
    if (response.status) {
      console.log("response.status: ", response.status);
    }
  };
}

function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION:
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

export default registrationReducer;
