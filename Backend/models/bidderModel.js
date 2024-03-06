const mongoose = require("mongoose");

const bidderSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactnumber: {
      type: String,
      required: true,
      maxlength: 10,
    },
    profilepic: {
      type: String,
      required: true,
    },
    area: {
      type: Boolean,
      required: true,
    },
    howtoknow: {
      type: String,
      required: false,
    },
    interests: {
      type: Boolean,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    termscondition: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: true,
    },
  },
  { timestamp: true }
);

const bidderModel = mongoose.model("Bidder", bidderSchema);
module.exports = bidderModel;
