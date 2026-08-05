module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinAuction", ({ auctionId }) => {
      socket.join(auctionId);

      console.log(`${socket.id} joined auction ${auctionId}`);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });

    socket.on("leaveAuction", ({ auctionId }) => {
      socket.leave(auctionId);

      console.log(`${socket.id} left auction ${auctionId}`);
    });
  });
};
