import { Request, Response } from "express"
import Store from "../models/store"
import cloudinary from "cloudinary"
import mongoose from "mongoose"

const createMyStore = async (req: Request, res: Response) => {
    try {
        const existingStore = await Store.findOne({ user: req.userId })

        if (existingStore) {
            return res
                .status(409)
                .json({ message: "User store already exists" })
        }

        const image = req.file as Express.Multer.File
        const base64Image = Buffer.from(image.buffer).toString("base64")
        const dataURI = `data:${image.mimetype}:base64,${base64Image}`

        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI)

        const store = new Store(req.body)
        store.imageUrl = uploadResponse.url
        store.user = new mongoose.Types.ObjectId(req.userId)
        store.lastUpdated = new Date()
        await store.save()

        res.status(201).send(store)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export default {
    createMyStore,
}
