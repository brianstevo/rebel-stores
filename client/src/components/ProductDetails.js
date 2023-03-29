import React, { useEffect, useState } from 'react'
// import { Col, Image, Row, ListGroup, Card } from 'react-bootstrap'
// import Form from 'react-bootstrap/Form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Rating from '../utility/Rating'
import { listProductDetails } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
// import Message from '../utility/Message'
import { addItemToCart } from '../actions/cartAction'
import { RESET } from '../actions/changeActions'
import Loader from '../utility/Loader'

const ProductDetails = () => {
  let navigate = useNavigate()
  const [quantity, setQuantity] = useState(0)
  let { id } = useParams()
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { product } = productDetails

  const loadingErrorSuccessObject = useSelector((state) => state.loadingErrorSuccess)
  const { loading, message, error } = loadingErrorSuccessObject

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const existItem = cartItems.find((x) => x.product === id)
  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  const addToCart = () => {
    setQuantity(1)
    dispatch(addItemToCart(id, quantity))
  }
  const goToCart = () => {
    dispatch({ type: RESET })
    navigate('/cart')
  }
  return (
    <>
      {/* <Link className='btn btn-outline-primary btn-sm' to='/'>
        Go Back
      </Link>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger' message={error} />
      ) : (
        <Row className='py-3'>
          <Col md={5}>
            <Image src={product.image} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating rating={product.rating} text={`${product.reviews} reviews`}></Rating>
              </ListGroup.Item>
              <ListGroup.Item>₹{product.price}</ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} variant='flush'>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>₹{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Select style={{ paddingRight: '20px' }} value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Row>
                    <Col className='d-grid gap-2'>
                      {existItem ? (
                        // <Link className="btn btn-outline-primary btn-sm" to="/cart">
                        //   Go to Cart
                        // </Link>
                        <button className='btn btn-primary btn-sm' onClick={goToCart}>
                          Go to Cart
                        </button>
                      ) : (
                        <button className='btn btn-primary btn-sm' to='/' disabled={product.countInStock === 0} onClick={addToCart}>
                          Add to Cart
                        </button>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )} */}
      {loading ? (
        <Loader />
      ) : error ? (
        ''
      ) : (
        <div className='flex-container mgY20'>
          <div className='text-align-end '>
            <Link className='btn-outline-black btn-sm mgY10' to='/'>
              Go Back
            </Link>
          </div>
          <div className='flex-row'>
            <div className='flex-col-sm-4'>
              <img className='img-responsive' src={product.image} alt='product' />
            </div>
            <div className='flex-col-sm-7 pdL50 sm-pdY10 '>
              <h1 className='headingTitle'>{product.name}</h1>
              <p className='description pdY20'>{product.description}</p>
              <div className='flex-row mgY10'>
                <div className='flex-col-xs-6'>
                  <h3 className='subTitle'>Price:</h3>
                  <h3 className='subTitle pdY10'>₹{product.price}</h3>
                </div>
                <div className='flex-col-xs-6'>
                  <h3 className='subTitle'>Items In Stock:</h3>
                  <h3 className='subTitle pdY10'>{product.countInStock}</h3>
                </div>
              </div>
              <div className='flex-row mgY10 align-items-center'>
                <div className='flex-col-xs-6'>
                  {existItem ? (
                    // <Link className="btn btn-outline-primary btn-sm" to="/cart">
                    //   Go to Cart
                    // </Link>
                    <button className='btn btn-black mgY10' onClick={goToCart}>
                      Go to Cart
                    </button>
                  ) : (
                    <button className='btn btn-black mgY10' disabled={product.countInStock === 0} onClick={addToCart}>
                      Add To Cart
                    </button>
                  )}
                </div>
                <div className='flex-col-xs-6'>
                  <Rating rating={product.rating} text={`${product.reviews} reviews`}></Rating>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductDetails
