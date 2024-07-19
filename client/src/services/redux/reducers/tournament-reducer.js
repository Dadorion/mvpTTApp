import { playersAPI, tournamentsAPI, matchesAPI } from "../../api/api";

const SET_PLAYING = "tournament/SET_PLAYING";
const SET_MATCHES = "tournament/SET_MATCHES";

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

export function setAllUserPlayersTC() {
  return async (dispatch) => {
    const response = await playersAPI.getPlayers();
    const players = response.data.body;

    dispatch(setAllUserPlayers(players));
  };
}
export function setMatchesTC() {
  // tournamentsAPI, matchesAPI
  return async (dispatch) => {
    const responseTour = await tournamentsAPI.createNewTournament();
    const tournamentId = responseTour.data.body; //TODO написать

    const responseMatch = await tournamentsAPI.createNewTournament(
      tournamentId,
      // first_team_score, //TODO написать
      // second_team_score,
    );
    const matches = responseMatch.data.body; //TODO написать

    dispatch(setMatches(matches));
  };
}

export default tournamentReducer;
