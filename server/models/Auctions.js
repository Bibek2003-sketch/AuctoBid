// import mongoose
const mongoose = require('mongoose')

// Auction schema

const auctionSchema = new mongoose.Schema(
    {
        // product title
        title: {
            type: String,
            required: true,
            trim: true,
        },

        // product description
        description: {
            type: String,
            required: true,
        },

        // product category
        category: {
            type: String,
            required: true,
        },

        // product image
        image: {
            type: String,
            required: true,
        },

        // starting Bid
        startingBid: {
            type: Number,
            required: true,
        },

        // current highest Bid
        currentBid: {
            type: Number,
            required: true,
        },

        // minimum increment
        minimumIncrement: {
            type: Number,
            default: 500,
        },

        // seller
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // highest bidder
        highestBidder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        // Bid History
        bidHistory: [
            {
                bidder: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                amount: {
                    type: Number,
                    required: true
                },
                bidTime: {
                    type: Date,
                    default: Date.now(),
                }
            },
        ],

        // Auction ending time
        endTime: {
            type: Date,
            required: true,
        },

        // Auction status
        status: {
            type: String,
            enum: ["active", "ended"],
            default: "active",
        },
    },
    { 
        timestamps: true, 
    }
)

module.exports = mongoose.model("Auctions",auctionSchema)