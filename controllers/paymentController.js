import asyncHandler from 'express-async-handler'
import { razorpay } from '../server.js'
import crypto from 'crypto'

export const checkout = asyncHandler(async (req, res) => {
  let { totalPrice } = req.body
  const amount = Math.floor(+totalPrice * 100) // amount in the smallest currency unit so 100 paise
  const options = {
    amount: amount,
    currency: 'INR',
  }
  const response = await razorpay.orders.create(options)
  if (response) {
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    })
  } else {
    res.status(404)
    throw new Error('payment failed')
  }
})

export const paymentVerification = asyncHandler(async (req, res) => {
  let { payment_id, order_id, signature } = req.body
  const body = order_id + '|' + payment_id

  const expectedSignature = crypto.createHmac('sha256', process.env.KEY_SECRET).update(body.toString()).digest('hex')
  if (expectedSignature === signature) {
    res.json({
      message: 'payment is successful and verified',
    })
  } else {
    res.status(404)
    throw new Error('payment verification failed')
  }
})
