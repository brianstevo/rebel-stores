import express from 'express'
import formidableMiddleware from 'express-formidable'
import { getProducts, getProduct, createProduct, deleteProduct, updateProduct, imageUploadToCloudinary } from '../controllers/productController.js'
import { authenticate, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

// GET /api/products fetch all products
router.route('/').get(getProducts)
// GET /api/products/:id fetch product
router.route('/:id').get(getProduct)
// POST create product
router.route('/create').post(formidableMiddleware(), authenticate, admin, imageUploadToCloudinary, createProduct)
//PUT edit product
router.route('/edit/:id').put(formidableMiddleware(), authenticate, admin, updateProduct)
//DELETE  /api/products/delete/:id delete product
router.route('/delete/:id').delete(authenticate, admin, deleteProduct)
export default router
