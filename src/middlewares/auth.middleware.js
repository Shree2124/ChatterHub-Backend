import jwt from "jsonwebtoken"
import { asyncHandler } from "../utilities/asyncHandler.js"
import { ApiError } from "../utilities/apiError.js"
import { User } from "../models/user.models.js"

export const verifyToken = asyncHandler(async (req, res) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorize request");
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decodedToken);
        const user = await User.findById(decodedToken?._id).select("-password")

        if (!user) {
            throw new ApiError(401, "Invalid token")

        }
        req.user = user;
        next();
    } catch (error) {

    }
})