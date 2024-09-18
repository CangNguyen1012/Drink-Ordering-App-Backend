import express from "express"
import { param } from "express-validator"
import StoreController from "../controllers/StoreController"

const router = express.Router()

// /api/store/search/...
router.get(
    "/search/:city",
    param("city")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("City parameter must be a valid string"),
    StoreController.searchStores,
)

export default router
