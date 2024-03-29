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

const updateUserProfile = asyncHandler(async (req, res) => {
  const fetchUser = await User.findById(req.user._id)
  console.log(fetchUser)
  if (fetchUser) {
    fetchUser.name = req.body.name || fetchUser.name
    fetchUser.email = req.body.email || fetchUser.email
    if (req.body.password) {
      fetchUser.password = req.body.password
    }

    console.log(fetchUser)
    const updatedUser = await fetchUser.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      message: "user update successful",
    })
  } else {
    res.status(404)
    throw new Error("User does not exit")
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  const fetchUser = await User.findById(req.params.id)
  if (fetchUser) {
    await fetchUser.remove()
    res.json({
      message: "user delete successful",
    })
  } else {
    res.status(404)
    throw new Error("User does not exit")
  }
})

export { loginUser, createUser, getUser, getUsers, updateUserProfile, deleteUser }
