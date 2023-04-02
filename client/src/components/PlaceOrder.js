import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import CartStepper from '../utility/CartStepper'
// import Message from '../utility/Message'
import Loader from '../utility/Loader'
import { createOrder, getOrderDetails } from '../actions/orderAction'
import Stepper from '../utility/Stepper'

const PlaceOrder = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const cart = useSelector((state) => state.cart)
  const loadingErrorSuccessObject = useSelector((state) => state.loadingErrorSuccess)
  const { loading, success, error } = loadingErrorSuccessObject

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.quantity = cart.cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)
  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))
  cart.taxPrice = addDecimals(Number((0.09 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice)).toFixed(2)

  const orderCreate = useSelector((state) => state.createOrder)
  const { order } = orderCreate

  useEffect(() => {
    if (userInfo === null) {
      navigate('/login')
    }
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
    if (success) {
      dispatch(getOrderDetails(order._id))
      navigate(`/order/${order._id}`)
      // dispatch({ type: USER_DETAILS_RESET })
      // dispatch({ type: ORDER_CREATE_RESET })
    }
    //eslint-disable-next-line
  }, [success])

  const placeOrderHandler = async () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <>
      {/* <CartStepper step1 step2 step3 />
      {error && <Message variant='danger' message={error} />}
      {loading && <Loader />}
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
                          {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
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
                  <Col>Price</Col>
                  <Col>₹{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>GST</Col>
                  <Col>₹{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{cart.totalPrice}</Col>
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
      </Row> */}
      <section className='section bg-color-gre'>
        <div className='flex-container'>
          <Stepper step1='C' step2='C' step3='A' />
          {/* <h1 className='headingTitle all-pdY10'>Shopping Cart</h1> */}
          <div className='flex-row mgY30 '>
            <div className=' flex-col-md-9 pdL30'>
              <div className='flex-row sm-pdXY10'>
                <div className='flex-col-sm-12'>
                  <h2>Shipping</h2>
                  <p className='pdY10'>
                    <strong className='pdR10'>Address:</strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                  </p>
                </div>
              </div>
              <hr className='mgB20' />
              <div className='flex-row sm-pdXY10'>
                <div className='flex-col-sm-12'>
                  <h2>Payment Method</h2>
                  <p className='pdY10'>
                    <strong className='pdR10'>Method:</strong>
                    {cart.paymentMethod}
                  </p>
                </div>
              </div>
              <hr className='mgB20' />
              <h2 className='mgB20'>Order Items</h2>
              {cart.cartItems.map((item) => (
                <div className='flex-row align-items-center card-border sm-pdXY10 md-text-align-center' key={item.name}>
                  <div className='flex-col-sm-2 flex-col-md-2'>
                    <img className='img-responsive ' src={item.image} alt={item.name} />
                  </div>
                  <div className='flex-col-sm-4 pdX10 sm-pdX10 sm-pdT10 text-decoration-underline'>
                    <Link to={`/product/${item.product}`}>
                      <h4>{item.name} </h4>
                    </Link>
                  </div>
                  <div className='flex-col-xs-6 flex-col-sm-1 pdX10 sm-pdX10 sm-pdY10'>₹{item.price}</div>
                  <div className='flex-col-xs-6 flex-col-sm-5 pdX10 sm-pdY10 '>
                    {' '}
                    {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
                  </div>
                </div>
              ))}
            </div>
            <div className='flex-col-md-3 card-border height-100-percent'>
              <div className='flex-row'>
                <div className='flex-col-xs-6'>
                  <h4>Quantity:</h4>
                </div>
                <div className='flex-col-xs-6  xs-text-align-center'>{cart.quantity}</div>
              </div>
              <div className='flex-row '>
                <div className='flex-col-xs-6'>
                  <h4>Price:</h4>
                </div>
                <div className='flex-col-xs-6'>₹{cart.itemsPrice}</div>
              </div>
              <div className='flex-row '>
                <div className='flex-col-xs-6'>
                  <h4>GST:</h4>
                </div>
                <div className='flex-col-xs-6  xs-text-align-center'>₹{cart.taxPrice}</div>
              </div>
              <div className='flex-row '>
                <div className='flex-col-xs-6'>
                  <h4>Total:</h4>
                </div>
                <div className='flex-col-xs-6  xs-text-align-center'>₹{cart.totalPrice}</div>
              </div>
              <button className='btn btn-block btn-blue' onClick={placeOrderHandler}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PlaceOrder
