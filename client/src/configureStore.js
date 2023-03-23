import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "./reducer"

export default function configureStore() {
  const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
  const cartInfoFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
  const shippingInfoFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}
  const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    cart: { cartItems: cartInfoFromStorage, shippingAddress: shippingInfoFromStorage },
  }

  const middleware = [thunk]
  const middlewareEnhancer = applyMiddleware(...middleware)

  const composedEnhancers = composeWithDevTools(middlewareEnhancer)

  const store = createStore(rootReducer, initialState, composedEnhancers)

  return store
}
