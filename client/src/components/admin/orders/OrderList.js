import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../../utility/Loader'
import Message from '../../../utility/Message'
import { listOrders } from '../../../actions/orderAction'

const OrderList = () => {
  let navigate = useNavigate()

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const orderList = useSelector((state) => state.orderList)
  const { orders } = orderList

  const loadingErrorSuccessObject = useSelector((state) => state.loadingErrorSuccess)
  const { loading, message, error } = loadingErrorSuccessObject

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])

  //   const deleteHandler = (id) => {
  //     dispatch(deleteUser(id))
  //   }

  return (
    <>
      {message && <Message variant='success' message={message} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='error' message={error} />
      ) : (
        <section className='flex-container'>
          <h1 className='headingTitle all-pdY10'>Orders</h1>
          <div style={{ overflowX: 'auto' }}>
            <table id='tableData' className='mgY30'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td className='text-align-center'>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fa-solid fa-xmark' style={{ color: 'red' }}></i>} </td>
                      <td className='text-align-center'>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fa-solid fa-xmark' style={{ color: 'red' }}></i>} </td>
                      <td>
                        <Link to={`${order._id}`}>
                          <button type='button' className='btn btn-sm btn-outline-success'>
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  )
}

export default OrderList
