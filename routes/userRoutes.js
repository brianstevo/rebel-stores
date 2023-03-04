import express from "express"
import { loginUser, createUser, getUser, getUsers } from "../controllers/userController.js"
const router = express.Router()
import { authenticate, admin } from "../middleware/authMiddleware.js"
// GET /api/users fetch all users
router.route("/").get(authenticate, admin, getUsers)
// GET /api/users/profile fetch User Profile
router.route("/profile").get(authenticate, getUser)

// POST /api/users/signup create user
router.route("/signup").post(createUser)
// POST /api/users/login signin user
router.route("/login").post(loginUser)
export default router
