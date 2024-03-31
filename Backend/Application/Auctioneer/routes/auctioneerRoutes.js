const express = require("express");
const auctioneer = require("../../../models/auctionnerModel");
const auction = require("../../../models/auctions");
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

// Get all auctions
router.get("/getAllAuctions/:id", async (req, res) => {
  try {
    const allAuctions = await auction.find({ auctioneerId: req.params.id });
    return res.status(200).json(allAuctions);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// Get ongoing auctions  //got output as []
router.get("/getOngoingAuctions/:id", async (req, res) => {
  try {
    const ongoingAuctions = await auction.find({
      auctioneerId: req.params.id,
      isExpired: false,
    });
    return res.status(200).json(ongoingAuctions);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// Get expired auctions
router.get("/getExpiredAuctions/:id", async (req, res) => {
  try {
    const expiredAuctions = await auction.find({
      auctioneerId: req.params.id,
      isExpired: true,
    });
    return res.status(200).json(expiredAuctions);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// Auctioneer login  //internal server error
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const auctioneer = await auctioneer.findOne({ email: email, password: password });
//         if (auctioneer) {
//             return res.status(200).json(auctioneer);
//         } else {
//             return res.status(400).json({ message: "Login failed. Invalid email or password." });
//         }
//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// });

module.exports = router;
