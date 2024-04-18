const mongoose = require("mongoose");


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
    
   
    auctionImage: {
      type: String,
      required: true,
    },
    bidPrice: {
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
    
    cardNumber: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
    cvc: {
      type: Number,
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
