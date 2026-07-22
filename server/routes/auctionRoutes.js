const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMidddleware");
const {
  createAuction,
  getAllAuctions,
  getAuctionById,
  updateAuction,
  deleteAuction,
  getMyAuctions
} = require("../controllers/auctionController");

// create auction route
router.post("/", protect, createAuction);
// get all auctions route
router.get("/", getAllAuctions);

router.get('/my-auctions', protect, getMyAuctions)


router.get("/:id", getAuctionById)

router.put('/:id', protect, updateAuction)

router.delete('/:id', protect, deleteAuction)


module.exports = router;
