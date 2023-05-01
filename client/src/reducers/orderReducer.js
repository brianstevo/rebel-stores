import { ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_SUCCESS, ORDER_LIST_MY_RESET, ORDER_LIST_MY_SUCCESS, ORDER_LIST_SUCCESS } from '../actions/orderAction'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_SUCCESS:
      return {
        order: action.payload,
      }
    case ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    default:
      return state
  }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_SUCCESS:
      return {
        orders: action.payload,
      }
    case ORDER_LIST_MY_RESET:
      return { orders: [] }
    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_SUCCESS:
      return {
        orders: action.payload,
      }
    default:
      return state
  }
}
