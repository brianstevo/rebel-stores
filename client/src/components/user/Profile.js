import React, { useEffect, useState } from "react"
import { Col, Row, Button, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../utility/Loader"
import Message from "../../utility/Message"
import { updateProfile, userDetails, USER_UPDATE_RESET } from "../../actions/userActions"
import Form from "react-bootstrap/Form"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  let navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userDetail = useSelector((state) => state.userDetails)
  const { loading, user, error } = userDetail
  const updateUserProfile = useSelector((state) => state.updateUser)
  const { success } = updateUserProfile

  useEffect(() => {
    dispatch({
      type: USER_UPDATE_RESET,
    })
    if (!userInfo) {
      navigate("/login")
    } else {
      if (!user?.name) {
        dispatch(userDetails())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, navigate, user, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProfile(name, email, password))
  }
  return (
    <Row className="justify-content-md-center">
      <Col md={4}>
        <Card className="rounded p-3 my-2">
          <h1>User Profile</h1>
          {error && <Message variant="danger" message={error} />}
          {success && <Message variant="success" message="Updated user" />}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Update
            </Button>
          </Form>
        </Card>
      </Col>
      <Col md={8}>
        <h1>Order Details</h1>
      </Col>
    </Row>
  )
}

export default Profile
