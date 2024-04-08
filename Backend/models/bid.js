const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    auctionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
    },
    auctioneerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auctioneer",
    },
    bidderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bidder",
    },
    bidPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bids", bidSchema);
