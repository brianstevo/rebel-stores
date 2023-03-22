import React, { useEffect, useState } from "react"
import { Col, Image, Row, ListGroup, Card } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import { Link, useNavigate, useParams } from "react-router-dom"
import Rating from "../utility/Rating"
import { listProductDetails } from "../actions/productActions"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../utility/Loader"
import Message from "../utility/Message"
import { addItemToCart } from "../actions/cartAction"

const ProductDetails = () => {
  let navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  let { id } = useParams()
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { product } = productDetails

  const loadingErrorSuccessObject = useSelector((state) => state.loadingErrorSuccess)
  const { loading, message, error } = loadingErrorSuccessObject

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const existItem = cartItems.find((x) => x.product === id)
  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  const addToCart = () => {
    dispatch(addItemToCart(id, quantity))
  }
  const goToCart = () => {
    navigate("/cart")
  }
  return (
    <>
      <Link className="btn btn-outline-primary btn-sm" to="/">
        Go Back
      </Link>
      {message && <Message variant="success" message={message} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" message={error} />
      ) : (
        <Row className="py-3">
          <Col md={5}>
            <Image src={product.image} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating rating={product.rating} text={`${product.reviews} reviews`}></Rating>
              </ListGroup.Item>
              <ListGroup.Item>${product.price}</ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} variant="flush">
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Select style={{ paddingRight: "20px" }} value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Row>
                    <Col className="d-grid gap-2">
                      {existItem ? (
                        // <Link className="btn btn-outline-primary btn-sm" to="/cart">
                        //   Go to Cart
                        // </Link>
                        <button className="btn btn-primary btn-sm" onClick={goToCart}>
                          Go to Cart
                        </button>
                      ) : (
                        <button className="btn btn-primary btn-sm" to="/" disabled={product.countInStock === 0} onClick={addToCart}>
                          Add to Cart
                        </button>
                      )}
                      {/* <button className="btn btn-primary btn-sm" disabled={product.countInStock === 0} onClick={addToCart}>
                        Add to Cart
                      </button> */}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductDetails
