import axios from "axios"

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST"
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS"
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL"
export const USER_SIGNUP_REQUEST = "USER_SIGNUP_REQUEST"
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS"
export const USER_SIGNUP_FAIL = "USER_SIGNUP_FAIL"
export const USER_DETAILS_REQUEST = "USER_DETAILS_REQUEST"
export const USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS"
export const USER_DETAILS_FAIL = "USER_DETAILS_FAIL"
export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST"
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS"
export const USER_UPDATE_FAIL = "USER_UPDATE_FAIL"
export const USER_UPDATE_RESET = "USER_UPDATE_RESET"
export const USER_LIST_SUCCESS = "USER_LIST_SUCCESS"
export const USER_LIST_FAIL = "USER_LIST_FAIL"
export const USER_LIST_REQUEST = "USER_LIST_REQUEST"
export const USER_LIST_RESET = "USER_LIST_RESET"
export const USER_LOGOUT = "USER_LOGOUT"
export const USER_DELETE_REQUEST = "USER_DELETE_REQUEST"
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS"
export const USER_DELETE_FAIL = "USER_DELETE_FAIL"
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })
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
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
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
}

export const signup = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST })
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
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const userDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })
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
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const updateProfile = (name, email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST })
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
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const fetchUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })
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
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/users/delete/${id}`, config)
    dispatch({
      type: USER_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
