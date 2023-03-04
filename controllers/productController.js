import asyncHandler from "express-async-handler"
import Product from "../models/Product.js"

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("product not found")
  }
})

const createProduct = asyncHandler(async (req, res) => {
  const { name } = req.body
  const product = new Product({
    name: "sample Name",
    price: 0,
    user: req.user._id,
    image: "/public/pexels-photo-1786433.jpeg",
    brand: "sample category",
    category: "sample category",
    countInStock: 3,
    reviews: 1,
    description: "sample description",
  })

  const createdProduct = await product.save()

  if (createdProduct) {
    res.status(201).json(createdProduct)
  } else {
    res.status(400)
    throw new Error("Product creation failed")
  }
})

export { getProducts, getProduct, createProduct }
