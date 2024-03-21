const mongoose = require("mongoose");

const revenueSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: () => {
        // Get the name of the previous month
        const currentDate = new Date();
        const previousMonth = new Date(currentDate);
        previousMonth.setMonth(currentDate.getMonth() - 1);
        return new Intl.DateTimeFormat("en-US", { month: "short" }).format(
          previousMonth
        );
      },
    },
    Revenue: {
      type: Number,
      required: true,
      default: 0,
    },
    Cost: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("revenue", revenueSchema);
