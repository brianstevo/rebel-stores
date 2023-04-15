import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../utility/Loader'
import Message from '../../../utility/Message'
import { deleteProduct, listProducts } from '../../../actions/productActions'
import { useNavigate } from 'react-router-dom'
// import Rating from "../../../utility/Rating"

const ViewProducts = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productList = useSelector((state) => state.productList)
  const { products } = productList

  // const productDelete = useSelector((state) => state.productDelete)
  const loadingErrorSuccess = useSelector((state) => state.loadingErrorSuccess)
  const { loading, success, message, error } = loadingErrorSuccess

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo, success])

  const deleteHandler = (id) => {
    if (window.confirm('Do you want to delete the selected record?')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <>
      {message && <Message variant='success' message={message} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='error' message={error} />
      ) : (
        <>
          <h1 className='headingTitle all-pdY10'>View Products</h1>
          <div style={{ overflowX: 'auto' }}>
            <table id='tableData' className='mgY30'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>₹{product.price}</td>
                      <td>{product.category}</td>
                      <td style={{ display: 'flex', flexDirection: 'row' }}>
                        {/* <LinkContainer to={`edit/${product._id}`}>
                      <button type="button" className="btn btn-sm btn-outline-success">
                        Edit
                      </button>
                    </LinkContainer> */}
                        <i style={{ marginLeft: '10px' }} className='fa-solid fa-trash' onClick={() => deleteHandler(product._id)}></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}

export default ViewProducts
