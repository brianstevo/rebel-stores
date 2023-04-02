import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartAction'
import Stepper from '../utility/Stepper'

const Shipping = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  useEffect(() => {
    if (userInfo === null) {
      navigate('/login')
    }
    reset({
      address: shippingAddress.address,
      city: shippingAddress.city,
      code: shippingAddress.postalCode,
      country: shippingAddress.country,
    })
  }, [userInfo]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (data, e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address: data.address, city: data.city, postalCode: data.code, country: data.country }))
    navigate('/payment')
  }
  return (
    <>
      <section className='section'>
        <Stepper step1='A' />
        <div className='flex-container'>
          <div className='flex-row pdT20 justify-content-center'>
            <div className=' flex-col-sm-6 flex-col-lg-4 pd30 card-border'>
              <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <label className='label'>Address</label>
                <input className='mgY10 text' {...register('address', { required: 'Address is required' })} aria-invalid={errors.address ? 'true' : 'false'} />
                {errors.address && <p className='red'>{errors.address?.message}</p>}
                <label className='label'>City</label>
                <input className='mgY10 text' {...register('city', { required: 'City is required' })} aria-invalid={errors.city ? 'true' : 'false'} />
                {errors.city && <p className='red'>{errors.city?.message}</p>}
                <label className='label'>Postal Code</label>
                <input className='mgY10 text' {...register('code', { required: 'Postal Code is required' })} aria-invalid={errors.code ? 'true' : 'false'} />
                {errors.code && <p className='red'>{errors.code?.message}</p>}
                <label className='label'>Country</label>
                <input className='mgY10 text' {...register('country', { required: 'Country is required' })} aria-invalid={errors.country ? 'true' : 'false'} />
                {errors.country && <p className='red'>{errors.country?.message}</p>}
                <button className='mgT20 btn-blue btn-block btn' type='submit'>
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* <CartStepper step1 />
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={5}>
            <Card className='rounded p-3 my-2'>
              <h1>Shipping</h1>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='address' className='mt-2'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control type='text' placeholder='Enter address' value={address} required onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='city' className='mt-2'>
                  <Form.Label>City</Form.Label>
                  <Form.Control type='text' placeholder='Enter city' value={city} required onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode' className='mt-2'>
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control type='text' placeholder='Enter postal code' value={postalCode} required onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='country' className='mt-2'>
                  <Form.Label>Country</Form.Label>
                  <Form.Control type='text' placeholder='Enter country' value={country} required onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>

                <button type='submit' className='btn btn-primary btn-sm mt-3'>
                  Continue
                </button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </>
  )
}

export default Shipping
