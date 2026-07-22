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
      image,
      startingBid,
      currentBid,
      minimumIncrement,
      seller,
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

    

    // create auction
    const auction = await Auctions.create({
      title,
      description,
      category,
      image,
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
    console.log(auctions);
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

    const auction = await Auction.findById(req.params.id)
      .populate("seller", "name email");

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
  try{
    // Find Auction
    const auction = await Auctions.findById(req.params.id)

    //ccheck if auction exists
    if(!auction){
      return res.status(404).json({
        success: false,
        message: "Auction not found"
      })
    }

    // check ownwership
    if(auction.seller.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own auction",
      })
    }

    // delete auction
    await auction.deleteOne()

    res.status(200).json({
      success: true,
      message: "Auction deleted successfully",
    })
  }catch(error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// GET all auctions created by the logged-in user
const getMyAuctions = async (req, res) => {
  try{
    const auctions = await Auctions.find({
      seller: req.user.id,
    }).populate("seller", "name email role").sort({ createdAt: -1})

    res.status(200).json({
      success: true,
      count: auctions.length,
      auctions,
    })
  } catch(error){
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = { createAuction, getAllAuctions, 
  getAuctionById, updateAuction, deleteAuction, getMyAuctions };
