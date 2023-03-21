import axios from "axios"
import { END_LOADING, ERROR, LOADING, RESET, RETAIN_MESSAGE_LOADING, SUCCESS_MESSAGE } from "./changeActions"

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS"
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS"
export const USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS"
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS"
export const USER_UPDATE_RESET = "USER_UPDATE_RESET"
export const USER_LIST_SUCCESS = "USER_LIST_SUCCESS"
export const USER_LIST_RESET = "USER_LIST_RESET"
export const USER_LOGOUT = "USER_LOGOUT"
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS"

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOADING })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post("/api/users/login", { email, password }, config)
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    dispatch({ type: RESET })
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo")
  dispatch({
    type: USER_LOGOUT,
  })
  dispatch({
    type: USER_LIST_RESET,
  })
  dispatch({
    type: RESET,
  })
}

export const signup = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOADING })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post("/api/users/signup", { name, email, password }, config)
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    dispatch({
      type: RESET,
    })
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const userDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users/profile`, config)
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
    dispatch({ type: RESET })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const updateProfile = (name, email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/users/profile`, { name, email, password }, config)
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: SUCCESS_MESSAGE,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const fetchUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: RETAIN_MESSAGE_LOADING })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users`, config)
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
    dispatch({ type: END_LOADING })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const data = await axios.delete(`/api/users/delete/${id}`, config)
    dispatch({
      type: SUCCESS_MESSAGE,
      payload: data.data.message,
    })
    dispatch({
      type: USER_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
