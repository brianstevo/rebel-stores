import jwt from "jsonwebtoken"

const generateToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "3600s" })
}

export default generateToken
