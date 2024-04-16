const mongoose = require("mongoose");
const { boolean } = require("zod");

const PaymentSchema = mongoose.Schema(
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
    firstname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    contactnumber: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    CardNumber: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    cvc: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['processing', 'On-the-way', 'delivered'], 
      default: 'processing' 
  }
   
  },
  { timestamp: true }
);

const PaymentModel = mongoose.model("Payment", PaymentSchema);
module.exports = PaymentModel;
