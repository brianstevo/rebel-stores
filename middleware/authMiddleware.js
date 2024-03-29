import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/User.js"
const authenticate = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = await User.findById(decodedToken._id).select("-password")
      next()
    } catch (error) {
      res.status(401)
      throw new Error("Authorization failed")
    }
  } else {
    res.status(401)
    throw new Error("No token found")
  }
})

const admin = asyncHandler((req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error("Access Denied")
  }
})

export { authenticate, admin }
