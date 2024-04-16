const express = require("express");
const auctioneer = require("../../../models/auctionnerModel");
const auction = require("../../../models/auctions");
const bid = require("../../../models/bid");
const bidder = require("../../../models/bidderModel");
const router = express.Router();

// Create auctioneer
router.post("/create", async (req, res) => {
  try {
    console.log(req.body);
    const newAuctioneer = new auctioneer(req.body);
    await newAuctioneer.save();
    return res.status(200).json({
      success: "Auctioneer Created Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// Get all auctioneers
router.get("/getAll", async (req, res) => {
  try {
    const allAuctioneers = await auctioneer.find();
    return res.status(200).json(allAuctioneers);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// Get an auctioneer
router.get("/getOne/:id", async (req, res) => {
  try {
    const Auctioneer = await auctioneer.findById(req.params.id);
    return res.status(200).json(Auctioneer);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});
 
// Update an auctioneer
router.patch("/update/:id", async (req, res) => {
  try {
    const Auctioneer = await auctioneer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(Auctioneer);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// Delete an auctioneer
router.delete("/delete/:id", async (req, res) => {
  try {
    const Auctioneer = await auctioneer.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Auctioneer Deleted" });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});



//auctions placed(search and filter)
 // Get all auctions by ID
router.get('/getAllAuctions/:id', async (req, res) => {
    try {
        const allAuctions = await auction.find({ auctioneerId: req.params.id });
        return res.status(200).json(allAuctions);
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Get ongoing auctions   
router.get('/getOngoingAuctions/:id', async (req, res) => {
    try {
        const ongoingAuctions = await auction.find({
            auctioneerId: req.params.id,
            isExpired: false
        });
        return res.status(200).json(ongoingAuctions);
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

 // Get expired auctions 
router.get('/getExpiredAuctions/:id', async (req, res) => {
    try {
        const expiredAuctions = await auction.find({ auctioneerId: req.params.id, isExpired: true });
        return res.status(200).json(expiredAuctions);
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const Auctioneer = await auctioneer.findOne({ email });
    if (!Auctioneer) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is active
    if (!Auctioneer.isActive) {
      return res.status(403).json({ message: "User is not active" });
    }

    // Compare passwords (not recommended for production)
    if (password !== Auctioneer.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If login is successful, send the user data to the frontend
    res.status(200).json(Auctioneer);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get('/generateReport/:id', async (req, res) => {
    try {
        const expiredAuctions = await auction.find({ auctioneerId: req.params.id, isExpired: true });

        const auctionsWithBids = await Promise.all(expiredAuctions.map(async auction => {
            const winningBid = await bid.findOne({ auctionId: auction._id }).sort({ bidPrice: -1 }).populate('bidderId', 'firstname lastname');
            const winningBidPrice = winningBid ? winningBid.bidPrice : null;
            const winningBidderName = winningBid ? `${winningBid.bidderId.firstname} ${winningBid.bidderId.lastname}` : null;

            return {
                _id: auction._id,
                auctionTitle: auction.auctionTitle,
                auctionCategory: auction.auctionCategory,
                auctionDescription: auction.auctionDescription,
                auctionImages: auction.auctionImages,
                auctionStartingPrice: auction.auctionStartingPrice,
                auctionDuration: auction.auctionDuration,
                currentBid: auction.currentBid,
                isExpired: auction.isExpired,
                viewCount: auction.viewCount,
                createdAt: auction.createdAt,
                winningBidPrice: winningBidPrice,
                winningBidderName: winningBidderName
            };
        }));

        return res.status(200).json(auctionsWithBids);
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


module.exports = router;