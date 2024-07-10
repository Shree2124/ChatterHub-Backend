import express from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { register } from "../controllers/user.controllers.js"

const Router = express.Router()

Router.route("/register").post(upload.fields([
    {
        name: "avatarImage",
        maxCount: 1,
    }]), register)

export default Router