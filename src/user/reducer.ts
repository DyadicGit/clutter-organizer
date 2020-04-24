import { CLEAR, SET_USER } from './actions'

const initialState = { type: 'NO_AUTH' }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, ...action.payload }
    }
    case CLEAR: {
      return initialState
    }
  }
  return state
}
export default reducer
