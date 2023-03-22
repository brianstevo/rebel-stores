import axios from "axios"
import { ERROR, SUCCESS_MESSAGE } from "./changeActions"
export const CART_ADD_ITEM = "CART_ADD_ITEM"
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM"

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    // dispatch({ type: LOADING })
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      },
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    dispatch({
      type: SUCCESS_MESSAGE,
      payload: "Product Added to Cart",
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}
