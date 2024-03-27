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
function initializedSuccess() {
  console.log('init Action');
  return { type: INITIALIZED_SUCCESS }
}

// authThunkCreator ->
export function initializeAppTC() {
  console.log('init App');
  return (dispatch) => {
      dispatch(initializedSuccess())
    }
  }

export default appReducer
