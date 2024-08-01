import { matchesAPI } from "services/api/api";

const SET_MATCHES = "matches/SET_MATCHES";

const initialState = {
  lastMatches: []
};

function matchesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MATCHES:
      return {
        ...state,
        lastMatches: action.payload,
      };
    default:
      return state;
  }
}


export function setMatches(list) {
  return { type: SET_MATCHES, payload: list };
}

export function setLastMatchesTC() {
  return async (dispatch) => {
    const lastMatches = await matchesAPI.getLastMatches();

    

    dispatch(setMatches(lastMatches.data));
  };
}

export default matchesReducer;
