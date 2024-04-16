const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  auctioneerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auctioneer",
  },
  auctionTitle: {
    type: String,
    required: true,
  },
  auctionCategory: {
    type: String,
    required: true,
  },
  auctionDescription: {
    type: String,
    required: true,
  },
  auctionImages: [
    {
      type: String,
    },
  ],
  auctionStartingPrice: {
    type: Number,
    required: true,
  },
  auctionDuration: {
    type: Date,
    required: true,
  },
  currentBid: {
    type: Number,
  },
  isExpired: {
    type: Boolean,
    default: false,
  },
  viewCount: {
    type: Number,
  },
  leadingBidderName: {
    type: String,
    default: "No bidders yet",
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
});

module.exports = mongoose.model("Auctions", auctionSchema);
