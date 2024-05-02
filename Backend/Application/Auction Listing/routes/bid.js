const express = require("express");
const Bids = require("../../../models/bid");

const router = express.Router();

// Save bids
router.post("/save", async (req, res) => {
  try {
    let newBid = new Bids(req.body);

    const savedBid = await newBid.save();
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

// Get Bids by Auction ID
router.get("/:id", async (req, res) => {
  try {
    const bids = await Bids.find({ auctionId: req.params.id }); // Corrected parameter name
    if (!bids || bids.length === 0) {
    }
    res.status(200).json({
      success: true,
      bids: bids,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({
      success: false,
      error: "An error occurred while fetching the bids",
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

//get last 3 bidder details
router.get("/last3bidders/:auctionId", async (req, res) => {
  try {
    const auctionId = req.params.auctionId;

    const lastThreeBids = await Bids.find({ auctionId })
      .sort({ createdAt: -1, updatedAt: -1 })
      .limit(3);

    console.log("Last three bids:", lastThreeBids); // Log the last three bids

    // Manually populate the bidderId
    const transformedBids = await Promise.all(
      lastThreeBids.map(async (bid) => {
        console.log("Current bid:", bid); // Log the current bid

        if (bid.bidderId) {
          const bidder = await Bidders.findById(bid.bidderId);
          console.log("Retrieved bidder:", bidder); // Log the retrieved bidder

          if (bidder) {
            return {
              ...bid._doc,
              bidderId: {
                _id: bidder._id,
                firstname: bidder.firstname,
                lastname: bidder.lastname,
                email: bidder.email,
                address: bidder.address,
                contactnumber: bidder.contactnumber,
              },
            };
          } else {
            return {
              ...bid._doc,
              bidderId: null,
            };
          }
        } else {
          return {
            ...bid._doc,
            bidderId: null,
          };
        }
      })
    );

    console.log("Transformed bids:", transformedBids); // Log the transformed bids

    res.json(transformedBids);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
