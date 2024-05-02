const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
const bidder = require("../../../models/bidderModel"); //import the created user model
const router = express.Router(); //use to create http rreqequests
const Bids = require("../../../models/bid");
const Auction = require("../../../models/auctions");
const Auctioneer = require("../../../models/auctionnerModel");
const wishlist = require("../../../models/Wishlist")
//create bidder
router.post("/create", async (req, res) => {
  try {
    const newBidder = new bidder(req.body);
    await newBidder.save();
    return res.status(200).json({
      success: "Bidder is created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

//get all bidders
router.get("/getAll", async (req, res) => {
  try {
    const allBidders = await bidder.find();
    return res.status(200).json(allBidders);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//get an bidder
router.get("/getOne/:id", async (req, res) => {
  try {
    const Bidder = await bidder.findById(req.params.id);
    return res.status(200).json(Bidder);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//update a bidder
router.patch("/update/:id", async (req, res) => {
  try {
    const Bidder = await bidder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(Bidder);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//delete a bidder
router.delete("/delete/:id", async (req, res) => {
  try {
    const Bidder = await bidder.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Bidder is deleted." });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const Bidder = await bidder.findOne({ email });
    if (!Bidder) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is active
    if (!Bidder.isActive) {
      return res.status(403).json({ message: "User is not active" });
    }

    // Compare passwords (not recommended for production)
    if (password !== Bidder.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
   
    // If login is successful, send the user data to the frontend
    res.status(200).json(Bidder);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Mybids
router.get('/currentBidDetails/:bidderId', async (req, res) => {
  try {
    const { bidderId } = req.params;
    const { setSelectedCategory } = req.query;

    // Fetch all bids for the bidder
    const bids = await Bids.find({ bidderId });

    // If category is provided, filter bids by auction category
    if (setSelectedCategory) {
      // Fetch auctions that match the specified category
      const auctions = await Auction.find({ auctionCategory: setSelectedCategory });
      // Extract auction IDs from the filtered auctions
      const auctionIds = auctions.map(auction => auction._id);
      // Filter bids that belong to the filtered auctions
      bids = bids.filter(bid => auctionIds.includes(bid.auctionId));
    }

    // Manually populate each bid
    const populatedBids = await Promise.all(bids.map(async (bid) => {
      // Fetch the auction data
      const auction = bid.auctionId ? await Auction.findById(bid.auctionId) : null;
      // Fetch the auctioneer data
      const auctioneer = bid.auctioneerId ? await Auctioneer.findById(bid.auctioneerId) : null;

      // Construct a new object that includes the populated data
      return {
        ...bid.toObject(), // Convert Mongoose document to a plain object
        auction: auction ? {
          auctionTitle: auction.auctionTitle,
          auctionImages: auction.auctionImages,
          auctionCategory: auction.auctionCategory,
          isExpired: auction.isExpired
        } : null,
        auctioneer: auctioneer ? {
          companyName: auctioneer.companyname
        } : null
      };
    }));

    res.json(populatedBids);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});   

//wishlist 
router.post("/wishcreate", async (req, res) => {
  try {
    const newwish = new wishlist(req.body);
    await newwish.save();
    return res.status(200).json({
      success: "Bidder wishlist is created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});


//get current wishlist bidder
router.get("/getOneee/:bidderId", async (req, res) => {
  try {
    const bidderId = req.params.bidderId;
    const whish = await wishlist.find({bidderId});
    return res.status(200).json(whish);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});


module.exports = router;

