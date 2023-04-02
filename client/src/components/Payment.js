import React, { useEffect, useState } from 'react'
// import { Form, Col, Container, Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartAction'
import { RESET } from '../actions/changeActions'
import { ORDER_CREATE_RESET } from '../actions/orderAction'
import Stepper from '../utility/Stepper'

const Payment = () => {
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

  if (!shippingAddress.address) {
    navigate('/shipping')
  }
  useEffect(() => {
    if (userInfo === null) {
      navigate('/login')
    }
    reset({
      payment: 'RazorPay',
    })
  }, [userInfo]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (data, e) => {
    e.preventDefault()
    console.log(data)
    dispatch(savePaymentMethod(data.payment))
    dispatch({ type: RESET })
    dispatch({ type: ORDER_CREATE_RESET })
    navigate('/placeorder')
  }

  return (
    <>
      <section className='section'>
        <Stepper step1='C' step2='A' />
        <div className='flex-container'>
          <div className='flex-row pdT20 justify-content-center'>
            <div className='flex-col-sm-6 flex-col-lg-4 pd30 card-border'>
              <h3 className='text-align-center pdB20'>Payment Method</h3>
              <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <div className='radioGroup'>
                  <div className='flex align-items-center'>
                    <input className='mgY5 radio' type='radio' name='payment' value='RazorPay' {...register('payment', { required: 'Address is required' })} aria-invalid={errors.payment ? 'true' : 'false'} />
                    <label className='label pdL10'>RazorPay</label>
                  </div>
                  {/* <div className='flex align-items-center'>
                    <input className='mgY5 radio' type='radio' name='payment' value='PayPal' {...register('payment', { required: 'Address is required' })} aria-invalid={errors.payment ? 'true' : 'false'} />
                    <label className='label pdL10'>Paypal</label>
                  </div> */}
                  {errors.payment && <p className='red'>{errors.payment?.message}</p>}
                </div>
                <button className='mgT20 btn-blue btn-block btn' type='submit'>
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Payment
