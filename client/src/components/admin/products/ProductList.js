import React, { useEffect } from "react"
import { ListGroup, Row, Col, Nav } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../../utility/Loader"
import Message from "../../../utility/Message"
import { fetchUsers } from "../../../actions/userActions"
import { Outlet, useNavigate } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"

const ProductList = () => {
  let navigate = useNavigate()

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo, error } = userLogin
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(fetchUsers())
    } else {
      navigate("/login")
    }
  }, [dispatch, navigate, userInfo])

  return (
    <>
      <h1>Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" message={error} />
      ) : (
        <Row className="my-3">
          <Col md={2}>
            <ListGroup as="ol">
              <ListGroup.Item as="li">
                <LinkContainer to="view">
                  <Nav.Link>View Products</Nav.Link>
                </LinkContainer>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <LinkContainer to="create">
                  <Nav.Link>New Product</Nav.Link>
                </LinkContainer>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={1}></Col>
          <Col md={9}>
            <Outlet />
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductList
