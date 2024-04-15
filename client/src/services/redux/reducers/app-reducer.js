import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

const initialState = {
  initialized: true,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
}

export function initializedSuccess() {
  return { type: INITIALIZED_SUCCESS };
}


export function initializeAppTC() {
  return async (dispatch) => {
    const userData = await dispatch(getAuthUserData());

    if (userData) {
      dispatch(initializedSuccess());
    }
  };
}

export default appReducer;
