import { Request, Response } from "express"
import Store from "../models/store"
import cloudinary from "cloudinary"
import mongoose from "mongoose"
import Order from "../models/order"

const getMyStore = async (req: Request, res: Response) => {
    try {
        const store = await Store.findOne({ user: req.userId })

        if (!store) {
            return res.status(404).json({ message: "Store not found" })
        }

        res.json(store)
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: "Error fetching store" })
    }
}

const createMyStore = async (req: Request, res: Response) => {
    try {
        const existingStore = await Store.findOne({ user: req.userId })

        if (existingStore) {
            return res
                .status(409)
                .json({ message: "User store already exists" })
        }

        const imageUrl = await uploadImage(req.file as Express.Multer.File)

        const store = new Store(req.body)
        store.imageUrl = imageUrl
        store.user = new mongoose.Types.ObjectId(req.userId)
        store.lastUpdated = new Date()
        await store.save()

        res.status(201).send(store)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

const updateMyStore = async (req: Request, res: Response) => {
    try {
        const store = await Store.findOne({
            user: req.userId,
        })

        if (!store) {
            return res.status(404).json({ message: "Store not found" })
        }

        store.storeName = req.body.storeName
        store.city = req.body.city
        store.country = req.body.country
        store.deliveryPrice = req.body.deliveryPrice
        store.estimatedDeliveryTime = req.body.estimatedDeliveryTime
        store.cuisines = req.body.cuisines
        store.menuItems = req.body.menuItems
        store.lastUpdated = new Date()

        if (req.file) {
            const imageUrl = await uploadImage(req.file as Express.Multer.File)
            store.imageUrl = imageUrl
        }

        await store.save()
        res.status(200).send(store)
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

const getMyStoreOrders = async (req: Request, res: Response) => {
    try {
        const store = await Store.findOne({ user: req.userId })
        if (!store) {
            return res.status(404).json({ message: "Store not found" })
        }

        const orders = await Order.find({ store: store._id })
            .populate("store")
            .populate("user")

        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params
        const { status } = req.body

        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }

        const store = await Store.findById(order.store)

        if (store?.user?._id.toString() !== req.userId) {
            return res.status(401).send()
        }

        order.status = status
        await order.save()

        res.status(200).json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Unable to update status" })
    }
}

const uploadImage = async (file: Express.Multer.File) => {
    const image = file
    const base64Image = Buffer.from(image.buffer).toString("base64")
    const dataURI = `data:${image.mimetype};base64,${base64Image}`

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI)
    return uploadResponse.url
}

export default {
    getMyStoreOrders,
    getMyStore,
    createMyStore,
    updateMyStore,
    updateOrderStatus,
}
