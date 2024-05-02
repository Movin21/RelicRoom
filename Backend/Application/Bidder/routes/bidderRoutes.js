const express = require("express");
const bidder = require("../../../models/bidderModel"); //import the created user model
const router = express.Router(); //use to create http rreqequests
const bid = require("../../../models/bid");
const auctions = require("../../../models/auctions");

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


//filter

// Get all auctions placed by all auctioneers
// router.get('auctions/getAllAuctionsByAuctioneers', async (req, res) => {
//   try {
//     const allAuctions = await bid.find();
//     return res.status(200).json(allAuctions);
//   } catch (err) {
//     return res.status(400).json({
//       error: err.message
//     });
//   }
// });

//  // Get all ongoing auctions
// router.get('/getOngoingAuctions', async (req, res) => {
//   try {
//     const ongoingAuctions = await bid.find({ isExpired: false });
//     return res.status(200).json(ongoingAuctions);
//   } catch (err) {
//     return res.status(400).json({
//       error: err.message
//     });
//   }
// });

// // Get all expired auctions
// router.get('/getExpiredAuctions', async (req, res) => {
//   try {
//     const expiredAuctions = await bid.find({ isExpired: true });
//     return res.status(200).json(expiredAuctions);
//   } catch (err) {
//     return res.status(400).json({
//       error: err.message
//     });
//   }
// });

module.exports = router;
 