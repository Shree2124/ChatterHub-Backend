import jwt from "jsonwebtoken"
import { ApiResponse } from "./apiResponse.js"
import { User } from "../models/user.models.js";
import { ApiError } from "./apiError.js";

export const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 24 * 60 * 1000
}

const sendToken = async (res, user, code, message) => {
    try {
        // console.log("creating token");
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        if(token) {return res.status(code).cookie("token", token, cookieOptions).send(
            new ApiResponse(201, user, message)
        )}
        throw new ApiError(500,"Token creation error")
    } catch (error) {
        console.log("Token Creation error ", error);
        await User.findByIdAndDelete(user?._id)
    }
}

export {
    sendToken
}