import { combineReducers } from 'redux'
import { cartReducer } from './reducers/cartReducer'
import { loadingErrorReducer } from './reducers/loadingErrorReducer'
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderListReducer } from './reducers/orderReducer'
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer } from './reducers/productReducer'
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userSignupReducer, userUpdateReducer } from './reducers/userReducer'
const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userDetails: userDetailsReducer,
  updateUser: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  loadingErrorSuccess: loadingErrorReducer,
  cart: cartReducer,
  createOrder: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
})

export default rootReducer
