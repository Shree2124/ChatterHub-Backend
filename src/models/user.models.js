import mongoose, { Schema, model } from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true,
        }
    },
}, {
    timestamps: true
})

export const User = mongoose.models.User || model("User", userSchema)

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next()

        this.password = bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        next(error)
    }
})