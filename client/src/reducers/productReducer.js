import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_SUCCESS } from '../actions/productActions'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_SUCCESS:
      return { products: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_SUCCESS:
      return { product: action.payload }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_RESET:
      return { success: false }
    default:
      return state
  }
}

export const productCreateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}
