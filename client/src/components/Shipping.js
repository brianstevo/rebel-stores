import React, { useEffect, useState } from "react"
import { Col, Container, Form, Row, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveShippingAddress } from "../actions/cartAction"
import CartStepper from "../utility/CartStepper"

const Shipping = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  useEffect(() => {
    if (userInfo === null) {
      navigate("/login")
    }
  }, [userInfo]) // eslint-disable-line react-hooks/exhaustive-deps

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate("/payment")
  }

  return (
    <>
      <CartStepper step1 />
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={5}>
            <Card className="rounded p-3 my-2">
              <h1>Shipping</h1>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="address" className="mt-2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter address" value={address} required onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="city" className="mt-2">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="Enter city" value={city} required onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="postalCode" className="mt-2">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control type="text" placeholder="Enter postal code" value={postalCode} required onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="country" className="mt-2">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" placeholder="Enter country" value={country} required onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>

                <button type="submit" className="btn btn-primary btn-sm mt-3">
                  Continue
                </button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Shipping
