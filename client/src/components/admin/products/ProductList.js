import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const ProductList = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const [click, setClick] = useState(false)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])

  return (
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
      <i className='fas fa-bars' onClick={(e) => setClick(true)}></i>
      {/* <h1 className='headingTitle all-pdY10 mgY10'>Products</h1> */}
      {/* <section className='mgY30'>
            </section> */}
      <Outlet />
    </>
  )
}

export default ProductList
