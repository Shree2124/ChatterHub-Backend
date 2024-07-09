import { asyncHandler } from "../utilities/asyncHandler.js"
import { sendToken } from "../utilities/features.js"

const register = asyncHandler(async (req, res)=>{
    const {name, username, password, bio} = req.body


    sendToken(res,user,201,"User created successfully")

})

const login = asyncHandler(async (req, res)=>{
    
})

export {
    register
}