const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    auctionid: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Auctions",
      required: true,
    },
  },
  { timestamp: true }
);

const wishlistModel = mongoose.model("Wishlist", wishlistSchema);
module.exports = wishlistModel;
