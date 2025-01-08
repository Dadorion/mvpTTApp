import { homeAPI } from "../../api/api";

const SET_ALL_MATCHES = "home/SET_ALL_MATCHES";
const SET_ALL_WINS = "home/SET_ALL_WINS";
const SET_ALL_TOURNAMENTS = "home/SET_ALL_TOURNAMENTS";
const SET_LAST_MATCHES = "home/SET_LAST_MATCHES";
const SET_LAST_WINS = "home/SET_LAST_WINS";
const SET_AVERAGE_MATCHES = "home/SET_AVERAGE_MATCHES";
const SET_AVERAGE_WINS = "home/SET_AVERAGE_WINS";
const SET_TOTAL = "home/SET_TOTAL";
const SET_LAST = "home/SET_LAST";
const SET_LOSSES_LIST = "home/SET_LOSSES_LIST";

const initialState = {
  allMatches: 0,
  allWins: 0,
  allTournaments: 0,
  lastMatches: 0,
  lastWins: 0,
  averageMatches: 0,
  averageWins: 0,
  total: 0,
  last: 0,
  average: 0,
  lossesList: []
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_MATCHES:
      return {
        ...state,
        allMatches: action.payload,
      };
    case SET_ALL_WINS:
      return {
        ...state,
        allWins: action.payload,
      };
    case SET_ALL_TOURNAMENTS:
      return {
        ...state,
        allTournaments: action.payload,
      };
    case SET_LAST_MATCHES:
      return {
        ...state,
        lastMatches: action.payload,
      };
    case SET_LAST_WINS:
      return {
        ...state,
        lastWins: action.payload,
      };
    case SET_AVERAGE_MATCHES:
      return {
        ...state,
        averageMatches: action.payload,
      };
    case SET_AVERAGE_WINS:
      return {
        ...state,
        averageWins: action.payload,
      };
    case SET_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case SET_LAST:
      return {
        ...state,
        last: action.payload,
      };
    case SET_LOSSES_LIST:
      return {
        ...state,
        lossesList: action.payload,
      };
    default:
      return state;
  }
}

export function setAllMatches(allMatches) {
  return { type: SET_ALL_MATCHES, payload: allMatches };
}

export function setAllWins(allWins) {
  return { type: SET_ALL_WINS, payload: allWins };
}
export function setAllTournaments(allTournaments) {
  return { type: SET_ALL_TOURNAMENTS, payload: allTournaments };
}
export function setLastMatches(lastMatches) {
  return { type: SET_ALL_MATCHES, payload: lastMatches };
}

export function setLastWins(lastWins) {
  return { type: SET_ALL_WINS, payload: lastWins };
}
export function setAverageMatches(averageMatches) {
  return { type: SET_ALL_MATCHES, payload: averageMatches };
}

export function setAverageWins(averageWins) {
  return { type: SET_ALL_WINS, payload: averageWins };
}
export function setTotal(total) {
  return { type: SET_TOTAL, payload: total };
}
export function setLast(last) {
  return { type: SET_LAST, payload: last };
}
export function setLossesList(list) {
  return { type: SET_LOSSES_LIST, payload: list };
}

export function setStatsTC() {
  return async (dispatch) => {
    try {
      const answerAllMatches = await homeAPI.getAllMatches();
      const answerAllWins = await homeAPI.getAllWins();
      const answerAllTournaments = await homeAPI.getAllTournaments();
      const allMatches = answerAllMatches.data;
      const allWins = answerAllWins.data;
      const allTournaments = answerAllTournaments.data;

      const total = (allWins / allMatches) * 100;

      dispatch(setTotal(Math.round(total)));
      dispatch(setAllMatches(allMatches));
      dispatch(setAllWins(allWins));
      dispatch(setAllTournaments(allTournaments));
    } catch (error) {
      console.error("Error fetching homepage:", error);
    }
  };
}

export function setLossesListTC() {
  return async (dispatch) => {
    try {
      const answerLossesList = await homeAPI.getLossesList();

      dispatch(setLossesList(answerLossesList.data));
    } catch (error) {
      console.error("Error fetching losses list:", error);
    }
  };
}

export default homeReducer;
