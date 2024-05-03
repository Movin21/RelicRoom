const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema(
  {

    bidderId: {
      type: String,
      required: true,
    },
    auctionImages: [
      {
        type: String,
      },
    ],
    auctionTitle: {
      type: String,
      required: true,
    },
    currentBid: {
      type: String,
      required: true,
    },
    isExpired: {
      type: Boolean,
      required: true,
    },
  },
  { timestamp: true }
);

const wishlistModel = mongoose.model("Wishlist", wishlistSchema);
module.exports = wishlistModel;