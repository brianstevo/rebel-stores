import { END_LOADING, ERROR, LOADING, RESET, SUCCESS, SUCCESS_MESSAGE, RETAIN_MESSAGE_LOADING } from "../actions/changeActions"

export const loadingErrorReducer = (state = {}, action) => {
  switch (action.type) {
    case LOADING:
      return { loading: true, success: false, error: false }
    case END_LOADING:
      return { ...state, loading: false }
    case RETAIN_MESSAGE_LOADING:
      return { ...state, loading: true }
    case SUCCESS:
      return { loading: false, success: true, error: false }
    case SUCCESS_MESSAGE:
      return { loading: false, success: true, message: action.payload, error: false }
    case ERROR:
      return { loading: false, success: false, error: action.payload }
    case RESET:
      return { loading: false, success: false, error: false, message: false }
    default:
      return state
  }
}
