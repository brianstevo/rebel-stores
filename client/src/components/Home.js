import React, { useEffect } from 'react'
import Product from '../utility/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from './../actions/productActions'
import Loader from '../utility/Loader'
// import Message from '../utility/Message'
const Home = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { products } = productList

  const loadingErrorSuccessObject = useSelector((state) => state.loadingErrorSuccess)
  const { loading, error } = loadingErrorSuccessObject

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        {
          /* {error && <Message variant='danger' message={'error'} />} */
        }
      ) : (
        <div className='flex-container'>
          <h1>Latest Product</h1>
          <div className='flex-row'>
            {products.map((product) => (
              <div className='flex-col-sm-6 flex-col-lg-4 flex-col-xl-3'>
                {' '}
                <Product key={product._id} product={product}></Product>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Home
