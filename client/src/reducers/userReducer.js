import { USER_DELETE_SUCCESS, USER_DETAILS_SUCCESS, USER_LIST_RESET, USER_LIST_SUCCESS, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_SIGNUP_SUCCESS, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from "../actions/userActions"

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { userInfo: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_SUCCESS:
      return { userInfo: action.payload }
    default:
      return state
  }
}

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_SUCCESS:
      return { user: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_SUCCESS:
      return { user: action.payload }
    case USER_UPDATE_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_SUCCESS:
      return { users: action.payload }
    case USER_LIST_RESET:
      return { user: [] }
    default:
      return state
  }
}

export const userDeleteReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_DELETE_SUCCESS:
      return {}
    default:
      return state
  }
}
