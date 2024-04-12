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

const reducers = combineReducers({
  auth: authReducer,
  app: appReducer,
  profile: profileReducer,
  registration: registrationReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

window.store = store;

export default store;
