import { playersAPI, tournamentsAPI, matchesAPI } from "../../api/api";

const SET_PLAYING = "tournament/SET_PLAYING";
const SET_MATCHES = "tournament/SET_MATCHES";
const SET_ON_AIR = "tournament/SET_ON_AIR";

const initialState = {
  onAir: false,
  matches: [],
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
    case SET_MATCHES:
      return {
        ...state,
        matches: action.payload,
      };
    case SET_ON_AIR:
      return {
        ...state,
        onAir: action.payload,
      };
    default:
      return state;
  }
}

export function setAllUserPlayers(list) {
  return { type: SET_PLAYING, payload: list };
}
export function setMatches(list) {
  return { type: SET_MATCHES, payload: list };
}
export function setOnAir(isOnAir) {
  return { type: SET_ON_AIR, payload: isOnAir };
}

export function setAllUserPlayersTC() {
  return async (dispatch) => {
    const response = await playersAPI.getPlayers();
    const players = response.data.body;

    dispatch(setAllUserPlayers(players));
  };
}
export function setMatchesTC(matches) {
  return async (dispatch) => {
    const responseTour = await tournamentsAPI.createNewTournament();
    const tournamentId = responseTour.data;

    const responseMatch = await matchesAPI.addMatchesToTournament({
      tournamentId,
      matches,
    });
    const isMatchesAdded = responseMatch.data;
    if (isMatchesAdded) {
      dispatch(setMatches(matches));
      dispatch(setOnAir(true));
    } else {
      dispatch(setOnAir(false));
    }
  };
}
export function checkTournamentOnAirTC(matches) {
  return async (dispatch) => {
    const isOnAirResponse = await tournamentsAPI.checkTournamentOnAir();

    dispatch(setOnAir(isOnAirResponse.data.on_air));
  };
}
export function closeTournamentTC() {
  return async (dispatch) => {
    const response = await tournamentsAPI.closeTournament();

    dispatch(setOnAir(response.data.on_air));
  };
}

export default tournamentReducer;
