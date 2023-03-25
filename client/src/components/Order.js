import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../utility/Loader'
import Message from '../utility/Message'
import axios from 'axios'
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderAction'

const Order = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let { id } = useParams()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order } = orderDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const loadingErrorSuccessObject = useSelector((state) => state.loadingErrorSuccess)
  const { loading, error } = loadingErrorSuccessObject

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  if (order && order.orderItems) {
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0))
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    if (!order || order._id !== id) {
      dispatch(getOrderDetails(id))
    }
    //eslint-disable-next-line
  }, [userInfo, dispatch])
  const successPaymentHandler = async () => {
    const { data } = await axios.post('/api/payment/checkout', { totalPrice: order.totalPrice })
    const options = {
      key: process.env.KEY_ID,
      currency: data.currency,
      amount: data.amount,
      name: 'Rebel Store',
      description: 'Test Wallet Transaction',
      image: '',
      order_id: data.id,
      handler: async (response) => {
        let paymentResponse = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
        }
        dispatch(payOrder(id, paymentResponse))
      },
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
        contact: '9999999999',
      },
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(id))
  }

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger' message={error}></Message>}
      {order && (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? <Message variant='success' message={`Delivered on ${order.deliveredAt}`}></Message> : <Message variant='danger' message='Not Delivered' disable={true}></Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? <Message variant='success' message={`Paid on ${order.paidAt}`}></Message> : <Message variant='danger' message='Not Paid' disable={true}></Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
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
                      <Col>Items</Col>
                      <Col>₹{order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>GST</Col>
                      <Col>₹{order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>₹{order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      <Button type='button' className='btn-block' onClick={successPaymentHandler}>
                        Pay
                      </Button>
                    </ListGroup.Item>
                  )}
                  {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                      <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default Order
