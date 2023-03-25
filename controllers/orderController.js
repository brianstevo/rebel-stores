import asyncHandler from 'express-async-handler'
import Order from '../models/Order.js'
import crypto from 'crypto'

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No Items In Cart To Order')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    const fetchOrderWithUserInfo = await createdOrder.populate('user', 'name email')
    res.status(201).json(fetchOrderWithUserInfo)
  }
})

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const updateOrderToPaid = asyncHandler(async (req, res) => {
  let { payment_id, order_id, signature } = req.body
  const body = order_id + '|' + payment_id
  let status
  const expectedSignature = crypto.createHmac('sha256', process.env.KEY_SECRET).update(body.toString()).digest('hex')
  if (expectedSignature === signature) {
    status = 'payment success'
  } else {
    res.status(400)
    throw new Error('payment verification failed')
  }
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      razorpay_order_id: order_id,
      status: req.body.status,
      razorpay_payment_id: payment_id,
      razorpay_signature: signature,
    }

    const updatedOrder = await order.save()
    const fetchOrderWithUserInfo = await updatedOrder.populate('user', 'name email')
    res.json(fetchOrderWithUserInfo)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    const fetchOrderWithUserInfo = await updatedOrder.populate('user', 'name email')
    res.json(fetchOrderWithUserInfo)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

export { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders }
