import React, { useEffect, useState } from "react"
import { Col, Image, Row, ListGroup, Card, Button } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import { Link, useParams } from "react-router-dom"
import Rating from "../utility/Rating"
import { listProductDetails } from "../actions/productActions"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../utility/Loader"
import Message from "../utility/Message"

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(0)
  let { id } = useParams()
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, product, error } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  const addToCart = () => {}
  return (
    <>
      <Link className="btn btn-outline-secondary btn-sm" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" message={error} />
      ) : (
        <Row className="py-3">
          <Col md={5}>
            <Image src={`./../` + product.images} fluid />
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
                        <Form.Control as="select" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Row>
                    <Col className="d-grid gap-2">
                      <Button className="btn btn-secondary btn-sm" disabled={product.countInStock === 0} onClick={addToCart}>
                        Add to Cart
                      </Button>
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
