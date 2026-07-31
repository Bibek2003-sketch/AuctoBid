module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("joinAuction", (data) => {
            console.log(data.auctionId);

            socket.join(data.auctionId);

            console.log(`${socket.id} joined auction ${data.auctionId}`);
        });

        socket.on("disconnect", () => {
            console.log("User Disconnected:", socket.id);
        });

        socket.on("leaveAuction", (data) => {
            socket.leave(data.auctionId)
            console.log(`User left auction ${data.auctionId}`)
        })
    });
};