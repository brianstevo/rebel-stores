import React, { useEffect, useState } from "react"
import { Col, Image, Row, ListGroup, Card, Button } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Rating from "../utility/Rating"
import axios from "axios"

const ProductDetails = () => {
  let { id } = useParams()
  const [product, SetProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`)
      SetProduct(data)
    }
    fetchProduct()
  }, [id])

  return (
    <>
      <Link className="btn btn-outline-secondary btn-sm" to="/">
        Go Back
      </Link>
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
              <ListGroup.Item>
                <Row>
                  <Col className="d-grid gap-2">
                    <Button className="btn btn-secondary btn-sm" disabled={product.countInStock === 0}>
                      Add to Cart
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductDetails
