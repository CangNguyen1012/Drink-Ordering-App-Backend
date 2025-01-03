import express from "express"
import multer from "multer"
import MyStoreController from "../controllers/MyStoreController"
import { jwtCheck, jwtParse } from "../middleware/auth"
import { validateMyStoreRequest } from "../middleware/validation"

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
})

// /api/my/store
router.get("/order", jwtCheck, jwtParse, MyStoreController.getMyStoreOrders)

router.patch(
    "/order/:orderId/status",
    jwtCheck,
    jwtParse,
    MyStoreController.updateOrderStatus,
)

router.get("/", jwtCheck, jwtParse, MyStoreController.getMyStore)

router.post(
    "/",
    upload.single("imageFile"),
    validateMyStoreRequest,
    jwtCheck,
    jwtParse,
    MyStoreController.createMyStore,
)

router.put(
    "/",
    upload.single("imageFile"),
    validateMyStoreRequest,
    jwtCheck,
    jwtParse,
    MyStoreController.updateMyStore,
)

export default router
