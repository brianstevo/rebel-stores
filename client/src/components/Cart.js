import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {})
  return <div>hi</div>
}

export default Cart
