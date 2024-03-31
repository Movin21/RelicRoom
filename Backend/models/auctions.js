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
      required: true,
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
    default: 0,
  },
  isExpired: {
    type: Boolean,
    default: false,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
});

module.exports = mongoose.model("Auctions", auctionSchema);
