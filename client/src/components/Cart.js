import React from 'react'
// import { Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addItemToCart, removeFromCart } from '../actions/cartAction'
// import Message from '../utility/Message'

const Cart = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const proceedToCheckout = () => {
    if (userInfo) {
      navigate('/shipping')
    } else {
      navigate('/login')
    }
  }

  return (
    // <Row>
    //   <Col md={9}>
    //     <h1 className='mb-4'>Shopping Cart</h1>
    //     {cartItems.length === 0 ? (
    //       <Message variant='danger' message='Your Cart is Empty' />
    //     ) : (
    //       <ListGroup variant='flush'>
    //         {cartItems.map((item) => (
    //           <Row className='mb-4' key={item.name}>
    //             <Col md={2}>
    //               <Image src={item.image} alt={item.name} fluid rounded />
    //             </Col>
    //             <Col md={3}>{item.name}</Col>
    //             <Col md={2}>₹{item.price}</Col>
    //             <Col md={2}>
    //               <Form.Select style={{ paddingRight: '20px' }} value={item.quantity} onChange={(e) => dispatch(addItemToCart(item.product, e.target.value))}>
    //                 {[...Array(item.countInStock).keys()].map((x) => (
    //                   <option key={x + 1} value={x + 1}>
    //                     {x + 1}
    //                   </option>
    //                 ))}
    //               </Form.Select>
    //             </Col>
    //             <Col md={3}>
    //               <button className='btn btn-primary btn-sm' onClick={() => removeFromCartHandler(item.product)}>
    //                 Remove from Cart
    //               </button>
    //             </Col>
    //           </Row>
    //         ))}
    //       </ListGroup>
    //     )}
    //   </Col>
    //   {cartItems.length > 0 && (
    //     <Col md={3}>
    //       <Card>
    //         <ListGroup variant='flush'>
    //           <ListGroup.Item>
    //             <Row>
    //               <Col>Quantity:</Col>
    //               <Col>{cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)}</Col>
    //             </Row>
    //           </ListGroup.Item>
    //           <ListGroup.Item>
    //             <Row>
    //               <Col>Total Price:</Col>
    //               <Col>₹{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}</Col>
    //             </Row>
    //           </ListGroup.Item>
    //           <ListGroup.Item>
    //             <Row>
    //               <Col className='d-grid gap-2'>
    //                 <button className='btn btn-primary btn-sm' onClick={proceedToCheckout}>
    //                   Proceed to Checkout
    //                 </button>
    //               </Col>
    //             </Row>
    //           </ListGroup.Item>
    //         </ListGroup>
    //       </Card>
    //     </Col>
    //   )}
    // </Row>
    <>
      <div className='flex-container'>
        <h1>Shopping Cart</h1>
        <div className='flex-row mgY30 '>
          <div className=' flex-col-md-9 pdL30'>
            {cartItems.map((item) => (
              <div className='flex-row align-items-center sm-card-border sm-pdXY10' key={item.name}>
                <div className='flex-col-sm-2 flex-col-md-2'>
                  <img className='img-responsive ' src={item.image} alt={item.name} />
                </div>
                <div className='flex-col-sm-3 flex-col-md-3 pdX10 sm-pdX10 sm-pdT10'>{item.name}</div>
                <div className='flex-col-sm-2 pdX10 sm-pdX10 ssm-pdT10'>₹{item.price}</div>
                <div className='flex-col-xs-6 flex-col-sm-2 pdX10 sm-pdT10'>
                  <select class='select sm-mgL10' name='quantity' id='quantity' value={item.quantity} onChange={(e) => dispatch(addItemToCart(item.product, e.target.value))}>
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex-col-xs-6 flex-col-sm-3 sm-text-align-end '>
                  <button className='btn-md btn-black sm-mgR10' onClick={() => removeFromCartHandler(item.product)}>
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className='flex-col-md-3'>
            <button className='btn btn-block btn-black' onClick={proceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
