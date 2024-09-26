import express from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { login, register, logout, getMyProfile, searchUser } from "../controllers/user.controllers.js"
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
router.use(verifyToken)
router.route("/logout").post(logout)
router.route("/me").get(getMyProfile)
router.route("/search").get(searchUser)

export default router