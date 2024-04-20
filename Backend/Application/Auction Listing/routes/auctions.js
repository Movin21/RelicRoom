const express = require("express");
const Auctions = require("../../../models/auctions");
const mongoose = require("mongoose");
const cron = require("node-cron");

const router = express.Router();

// Function to update expired auctions
async function updateExpiredAuctions() {
  try {
    const expiredAuctions = await Auctions.find({
      auctionDuration: { $lte: new Date() },
      isExpired: false,
    });

    for (const auction of expiredAuctions) {
      auction.isExpired = true;
      await auction.save();
    }
  } catch (error) {
    console.error("Error updating expired auctions:", error);
  }
}

// Invoke the function to update expired auctions
cron.schedule("* * * * * *", () => {
  updateExpiredAuctions();
});

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

// Update the current bid and leading bidder of an auction
router.put("/updateBidAndLeadingBidder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { newBid, leadingBidder } = req.body;

    // Validate request body
    if (!newBid || isNaN(newBid) || typeof leadingBidder !== "string") {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Update auction with new bid and leading bidder
    const updatedAuction = await Auctions.findByIdAndUpdate(
      id,
      { currentBid: newBid, leadingBidderName: leadingBidder },
      { new: true }
    );

    // Check if auction exists
    if (!updatedAuction) {
      return res.status(404).json({ error: "Auction not found" });
    }

    // Send success response with updated auction
    return res.status(200).json({
      success: "Auction updated successfully",
      auction: updatedAuction,
    });
  } catch (err) {
    // Handle errors
    console.error("Error updating bid and leading bidder:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Update view count of an auction
router.put("/:id/views", async (req, res) => {
  try {
    const auction = await Auctions.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    return res.status(200).json({
      success: "View count updated successfully",
      auction: auction,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Update Auction
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAuction = await Auctions.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedAuction) {
      return res.status(404).json({ error: "Auction not found" });
    }

    return res.status(200).json({
      success: "Auction updated successfully",
      auction: updatedAuction,
    });
  } catch (error) {
    console.error("Error updating auction:", error);
    return res.status(500).json({ error: "Internal server error" });
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

// Get auctions by auctioneer ID
router.get("/auctioneer/:id", async (req, res) => {
  try {
    const auctioneerId = req.params.id;
    const auctions = await Auctions.find({ auctioneerId: auctioneerId });
    res.status(200).json(auctions);
  } catch (error) {
    console.error("Error fetching auctions by auctioneer ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
