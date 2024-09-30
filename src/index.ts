import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import myUserRoute from "./routes/MyUserRoute"
import { v2 as cloudinary } from "cloudinary"
import myStoreRoute from "./routes/MyStoreRoute"
import storeRoute from "./routes/StoreRoute"
import orderRoute from "./routes/OrderRoute"

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log("Connected to database!"))

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()

app.use(cors())

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }))

app.use(express.json())

app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "Health OK!" })
})

// /api/my/user
app.use("/api/my/user", myUserRoute)
app.use("/api/my/store", myStoreRoute)
app.use("/api/store", storeRoute)
app.use("/api/order", orderRoute)

app.listen(7000, () => {
    console.log("Server started on localhost:7000")
})
