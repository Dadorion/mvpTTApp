import { playersAPI } from "../../api/api";

const SET_PLAYER_STATS = "SET_PLAYER_STATS";

const initialState = {};

export const playerStatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER_STATS:
      return {
        ...state,
        [action.payload.id]: action.payload.data,
      };
    default:
      return state;
  }
};

export const setPlayerStats = (id, data) => ({
  type: SET_PLAYER_STATS,
  payload: { id, data },
});

export const fetchPlayerStatsTC = (id) => async (dispatch) => {
  try {
    const response = await playersAPI.getPlayerStats(id);

    if (!response || !response.data) {
      throw new Error("Пустой ответ от сервера.");
    }

    const data = response.data;
    const total = data.matches
      ? Math.round((data.wins / data.matches) * 100)
      : 0;

    const result = {
      name: data.name,
      surname: data.surname,
      wins: data.wins || 0,
      matches: data.matches || 0,
      tournaments: data.tournaments || 0,
      lossesList: transformLossesList(id, data.lossesList || []),
      total,
    };

    dispatch(setPlayerStats(id, result));
  } catch (error) {
    console.error("Ошибка загрузки данных игрока:", error.message);
  }
};

const transformLossesList = (playerId, lossesArray) => {
  return lossesArray.map((item) => {
    const isPlayerFirst = parseInt(item.fp_id, 10) === parseInt(playerId, 10);
    return {
      id: isPlayerFirst ? item.sp_id : item.fp_id,
      name: isPlayerFirst ? item.sp_name : item.fp_name,
      surname: isPlayerFirst ? item.sp_surname : item.fp_surname,
      count: parseInt(item.count, 10) || 0,
    };
  });
};
