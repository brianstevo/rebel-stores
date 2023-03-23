import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import { createOrder } from "../actions/orderActions"
import CartStepper from '../utility/CartStepper'
import Message from '../utility/Message'
import axios from 'axios'

const PlaceOrder = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const loadingErrorSuccessObject = useSelector((state) => state.loadingErrorSuccess)
  const { loading, success, message, error } = loadingErrorSuccessObject

  if (!cart.shippingAddress.address) {
    navigate('/shipping')
  } else if (!cart.paymentMethod) {
    navigate('/payment')
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const loadScript = () => {
    let src = 'https://checkout.razorpay.com/v1/checkout.js'
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

  //   const orderCreate = useSelector((state) => state.orderCreate)
  //   const { order } = orderCreate

  useEffect(() => {
    // if (success) {
    //       navigate(`/order/${order._id}`)
    //     dispatch({ type: USER_DETAILS_RESET })
    //     dispatch({ type: ORDER_CREATE_RESET })
    // }
    // eslint-disable-next-line
  }, [])

  const placeOrderHandler = async () => {
    const { data } = await axios.post('/api/payment/checkout', { totalPrice: cart.totalPrice })
    loadScript()
    const options = {
      key: process.env.KEY_ID,
      currency: data.currency,
      amount: data.amount,
      name: 'Learning To Code Online',
      description: 'Test Wallet Transaction',
      image: '',
      order_id: data.id,
      callback_url: 'http://localhost:8000/api/payment/paymentverification',
      prefill: {
        name: 'Anirudh Jwala',
        email: 'anirudh@gmail.com',
        contact: '9999999999',
      },
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
    // dispatch(
    //   createOrder({
    //     orderItems: cart.cartItems,
    //     shippingAddress: cart.shippingAddress,
    //     paymentMethod: cart.paymentMethod,
    //     itemsPrice: cart.itemsPrice,
    //     shippingPrice: cart.shippingPrice,
    //     taxPrice: cart.taxPrice,
    //     totalPrice: cart.totalPrice,
    //   })
    // )
  }

  return (
    <>
      <CartStepper step1 step2 step3 />
      {error && <Message variant='danger' message={error} />}
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant='danger' message='Your cart is empty' />
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = ${item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Price before Tax</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Charge</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>GST</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrder
