import express from "express"
import { verifyToken } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.use(verifyToken)
router.route("/new").post()

export default router