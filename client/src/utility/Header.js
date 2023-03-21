import React from "react"
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../actions/userActions"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    navigate("/")
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect style={{ padding: "10px" }}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Rebel Store</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fa-solid fa-cart-shopping"></i>Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name}>
                <LinkContainer to="/Profile">
                  <NavDropdown.Item> profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fa-solid fa-user"></i>Login
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo?.isAdmin && (
              <NavDropdown title="Admin Dashboard">
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/products/view">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
