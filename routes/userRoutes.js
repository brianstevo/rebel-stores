import express from "express"
import { loginUser, createUser, getUser, getUsers, updateUserProfile, deleteUser } from "../controllers/userController.js"
const router = express.Router()
import { authenticate, admin } from "../middleware/authMiddleware.js"
// GET /api/users fetch all users
router.route("/").get(authenticate, admin, getUsers)
// GET /api/users/profile fetch User Profile
router.route("/profile").get(authenticate, getUser).put(authenticate, updateUserProfile)

// POST /api/users/signup create user
router.route("/signup").post(createUser)
// POST /api/users/login signin user
router.route("/login").post(loginUser)
router.route("/delete/:id").delete(authenticate, admin, deleteUser)
export default router
