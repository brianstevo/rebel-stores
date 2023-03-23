import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Razorpay from 'razorpay'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import paymentRouter from './routes/paymentRoutes.js'
const app = express()
app.use(cors())
dotenv.config()
mongoose.set('strictQuery', true)
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
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('api is running')
})

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/payment', paymentRouter)
app.use(notFound)

app.use(errorHandler)

export const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
})

// app.post("/", (req, res) => {
//   const book = req.body
//   console.log(book)
//   res.send("Hello World, from express")
// })

app.listen(process.env.PORT || 8000, () => console.log(`app listening on port ${process.env.PORT}!`))
