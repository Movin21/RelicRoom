const express = require("express");
const Bids = require("../../../models/bid");

const router = express.Router();

// Save bids
router.post("/save", async (req, res) => {
  try {
    let newBid = new Bids(req.body);
    const savedBid = await newBid.save();
    console.log("Bid has saved Successfully", savedBid);
    return res.status(200).json({
      success: "Bid saved successfully",
      bid: savedBid,
    });
  } catch (error) {
    console.error("Error saving Bid", error);
    return res.status(500).json({
      error: "An error occurred while saving the Bid",
    });
  }
});

// Get all bid information
router.get("/", async (req, res) => {
  try {
    const bids = await Bids.find();
    if (!bids || bids.length === 0) {
      throw new Error("No bids found");
    }
    res.status(200).json({
      success: true,
      existingBids: bids,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
});

// Get Bid by id
router.get("/:id", async (req, res) => {
  try {
    const bid = await Bids.findById(req.params.id);
    if (!bid) {
      throw new Error("Bid is not found");
    }
    res.status(200).json({
      success: true,
      bid: bid,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "An error occurred while fetching the bid",
    });
  }
});

// Update a bid
router.put("/update/:id", async (req, res) => {
  try {
    await Bids.findByIdAndUpdate(req.params.id, { $set: req.body });
    return res.status(200).json({
      success: "Update Successfully",
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

// Delete a Bid
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteBid = await Bids.findByIdAndDelete(req.params.id);
    if (!deleteBid) {
      return res.status(404).json({
        message: "Bid not found",
      });
    }
    return res.status(200).json({
      message: "Bid delete Successful",
      deleteBid,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Bid delete unsuccessful",
      error: err,
    });
  }
});

module.exports = router;
