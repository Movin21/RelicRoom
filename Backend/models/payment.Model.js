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
    
   
    auctionImage: {
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
    cardNumber: {
      type: Number,
      required: true,
    },
   
    bidPrice: {
      type: String,
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
    contactnumber: {
        type: Number,
        required: true,
      },


      status: {
        type: String,
        enum: ['processing', 'on-the-way', 'Deliverd'], 
        default: 'processing' 
    }
   
  },
  { timestamp: true }
);

const PaymentModel = mongoose.model("Payment", PaymentSchema);
module.exports = PaymentModel;