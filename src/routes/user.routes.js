import express from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { register } from "../controllers/user.controllers.js"

const Router = express.Router()

Router.route("/register").post(upload.single("avatar"),register)

export default Router