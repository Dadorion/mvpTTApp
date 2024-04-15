import { authAPI } from "../../api/api";

const SET_USER_DATA = "auth/SET-USER-DATA";
const LOGIN = "auth/LOGIN";

const initialState = {
  user_id: null,
  email: null,
  password: null,
  isAuth: false,
};

export function setAuthUserData(payload) {
  return {
    type: SET_USER_DATA,
    payload,
  };
}
export function setLoginUserData(formData) {
  return {
    type: LOGIN,
    payload: formData,
  };
}

export function getAuthUserData() {
  return async (dispatch) => {
    try {
      if (!localStorage.token) return;
      const response = await authAPI.me();
      if (response.status === 200) {
        dispatch(
          setAuthUserData({
            ...response.data,
            isAuth: true,
          }),
        );
      }
    } catch (error) {
      dispatch(setAuthUserData({ isAuth: false }));
    }
  };
}

export function loginTC(formData) {
  return async (dispatch) => {
    const response = await authAPI.login(formData);
    const token = response.data;

    localStorage.setItem("token", token);

    dispatch(
      setLoginUserData({
        ...formData,
        isAuth: true,
      }),
    );
  };
}

export function logoutTC() {
  return async (dispatch) => {
    await authAPI.logout();

    const nullObject = {
      user_id: null,
      email: null,
      password: null,
      isAuth: false,
    };
    dispatch(setAuthUserData(nullObject));
    localStorage.removeItem("token");
  };
}

function updateUserData(state, payload) {
  return {
    ...state,
    ...payload,
  };
}

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return updateUserData(state, action.payload);
    case LOGIN:
      return updateUserData(state, action.payload);
    default:
      return state;
  }
}

export default authReducer;
