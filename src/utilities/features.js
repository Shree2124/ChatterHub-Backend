import jwt from "jsonwebtoken"
import { ApiResponse } from "./apiResponse.js"

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 24 * 60 * 1000
}

const sendToken = async(res,user, code, message)=>{
    try {
        const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        return res.code(code).cookie("token",token,cookieOptions).send(
            ApiResponse(201, user, message)
        )
    } catch (error) {
        
    }
}

export {
    sendToken
}