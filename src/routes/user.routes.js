import express from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { login, register, logout, getMyProfile } from "../controllers/user.controllers.js"
import { verifyToken } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.route("/register").post(upload.fields([
    {
        name: "avatarImage",
        maxCount: 1,
    }
]), register)

router.route("/login").post(login)
// Secured Routes: -
router.route("/logout").post(verifyToken,logout)
router.route("/me").get(verifyToken, getMyProfile)

export default router