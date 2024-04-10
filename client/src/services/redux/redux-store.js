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

const reducers = combineReducers({
  auth: authReducer,
  app: appReducer,
  profile: profileReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

window.store = store;

export default store;
