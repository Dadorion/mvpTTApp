const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

const initialState = {
  initialized: false,
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      }
    default:
      return state
  }
}

// appActionCreator
export function initializedSuccess() {
  return { type: INITIALIZED_SUCCESS }
}

// authThunkCreator ->
export function initializeAppTC() {
  return (dispatch) => {
      dispatch(initializedSuccess())
    }
  }

export default appReducer
