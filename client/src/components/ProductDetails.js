import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Rating from '../utility/Rating'
import { listProductDetails } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../actions/cartAction'
import { RESET } from '../actions/changeActions'
import Loader from '../utility/Loader'
import Message from '../utility/Message'
import Review from './Review'

const ProductDetails = () => {
  let navigate = useNavigate()
  let { id } = useParams()
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { product } = productDetails

  const loadingErrorSuccessObject = useSelector((state) => state.loadingErrorSuccess)
  const { loading, error } = loadingErrorSuccessObject

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const existItem = cartItems.find((x) => x.product === id)
  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  const addToCart = () => {
    dispatch(addItemToCart(id, 1))
  }
  const goToCart = () => {
    dispatch({ type: RESET })
    navigate('/cart')
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='error' message={error} />
      ) : (
        <section>
          <div className='flex-container '>
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
            <Review id={product._id} reviews={product.reviewsArray} />
          </div>
        </section>
      )}
    </>
  )
}

export default ProductDetails
