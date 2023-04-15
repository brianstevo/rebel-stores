import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../utility/Loader'
import Message from '../../../utility/Message'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const ProductList = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const [click, setClick] = useState(false)
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo, error } = userLogin
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger' message={error} />
      ) : (
        // <Row className="my-3">
        //   <Col md={2} className="mb-3">
        //     <ListGroup as="ol">
        //       <NavLink to="view" className="linkbutton">
        //         View Products
        //       </NavLink>
        //       <NavLink to="create" className="linkbutton">
        //         New Product
        //       </NavLink>
        //     </ListGroup>
        //   </Col>
        //   <Col md={9}>
        //     <Card>
        //       <Outlet />
        //     </Card>
        //   </Col>
        // </Row>
        <>
          <nav className={click ? 'side-nav open' : 'side-nav'}>
            <ul>
              <i className='fas fa-times' onClick={(e) => setClick(false)}></i>
              <li>
                <NavLink to='view' className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')} onClick={(e) => setClick(false)}>
                  View Products
                </NavLink>
              </li>
              <li>
                <NavLink to='create' className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')} onClick={(e) => setClick(false)}>
                  New Product
                </NavLink>
              </li>
            </ul>
          </nav>
          <i class='fas fa-bars' onClick={(e) => setClick(true)}></i>
          <section className='flex-container'>
            {/* <h1 className='headingTitle all-pdY10 mgY10'>Products</h1> */}
            {/* <section className='mgY30'>
            </section> */}
            <Outlet />
          </section>
        </>
      )}
    </>
  )
}

export default ProductList
