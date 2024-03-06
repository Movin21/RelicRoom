const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  auctionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auctions",
  },
  auctioneerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auctioneer",
  },
  bidderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bidder",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  bidPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Bids", bidSchema);
