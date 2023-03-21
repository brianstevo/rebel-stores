import React, { useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import Product from "../utility/Product"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "./../actions/productActions"
import Loader from "../utility/Loader"
import Message from "../utility/Message"
const Home = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { products } = productList

  const loadingErrorSuccessObject = useSelector((state) => state.loadingErrorSuccess)
  const { loading, error } = loadingErrorSuccessObject

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" message={"error"} />
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default Home
