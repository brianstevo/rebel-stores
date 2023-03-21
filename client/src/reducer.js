import { combineReducers } from "redux"
import { cartReducer } from "./reducers/cartReducer"
import { loadingErrorReducer } from "./reducers/loadingErrorReducer"
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from "./reducers/productReducer"
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userSignupReducer, userUpdateReducer } from "./reducers/userReducer"
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
  productUpdate: productUpdateReducer,
  productCreate: productCreateReducer,
  loadingErrorSuccess: loadingErrorReducer,
  cart: cartReducer,
})

export default rootReducer
