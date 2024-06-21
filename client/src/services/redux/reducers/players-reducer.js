import { playersAPI } from "../../api/api";

const SET_PLAYERS = "players/SET_PLAYERS";
const CHANGE_PLAYERS = "players/CHANGE_PLAYERS";
const CHANGE_COUNT_PLAYERS = "players/CHANGE_COUNT_PLAYERS";

const initialState = {
  allUserPlayers: [],
  countCheckedPlayers: 0
};

function playersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYERS:
      const players = action.payload.map((p) => {
        return {
          ...p,
          isChecked: false,
        };
      });
      return {
        ...state,
        allUserPlayers: players,
      };
    case CHANGE_PLAYERS:
      return {
        ...state,
        allUserPlayers: action.payload,
      };
    case CHANGE_COUNT_PLAYERS:
      return {
        ...state,
        countCheckedPlayers: action.payload,
      };
    default:
      return state;
  }
}

export function setAllUserPlayers(list) {
  return { type: SET_PLAYERS, payload: list };
}
export function changeUserPlayers(list) {
  return { type: CHANGE_PLAYERS, payload: list };
}
export function changeCountPlayers(count) {
  return { type: CHANGE_COUNT_PLAYERS, payload: count };
}

export function setAllUserPlayersTC() {
  return async (dispatch) => {
    const response = await playersAPI.getPlayers();
    const players = response.data.body;

    dispatch(setAllUserPlayers(players));
  };
}
export function addNewUserPlayerTC(name, surname) {
  return async (dispatch) => {
    await playersAPI.createNewPlayer(name, surname);
    const response = await playersAPI.getPlayers();
    const players = response.data.body;

    dispatch(setAllUserPlayers(players));
  };
}

export default playersReducer;
