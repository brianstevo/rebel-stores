import express from "express"
import { getProducts, getProduct, createProduct } from "../controllers/productController.js"
import { authenticate, admin } from "../middleware/authMiddleware.js"
const router = express.Router()

// GET /api/products fetch all products
router.route("/").get(getProducts)

// GET /api/products/:id fetch product
router.route("/:id").get(getProduct)

// POST /api/products/create fetch product
router.route("/create").post(authenticate, admin, createProduct)

export default router
