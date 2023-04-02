import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../utility/Loader'
import { login } from '../../actions/userActions'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ERROR } from '../../actions/changeActions'
const Login = () => {
  let navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const loadingErrorSuccessObject = useSelector((state) => state.loadingErrorSuccess)
  const { loading, error } = loadingErrorSuccessObject

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    } else {
      setEmail('')
      setPassword('')
    }
  }, [navigate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if (email.length === 0 || password.length === 0) {
      return dispatch({
        type: ERROR,
        payload: 'Enter login Details',
      })
    }
    dispatch(login(email, password))
  }
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm()
  // const onSubmit = (data) => console.log(data)
  return (
    // <Container>
    //   <Row className="justify-content-md-center">
    //     <Col xs={12} md={5}>
    //       <Card className="rounded p-3 my-5">
    //         <h1>Sigin In</h1>
    //         {error && <Message variant="danger" message={error} />}
    //         {loading && <Loader />}
    //         <Form onSubmit={submitHandler}>
    //           <Form.Group controlId="email">
    //             <Form.Label>Email Address</Form.Label>
    //             <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    //           </Form.Group>
    //           <Form.Group controlId="password">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //           </Form.Group>
    //           <Button variant="primary" type="submit" className="mt-3">
    //             Sign In
    //           </Button>
    //         </Form>
    //         <Row>
    //           <Col className="mt-2">
    //             New Customer?<Link to="/signup"> Signup</Link>
    //           </Col>
    //         </Row>
    //       </Card>
    //     </Col>
    //   </Row>
    // </Container>
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName', { required: true })} aria-invalid={errors.firstName ? 'true' : 'false'} />
        {errors.firstName?.type === 'required' && <p role='alert'>First name is required</p>}

        <input {...register('mail', { required: 'Email Address is required' })} aria-invalid={errors.mail ? 'true' : 'false'} />
        {errors.mail && <p role='alert'>{errors.mail?.message}</p>}

        <input type='submit' />
      </form> */}
      hi
    </>
  )
}

export default Login
