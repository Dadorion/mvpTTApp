import { applyMiddleware, combineReducers, legacy_createStore as createStore, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

const reducers = combineReducers({
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

window.store = store

export default store
