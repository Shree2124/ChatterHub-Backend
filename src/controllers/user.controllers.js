import { ApiError } from "../utilities/apiError.js"
import { asyncHandler } from "../utilities/asyncHandler.js"
import { sendToken } from "../utilities/features.js"
import { uploadOnCloudinary } from "../utilities/Cloudinary.js"
import { User } from "../models/user.models.js"

const register = asyncHandler(async (req, res) => {
    console.log(req);
    const { email, name, username, password, bio } = req.body

    // console.log("testing credentials ");

    // console.log(req.files?.avatarImage);

    if ([email, name, username, password, bio].some((i) => i?.trim() === "")) {
        return new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    // console.log(existedUser);

    if (existedUser) throw new ApiError(409, "User with email or username is already exist")

    let avatarLocalFilePath;

    if (req?.files && Array.isArray(req?.files?.avatarImage) && req?.files?.avatarImage?.length > 0) {
        console.log(req?.files?.avatarImage);
        avatarLocalFilePath = req.files?.avatarImage[0]?.path
    }
    // console.log(avatarLocalFilePath);

    if (!avatarLocalFilePath) throw new ApiError(400, "Avatar file is required");

    // console.log("Validation complete");
    // console.log("file uploading on cloud");
    const avatar = await uploadOnCloudinary(avatarLocalFilePath)
    // console.log("avatar: - ", avatar);

    if (!avatar) {
        throw new ApiError(500, "Failed to store avatar file (Server Error)")
    }

    const avatarObj = {
        public_id: avatar.public_id,
        url: avatar.url,
    };



    const user = await User.create({
        email,
        username,
        name,
        bio,
        password,
        avatar: avatarObj
    })

    if (!user) throw new ApiError(500, "Something went wrong while registering the user")

    sendToken(res, user, 201, "User created successfully")

})

const login = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body
    // console.log(req.body);

    if (!username || !password) {
        return new ApiError(400, "Username and Password is required.")
    }

    // console.log(username, password);

    const user = await User.findOne({
        $or: [{ username }, { email }],
    }).select("+password");

    console.log(user);

    if (!user) {
        return new ApiError(404, "User does not exist.")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        return new ApiError(401, "Invalid credentials.")
    }

    sendToken(res, user, 200, `Welcome back, ${user.name}!`)

})

export {
    register,
    login
}