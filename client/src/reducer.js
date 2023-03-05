import { combineReducers } from "redux"
import { productDetailsReducer, productListReducer } from "./reducers/productReducer"
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
})

export default rootReducer
