const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const userRoutes = require('./routes/userRoutes')
const auctionRoutes = require('./routes/auctionRoutes')

// create express app
const app = express()

// middlewares
// allow requests from frontend
app.use(cors())

// parse incoming json
app.use(express.json())

// user routes
app.use('/api/users', userRoutes)
// auction routes
app.use('/api/auctions', auctionRoutes)

// test route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the AuctoBid API"
    })
})

module.exports = app