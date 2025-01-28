import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  compose,
} from "redux";
import thunkMiddleware from "redux-thunk";

import authReducer from "./reducers/auth-reducer";
import appReducer from "./reducers/app-reducer";
import profileReducer from "./reducers/profile-reducer";
import registrationReducer from "./reducers/registration-reducer";
import loginReducer from "./reducers/login-reducer";
import playersReducer from "./reducers/players-reducer";
import tournamentReducer from "./reducers/tournament-reducer";
import matchesReducer from "./reducers/matches-reducer";
import homeReducer from "./reducers/home-reducer";
import preferenceReducer from "./reducers/preference-reducer";
import { playerStatsReducer } from "./reducers/playerStats-reducer";

const reducers = combineReducers({
  auth: authReducer,
  app: appReducer,
  profile: profileReducer,
  registration: registrationReducer,
  login: loginReducer,
  players: playersReducer,
  playerStats: playerStatsReducer,
  tournament: tournamentReducer,
  matches: matchesReducer,
  home: homeReducer,
  preference: preferenceReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

window.store = store;

export default store;
