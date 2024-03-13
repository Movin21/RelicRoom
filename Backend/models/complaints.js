const mongoose = require("mongoose");

const ComplaintsSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      Required: true,
    },
    Email: {
      type: String,
      Required: true,
    },
    IsComplaint: {
      type: String,
      default: "Complaints",
    },
    Complaints: {
      type: String,
      Required: true,
    },
    Rate: {
      type: Number,
      Required: true,
    },
    ScreenShots: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const ComplaintModel = mongoose.model("complaints", ComplaintsSchema);
module.exports = ComplaintModel;
