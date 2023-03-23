import React, { useEffect, useState } from "react"
import { Form, Col, Container, Row, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { savePaymentMethod } from "../actions/cartAction"
import CartStepper from "../utility/CartStepper"

const Payment = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const [paymentMethod, setPaymentMethod] = useState("PayPal")
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    navigate("/shipping")
  }
  useEffect(() => {
    if (userInfo === null) {
      navigate("/login")
    }
  }, [userInfo]) // eslint-disable-line react-hooks/exhaustive-deps

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder")
  }

  return (
    <>
      <CartStepper step1 step2 />
      <Container>
        <Card className="rounded p-3 my-2">
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">Select Method</Form.Label>
              <Col className="mt-3">
                <Form.Check type="radio" label="PayPal or Credit Card" id="PayPal" name="paymentMethod" value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                {/* <Form.Check
                        type='radio'
                        label='Stripe'
                        id='Stripe'
                        name='paymentMethod'
                        value='Stripe'
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check> */}
              </Col>
            </Form.Group>
            <button type="submit" className="btn btn-primary btn-sm mt-3">
              Continue
            </button>
          </Form>
        </Card>
      </Container>
    </>
  )
}

export default Payment
