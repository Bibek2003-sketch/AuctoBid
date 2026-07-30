const connectDB = require("./config/db");
const http = require('http')
const {Server} = require('socket.io')

const app = require('./app')

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})
io.on("connection", (socket) => {
    console.log("User connected:", socket.id)

    socket.on("hello", (data) => {
        console.log("hello event received")
        console.log("Name:", data.name)
        console.log("Message:", data.message)
console.log("Sending welcome event")
         socket.emit("welcome", {
        message: "Welcome to AuctoBid!"
    })
    })

   

   
    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id)
    })

    
})

 


// define port
const PORT = process.env.PORT || 5000
// connect database
connectDB()


// start the server
server.listen(PORT, ()=> {
    console.log(`server listening on http://localhost:${PORT}`)
})