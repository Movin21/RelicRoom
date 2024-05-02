const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RevenueSchema = new Schema({
  month: {
    type: String, // Month name
    required: true,
    default: () => {
      const monthIndex = new Date().getMonth();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return monthNames[monthIndex];
    },
  },
  revenue: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});


const Revenue = mongoose.model("Revenue", RevenueSchema);

module.exports = Revenue;
