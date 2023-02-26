import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import mongoose from "mongoose"
import productRouter from "./routes/productRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
const app = express()
app.use(cors())
dotenv.config()
mongoose.set("strictQuery", true)
//db connection
const mongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log(`connected to: ${conn.connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
mongoDB()

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.send("api is running")
})

app.use("/api/products", productRouter)

app.get(notFound)

app.get(errorHandler)

// app.post("/", (req, res) => {
//   const book = req.body
//   console.log(book)
//   res.send("Hello World, from express")
// })

app.listen(process.env.PORT || 8000, () => console.log(`Hello world app listening on port ${process.env.PORT}!`))
