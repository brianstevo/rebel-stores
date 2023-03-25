import axios from 'axios'
import { CART_CLEAR_ITEMS } from './cartAction'
import { ERROR, LOADING, SUCCESS, SUCCESS_MESSAGE } from './changeActions'
import { logout } from './userActions'
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS'
export const ORDER_CREATE_RESET = 'ORDER_CREATE_RESET'
export const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS'
export const ORDER_LIST_MY_SUCCESS = 'ORDER_LIST_MY_SUCCESS'
export const ORDER_LIST_MY_RESET = 'ORDER_LIST_MY_RESET'
export const ORDER_LIST_SUCCESS = 'ORDER_LIST_SUCCESS'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/order`, order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: SUCCESS_MESSAGE,
      payload: data.message,
    })
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    })
    localStorage.removeItem('cartItems')
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Authorization failed' || message === 'No token found') {
      dispatch(logout())
    }
    dispatch({
      type: ERROR,
      payload: message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/order/${id}`, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
    dispatch({
      type: SUCCESS,
    })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Authorization failed' || message === 'No token found') {
      dispatch(logout())
    }
    dispatch({
      type: ERROR,
      payload: message,
    })
  }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/order/${orderId}/pay`, paymentResult, config)
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
    dispatch({
      type: SUCCESS_MESSAGE,
      payload: data.message,
    })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Authorization failed' || message === 'No token found') {
      dispatch(logout())
    }
    dispatch({
      type: ERROR,
      payload: message,
    })
  }
}

export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/order/${id}/deliver`, {}, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
    dispatch({
      type: SUCCESS_MESSAGE,
      payload: data.message,
    })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Authorization failed' || message === 'No token found') {
      dispatch(logout())
    }
    dispatch({
      type: ERROR,
      payload: message,
    })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ERROR,
      payload: message,
    })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders`, config)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ERROR,
      payload: message,
    })
  }
}
