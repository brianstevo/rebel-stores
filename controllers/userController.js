import asyncHandler from "express-async-handler"
import User from "../models/User.js"
import generateToken from "../utils/generateToken.js"

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password")
  if (users) {
    res.json(users)
  } else {
    res.status(404)
    throw new Error("users not found")
  }
})

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password")
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("user not found")
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    })
  } else if (user && !(await user.matchPassword(password))) {
    res.status(404)
    throw new Error("Invalid Password")
  } else {
    res.status(401)
    throw new Error("User needs to Signup")
  }
})
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const fetchUser = await User.findOne({ email })

  if (fetchUser) {
    res.status(400)
    throw new Error("User already exits")
  }
  const user = await User.create({
    name: name,
    email: email,
    password: password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
      message: "user signed up successfully",
    })
  } else {
    res.status(400)
    throw new Error("User signup failed")
  }
})

// router.patch('/update/:id', (req, res) => {
//     res.send('Update by ID API')
// })

// //Delete by ID Method
// router.delete('/delete/:id', (req, res) => {
//     res.send('Delete by ID API')
// })

export { loginUser, createUser, getUser, getUsers }
