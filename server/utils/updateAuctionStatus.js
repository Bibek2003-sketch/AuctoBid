// auction model
const auction = require("../models/Auctions")

// update expired auctions. finds every auctions that are still marked as active and also has crossed its end time. then change its status to "ended"
const updateExpiredAuctions = async (req, res) => {
    try {
        // update every expired auctions
        await auction.updateMany(
            {
                status: "active",
                endTime: {
                    $lte: new Date()   // end time has passed
                },
            },

            {
                $set: {
                    status: "ended",
                },
            },
        );
    } catch (error) {
        console.error("Error updating auction status:", error.message)
    }
}

module.exports = updateExpiredAuctions