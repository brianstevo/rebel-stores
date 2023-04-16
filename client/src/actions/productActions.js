import axios from 'axios'
import { END_LOADING, ERROR, LOADING, RESET, RETAIN_MESSAGE_LOADING, SUCCESS_MESSAGE } from './changeActions'

export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS'
export const PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS'
export const PRODUCT_DELETE_RESET = 'PRODUCT_DELETE_RESET'
export const PRODUCT_CREATE_SUCCESS = 'PRODUCT_CREATE_SUCCESS'
export const PRODUCT_CREATE_RESET = 'PRODUCT_CREATE_RESET'
export const PRODUCT_UPDATE_SUCCESS = 'PRODUCT_UPDATE_SUCCESS'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: RETAIN_MESSAGE_LOADING })
    const { data } = await axios.get('/api/products')
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
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

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING })
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
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

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const deletedProduct = await axios.delete(`/api/products/delete/${id}`, config)
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
    dispatch({
      type: SUCCESS_MESSAGE,
      payload: deletedProduct.data.message,
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const updateProduct = (id, name) => async (dispatch, getState) => {
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
    const { data } = await axios.put(`/api/products/edit/${id}`, { name }, config)
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
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

export const createProduct = (formData) => async (dispatch, getState) => {
  try {
    console.log(formData)
    dispatch({ type: LOADING })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/products/create`, formData, config)
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
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
