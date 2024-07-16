import { playersAPI } from "../../api/api";

const SET_PLAYING = "tournament/SET_PLAYING";

const initialState = {
  isPlaying: false
};

function tournamentReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYING:
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
    default:
      return state;
  }
}

export function setAllUserPlayers(list) {
  return { type: SET_PLAYING, payload: list };
}

export function setAllUserPlayersTC() {
  return async (dispatch) => {
    const response = await playersAPI.getPlayers();
    const players = response.data.body;

    dispatch(setAllUserPlayers(players));
  };
}

export default tournamentReducer;
