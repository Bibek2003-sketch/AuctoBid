import { io } from "socket.io-client"

const socket = io("http://localhost:3000")

socket.on('connect', () => {
    socket.emit("hello", {
        name: "Bibek",
        message: "Hello from Bibek",
    })

    
})

socket.on("welcome", (data) => {
    console.log("🔥 Welcome event received");
    console.log(data);
});



export default socket