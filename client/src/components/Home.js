import React from "react"
import { Col, Row } from "react-bootstrap"
import Product from "../utility/Product"

const Home = () => {
  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Home

const products = [
  {
    _id: 1,
    name: "iPhone 9",
    images: "pexels-photo-1786433.jpeg",
    description: "An apple mobile which is nothing like apple",
    brand: "Apple",
    category: "smartphones",
    price: 549,
    countInStock: 3,
    rating: 3.69,
    reviews: 4,
  },
  {
    _id: 2,
    name: "iPhone 9",
    images: "pexels-photo-1786433.jpeg",
    description: "An apple mobile which is nothing like apple",
    brand: "Apple",
    category: "smartphones",
    price: 549,
    countInStock: 3,
    rating: 1,
    reviews: 4,
  },
  {
    _id: 3,
    name: "iPhone 9",
    images: "pexels-photo-1786433.jpeg",
    description: "An apple mobile which is nothing like apple",
    brand: "Apple",
    category: "smartphones",
    price: 549,
    countInStock: 3,
    rating: 4.29,
    reviews: 4,
  },
  {
    _id: 4,
    name: "iPhone 9",
    images: "pexels-photo-1786433.jpeg",
    description: "An apple mobile which is nothing like apple",
    brand: "Apple",
    category: "smartphones",
    price: 549,
    countInStock: 3,
    rating: 2.69,
    reviews: 1,
  },
  {
    _id: 5,
    name: "iPhone 9",
    images: "pexels-photo-788946.webp",
    description: "An apple mobile which is nothing like apple",
    brand: "Apple",
    category: "smartphones",
    price: 549,
    countInStock: 3,
    rating: 1.49,
    reviews: 4,
  },
]
