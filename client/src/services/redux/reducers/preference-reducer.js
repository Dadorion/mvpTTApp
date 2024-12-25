const SET_GO_TO_PROFILE = "profile/SET_GO_TO_PROFILE";
const SET_GO_TO_ABOUT = "profile/SET_GO_TO_ABOUT";

const initialState = {
  redirectToProfile: false,
  redirectToAbout: false,
};

function preferenceReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GO_TO_PROFILE:
      return {
        ...state,
        redirectToProfile: action.payload,
      };
    case SET_GO_TO_ABOUT:
      return {
        ...state,
        redirectToAbout: action.payload,
      };
    default:
      return state;
  }
}

export function setGoToProfile(go) {
  return { type: SET_GO_TO_PROFILE, payload: go };
}

export function setGoToAbout() {
  return { type: SET_GO_TO_ABOUT, payload: true };
}

export default preferenceReducer;
