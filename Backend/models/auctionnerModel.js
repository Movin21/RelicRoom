const mongoose = require("mongoose");

const auctioneerSchema = mongoose.Schema(
  {
    companyname: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobilenumber: {
      type: String,
      required: true,
      max: 10,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    termsconditions: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamp: true }
);

const auctionnerModel = mongoose.model("Auctioneer", auctioneerSchema);
module.exports = auctionnerModel;
