import React, { useEffect } from "react"
import { ListGroup, Row, Col, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../../utility/Loader"
import Message from "../../../utility/Message"
import { NavLink, Outlet, useNavigate } from "react-router-dom"

const ProductList = () => {
  let navigate = useNavigate()

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo, error } = userLogin
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
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
          <Col md={2} className="mb-3">
            <ListGroup as="ol">
              <NavLink to="view" className="linkbutton">
                View Products
              </NavLink>
              <NavLink to="create" className="linkbutton">
                New Product
              </NavLink>
            </ListGroup>
          </Col>
          <Col md={9}>
            <Card>
              <Outlet />
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductList
