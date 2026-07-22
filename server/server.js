const connectDB = require("./config/db");

const app = require('./app')

// define port
const PORT = process.env.PORT || 5000
// connect database
connectDB()


// start the server
app.listen(PORT, ()=> {
    console.log(`server listening on http://localhost:${PORT}`)
})