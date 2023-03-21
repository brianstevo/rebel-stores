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
    name: name,
    price: req.body.price,
    user: req.user._id,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    reviews: 0,
    description: req.body.description,
  })

  const createdProduct = await product.save()

  if (createdProduct) {
    res.status(201).json({
      createdProduct,
      message: "Product Created Successfully",
    })
  } else {
    res.status(400)
    throw new Error("Product creation failed")
  }
})

const updateProduct = asyncHandler(async (req, res) => {
  const fetchedProduct = await Product.findById(req.params.id)
  if (fetchedProduct) {
    fetchedProduct.name = req.body.name
    fetchedProduct.price = req.body.price
    fetchedProduct.user = req.user._id
    fetchedProduct.category = req.body.category
    fetchedProduct.brand = req.body.brand
    fetchedProduct.countInStock = req.body.countInStock
    fetchedProduct.description = req.body.description
    if (req.body.image) {
      fetchedProduct.image = req.body.image
    }
    const updatedProduct = await fetchedProduct.save()
    res.json({
      updatedProduct,
      message: "Product updated",
    })
  } else {
    res.status(404)
    throw new Error("Product does not exit")
  }
})

const deleteProduct = asyncHandler(async (req, res) => {
  const fetchProduct = await Product.findById(req.params.id)
  if (fetchProduct) {
    await fetchProduct.remove()
    res.json({
      message: "Product deleted successfully",
    })
  } else {
    res.status(404)
    throw new Error("Product does not exit")
  }
})

export { getProducts, getProduct, createProduct, deleteProduct, updateProduct }
