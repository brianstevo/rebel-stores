import express from 'express'
import { checkout, getkey, paymentVerification } from '../controllers/paymentController.js'

const router = express.Router()

router.route('/getkey').get(getkey)

router.route('/checkout').post(checkout)
router.route('/paymentverification').post(paymentVerification)
export default router
