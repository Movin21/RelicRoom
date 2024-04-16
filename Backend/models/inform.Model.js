const mongoose = require("mongoose");
const { boolean } = require("zod");

const InformSchema = mongoose.Schema(
  {
    bidderId : {
      type: String,
      required: true,
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
    auctionImage: {
      type: String,
      required: true,
    },
    auctionStartingPrice: {
      type: String,
      required: true,
      
    },
   
   
  },
  { timestamp: true }
);

const InformModel = mongoose.model("Inform", InformSchema);
module.exports = InformModel;
