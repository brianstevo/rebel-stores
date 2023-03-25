import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders } from '../controllers/orderController.js'
import { authenticate, admin } from '../middleware/authMiddleware.js'

router.route('/').post(authenticate, addOrderItems).get(authenticate, admin, getOrders)
router.route('/myorders').get(authenticate, getMyOrders)
router.route('/:id').get(getOrderById)
router.route('/:id/pay').put(authenticate, updateOrderToPaid)
router.route('/:id/deliver').put(authenticate, admin, updateOrderToDelivered)

export default router
