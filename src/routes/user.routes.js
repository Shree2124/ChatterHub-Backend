import express from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { register } from "../controllers/user.controllers.js"

const router = express.Router()

router.route("/register").post(upload.fields([
    {
        name: "avatarImage",
        maxCount: 1,
    }
]), register)


// Secured Routes: -
router.route("/login").post()

export default router