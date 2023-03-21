import React, { useEffect, useState } from "react"
import { Col, Row, Button, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../../utility/Loader"
import Message from "../../../utility/Message"
import Form from "react-bootstrap/Form"
import { useNavigate } from "react-router-dom"
import { createProduct, PRODUCT_CREATE_RESET } from "../../../actions/productActions"
import { ERROR } from "../../../actions/changeActions"
const CreateProduct = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [countInStock, SetCountInStock] = useState(0)
  const [description, setDescription] = useState("")
  let navigate = useNavigate()

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productCreate = useSelector((state) => state.productCreate)
  const { product } = productCreate

  const loadingErrorSuccessObject = useSelector((state) => state.loadingErrorSuccess)
  const { loading, success, message, error } = loadingErrorSuccessObject

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate("/login")
    }
    if (success) {
      navigate("..")
      dispatch({
        type: PRODUCT_CREATE_RESET,
      })
    }
  }, [dispatch, navigate, userInfo, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (name.length === 0 || image.length === 0 || category.length === 0 || brand.length === 0 || description.length === 0) {
      return dispatch({
        type: ERROR,
        payload: "Enter All Fields",
      })
    }
    dispatch(createProduct(name, price, image, category, brand, countInStock, description))
  }

  const handleImage = async (e) => {
    const base64 = await convertToBase64(e.target.files[0])
    setImage(base64)
  }

  return (
    <Container>
      <Row className=" my-3 mx-3">
        <Col xs={12} md={5}>
          <h4>Create Product</h4>
          {error && <Message variant="danger" message={error} />}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" accept=".png,.jpg,.jpeg ,.webp" placeholder="Enter Image" onChange={handleImage} />
            </Form.Group>
            {image && (
              <div className="createImage mt-3 me-3">
                <img src={image} alt="" style={{ width: "300px", height: "300px", objectFit: "contain" }} />
              </div>
            )}
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control type="text" placeholder="Enter Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Product in Stock</Form.Label>
              <Form.Control type="number" placeholder="Enter Quantity" value={countInStock} onChange={(e) => SetCountInStock(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Create Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateProduct

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}
