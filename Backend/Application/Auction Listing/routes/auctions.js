const express = require("express");
const Auctions = require("../../../models/auctions");

const router = express.Router();

// Save Auctions
router.post("/save", async (req, res) => {
  try {
    let newAuction = new Auctions(req.body);
    const savedAuction = await newAuction.save();
    console.log("Auction saved successfully:", savedAuction);
    return res.status(200).json({
      success: "Auction saved successfully",
      auction: savedAuction,
    });
  } catch (error) {
    console.error("Error saving Auction:", error);
    return res.status(500).json({
      error: "An error occurred while saving the Auction",
    });
  }
});

// Get all Auctions
router.get("/", async (req, res) => {
  try {
    const auctions = await Auctions.find();
    if (!auctions || auctions.length === 0) {
      throw new Error("No auctions found.");
    }
    res.status(200).json({
      success: true,
      existingAuctions: auctions,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "An error occurred while fetching auctions.",
    });
  }
});

// Get auction by id
router.get("/:id", async (req, res) => {
  try {
    const auctionId = req.params.id;
    const auction = await Auctions.findById(auctionId);
    if (!auction) {
      throw new Error("Auction not found.");
    }
    res.status(200).json({
      success: true,
      auction: auction,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "An error occurred while fetching the auction.",
    });
  }
});

// Update a Auction
router.put("/update/:id", async (req, res) => {
  try {
    await Auctions.findByIdAndUpdate(req.params.id, { $set: req.body });
    return res.status(200).json({
      success: "Updated Successfully",
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

// Delete a Auction
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedAuction = await Auctions.findByIdAndDelete(req.params.id);
    if (!deletedAuction) {
      return res.status(404).json({
        message: "Auction not found",
      });
    }
    return res.status(200).json({
      message: "Delete Successful",
      deletedAuction,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Delete unsuccessful",
      error: err,
    });
  }
});

module.exports = router;
