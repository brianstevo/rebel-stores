import React, { useState } from 'react'
// import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { Link, NavLink, useNavigate } from 'react-router-dom'
const Header = () => {
  const [click, setClick] = useState(false)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = () => {
    setClick(false)
    dispatch(logout())
    navigate('/')
  }
  return (
    // <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect style={{ padding: '10px' }}>
    //   <Container>
    //     <LinkContainer to='/'>
    //       <Navbar.Brand>Rebel Store</Navbar.Brand>
    //     </LinkContainer>
    //     <Navbar.Toggle aria-controls='basic-navbar-nav' />
    //     <Navbar.Collapse id='basic-navbar-nav'>
    //       <Nav classNameName='ms-auto'>
    //         <LinkContainer to='/cart'>
    //           <Nav.Link>
    //             <i classNameName='fa-solid fa-cart-shopping'></i>Cart
    //           </Nav.Link>
    //         </LinkContainer>
    //         {userInfo ? (
    //           <NavDropdown title={userInfo.name}>
    //             <LinkContainer to='/Profile'>
    //               <NavDropdown.Item> profile</NavDropdown.Item>
    //             </LinkContainer>
    //             <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
    //           </NavDropdown>
    //         ) : (
    //           <LinkContainer to='/login'>
    //             <Nav.Link>
    //               <i classNameName='fa-solid fa-user'></i>Login
    //             </Nav.Link>
    //           </LinkContainer>
    //         )}
    //         {userInfo?.isAdmin && (
    //           <NavDropdown title='Admin Dashboard'>
    //             <LinkContainer to='/admin/users'>
    //               <NavDropdown.Item>Users</NavDropdown.Item>
    //             </LinkContainer>
    //             <LinkContainer to='/admin/products/view'>
    //               <NavDropdown.Item>Products</NavDropdown.Item>
    //             </LinkContainer>
    //           </NavDropdown>
    //         )}
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <nav className={click ? 'navbar menu-active' : 'navbar'}>
      <Link className='nav__link' to='/' onClick={(e) => setClick(false)}>
        <h1 className='navTitle'>Rebel Store</h1>
      </Link>
      <div className='push-left'>
        <button id='menu-toggler' className={click ? 'hamburger menu-active' : 'hamburger'} onClick={(e) => setClick(!click)}>
          <span className='hamburger-line hamburger-line-top'></span>
          <span className='hamburger-line hamburger-line-middle'></span>
          <span className='hamburger-line hamburger-line-bottom'></span>
        </button>
        <ul id='primary-menu' className='menu nav-menu'>
          <li className='menu-item current-menu-item' onClick={(e) => setClick(false)}>
            <NavLink to='/cart' className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}>
              <i className='fa-solid fa-cart-shopping'></i>Cart
            </NavLink>
          </li>
          {userInfo ? (
            <>
              <li className='menu-item dropdown floatRight'>
                <Link className='dropbtn'>{userInfo.name}</Link>
                <div className='dropdown-content'>
                  <Link className='mg0' to='/profile' onClick={(e) => setClick(false)}>
                    Profile
                  </Link>
                  {/* <Link className='mg0'>Profile</Link> */}
                </div>
              </li>
              <li className='menu-item '>
                <Link className='nav__link' to='/login' onClick={logoutHandler}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li className='menu-item '>
              <Link className='nav__link' to='/login' onClick={(e) => setClick(false)}>
                Login
              </Link>
            </li>
          )}
          {userInfo?.isAdmin && (
            <li className='menu-item dropdown floatRight'>
              <Link className='dropbtn'>Admin DashBoard</Link>
              <div className='dropdown-content'>
                <Link className='mg0' to='/admin/users' onClick={(e) => setClick(false)}>
                  Users
                </Link>
                <Link className='mg0' to='/admin/products/view' onClick={(e) => setClick(false)}>
                  Products
                </Link>
                <Link className='mg0' to='/admin/order' onClick={(e) => setClick(false)}>
                  Orders
                </Link>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Header
