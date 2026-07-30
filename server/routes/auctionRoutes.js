const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMidddleware");
const upload = require('../middleware/uploadMiddleware')


const {
  createAuction,
  getAllAuctions,
  getAuctionById,
  updateAuction,
  deleteAuction,
  getMyAuctions,
  getDashboardStats,
  placeBid,
  getMyBids
} = require("../controllers/auctionController");

router.post("/", protect, upload.single("image"), createAuction);
// get all auctions route
router.get("/", getAllAuctions);

router.get('/my-auctions', protect, getMyAuctions)

router.get('/my-bids', protect, getMyBids)

router.get('/dashboard-stats', protect, getDashboardStats)

router.get("/:id", getAuctionById)

router.put('/:id', protect, updateAuction)

router.delete('/:id', protect, deleteAuction)

router.post("/:id/bid", protect, placeBid);


module.exports = router;
