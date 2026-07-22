// import mongoose
const mongoose = require('mongoose')

//user schema defines how a user document will look like inside mongoDB

const userSchema = new mongoose.Schema(
    {
        // user's full name
        name: {
            type: String,
            required: true,
            trim: true,
        },

        // email
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        // hashed password
        password: {
            type: String,
            required: true,
        },

        // user role
        role: {
            type: String,
            enum: ["buyer", "seller", "admin"],
            default: "buyer"
        },

        // wishlist
        wishlist: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Auction"
        },
    ],
},
    {
        timestamps: true,
    }
    
)

module.exports = mongoose.model("User", userSchema)