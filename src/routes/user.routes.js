import express from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { login, register } from "../controllers/user.controllers.js"
import { verifyToken } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.route("/register").post(upload.fields([
    {
        name: "avatarImage",
        maxCount: 1,
    }
]), register)


// Secured Routes: -
router.route("/login").post(login)

export default router