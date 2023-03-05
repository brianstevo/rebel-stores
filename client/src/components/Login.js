import React, { useEffect, useState } from "react"
import { Col, Row, Button, Container, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../utility/Loader"
import Message from "../utility/Message"
import { login } from "../actions/userActions"
import { Link } from "react-router-dom"
import Form from "react-bootstrap/Form"
import { useNavigate } from "react-router-dom"
const Login = () => {
  let navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo, error } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate("/")
    } else {
      setEmail("")
      setPassword("")
    }
  }, [navigate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
    setEmail("")
    setPassword("")
  }
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={5}>
          <Card className="rounded p-3 my-5">
            <h1>Sigin In</h1>
            {error && <Message variant="danger" message={error} />}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Sign In
              </Button>
            </Form>
            <Row>
              <Col className="mt-2">
                New Customer?<Link to="signup"> Signup</Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
