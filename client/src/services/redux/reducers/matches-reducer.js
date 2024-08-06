import { matchesAPI } from "services/api/api";

const SET_MATCHES = "matches/SET_MATCHES";
const CHANGE_FIRST_SCORE = "matches/CHANGE_FIRST_SCORE";
const CHANGE_SECOND_SCORE = "matches/CHANGE_SECOND_SCORE";

const initialState = {
  firstScoreInput: null,
  secondScoreInput: null,
  lastMatches: [],
};

function matchesReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FIRST_SCORE:
      return {
        ...state,
        firstScoreInput: action.payload,
      };
    case CHANGE_SECOND_SCORE:
      return {
        ...state,
        secondScoreInput: action.payload,
      };
    case SET_MATCHES:
      return {
        ...state,
        lastMatches: action.payload,
      };
    default:
      return state;
  }
}

export function changeFirstScore(value) {
  return { type: CHANGE_FIRST_SCORE, payload: value };
}
export function changeSecondScore(value) {
  return { type: CHANGE_SECOND_SCORE, payload: value };
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

export function addScoreToDataBaseTC({ matchId, fScore, sScore }) {
  return async (dispatch) => {
    await matchesAPI.addScore({ matchId, fScore, sScore });
  };
}

export default matchesReducer;
