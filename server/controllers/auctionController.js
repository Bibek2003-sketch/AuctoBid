// import Auction model
const Auctions = require("../models/Auctions");
const Auction = require("../models/Auctions");

// create Auction
// POST /api/auctions

const createAuction = async (req, res) => {
  
  try {
    // get data from request body
    const {
      title,
      description,
      category,
      startingBid,
      currentBid,
      minimumIncrement,
      highestBidder,
      endTime,
    } = req.body;

    // validate required field
    if (!title || !description || !category || !startingBid || !endTime) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    // create auction
    const auction = await Auctions.create({
      title,
      description,
      category,
      image: req.file.path, // ✅ THIS IS THE FIX
      startingBid,
      currentBid: startingBid,
      minimumIncrement,
      seller: req.user.id,
      highestBidder,
      endTime,
    });

    res.status(201).json({
      success: true,
      message: "Auction created successfully",
      auction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET all auctions
// GET /api/auctions

const getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find()
      .populate("seller", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: auctions.length,
      auctions,
    });
    // console.log(auctions);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================================
// Get Single Auction
//
// GET /api/auctions/:id
// =======================================================

const getAuctionById = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id).populate(
      "seller",
      "name email",
    );

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found",
      });
    }

    res.status(200).json({
      success: true,
      auction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Auction
//PUT /api/auctions/:id

const updateAuction = async (req, res) => {
  try {
    // Find auction
    const auction = await Auctions.findById(req.params.id);

    // check if auction exists
    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found",
      });
    }

    // check seller ownership
    if (auction.seller.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own auction",
      });
    }

    // update auction
    const updatedAuction = await Auction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Auction updated successfully",
      auction: updatedAuction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete Auction
// DELETE /api/auctions/:id

const deleteAuction = async (req, res) => {
  try {
    // Find Auction
    const auction = await Auctions.findById(req.params.id);

    //ccheck if auction exists
    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found",
      });
    }

    // check ownwership
    if (auction.seller.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own auction",
      });
    }

    // delete auction
    await auction.deleteOne();

    res.status(200).json({
      success: true,
      message: "Auction deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET all auctions created by the logged-in user
const getMyAuctions = async (req, res) => {
  try {
    const auctions = await Auctions.find({
      seller: req.user.id,
    })
      .populate("seller", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: auctions.length,
      auctions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    // find all auctions created by the logged-in seller
    const auctions = await Auction.find({
      seller: req.user.id,
    });

    // total auctions
    const totalAuctions = auctions.length;

    // Active Auctions
    const activeAuctions = auctions.filter(
      (auction) => auction.status === "active",
    ).length;

    // revenue
    const revenue = auctions.reduce(
      (total, auction) => total + auction.currentBid,
      0,
    );

    // total Bids
    res.status(200).json({
      success: true,
      stats: {
        totalAuctions,
        activeAuctions,
        totalBids: 0,
        revenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const placeBid = async (req, res) => {
  console.log("placeBid controller reached");
  try {
    // Auction ID
    const { id } = req.params;
    console.log(id);
    // bid amount
    const { amount } = req.body;

    console.log("========== PLACE BID ==========");
    console.log("req.body:", req.body);
    console.log("amount:", amount);
    console.log("typeof amount:", typeof amount);
    console.log("req.user:", req.user);

    // check if the entered amount is a valid number
    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid bid amount.",
      });
    }

    // loggedin user
    const bidderId = req.user.id;

    // find Auction
    const auction = await Auction.findById(id);
    console.log("Current Bid:", auction.currentBid);
    console.log("Minimum Increment:", auction.minimumIncrement);
    console.log("Amount Entered:", amount);

    // if auction not found
    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found",
      });
    }

    // check the auction status
    if (auction.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Auction has already ended.",
      });
    }

    // has the auction passed the end time
    if (new Date() > auction.endTime) {
      return res.status(400).json({
        success: false,
        message: "Auction has already ended.",
      });
    }

    // seller cannot bid in auction
    if (auction.seller.toString() === bidderId) {
      return res.status(400).json({
        success: false,
        message: "You cannot bid on your own auction.",
      });
    }
    // bid amount must be greater than or equal to the minimum bid amount
    const minimumBid = auction.currentBid + auction.minimumIncrement;

    if (amount < minimumBid) {
      return res.status(400).json({
        success: false,
        message: `Minimum bid is ₹${minimumBid}`,
      });
    }

    auction.currentBid = amount;

    auction.highestBidder = bidderId;

    // push the bidHistory into the array of the schema
    auction.bidHistory.push({
      bidder: bidderId,
      amount: amount,
    });

    await auction.save();

    res.status(200).json({
      success: true,
      message: "Bid placed successfully.",
      auction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// logged in user bid details
const getMyBids = async (req, res) => {
  try {
    const userId = req.user.id;

    // find all auctions where this user has placed atleast one bid
    const auctions = await Auction.find({
      "bidHistory.bidder": userId,
    })
      .populate("seller", "name email")
      .populate("highestBidder", "name email");

    res.status(200).json({
      success: true,
      auctions,
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};

module.exports = {
  createAuction,
  getAllAuctions,
  getAuctionById,
  updateAuction,
  deleteAuction,
  getMyAuctions,
  getDashboardStats,
  placeBid,
  getMyBids,
};
