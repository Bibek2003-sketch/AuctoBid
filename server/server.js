const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const socketHandler = require("./sockets/socketHandler");

const app = require("./app");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

socketHandler(io);

app.set("io", io);

// define port
const PORT = process.env.PORT || 5000;

// connect database
connectDB();

// start the server
server.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});