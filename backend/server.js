import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/database.js"
import cors from "cors"

import productRoutes from "./routes/products.routes.js"

dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000
app.use(cors())
app.use("/api/products", productRoutes)

app.listen(PORT, () => {
  connectDB()
  console.log("Server Running at =>" + PORT)
})
//dhanushvj111
//9Kszlgqp99T3i6wm
