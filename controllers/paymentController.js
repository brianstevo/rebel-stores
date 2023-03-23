import asyncHandler from 'express-async-handler'
import { razorpay } from '../server.js'

export const checkout = asyncHandler(async (req, res) => {
  const options = {
    amount: 80000, // amount in the smallest currency unit
    currency: 'INR',
  }
  const response = await razorpay.orders.create(options)
  console.log(response)
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
  console.log(req)
  res.json()
})

export const getkey = asyncHandler(async (req, res) => {
  res.json({ key: process.env.KEY_ID })
})
