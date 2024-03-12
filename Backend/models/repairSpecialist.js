const mongoose = require("mongoose");

const repairSpecialistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    certificates: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "Repair Specialist",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("RepairSpecialist", repairSpecialistSchema);
