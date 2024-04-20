const Revenue = require("../../../models/revenue");
const auction = require("../../../models/auctions");

// Define a function to get the current month as a string
const getCurrentMonthAsString = () => {
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
  const currentMonthIndex = new Date().getMonth();
  return monthNames[currentMonthIndex];
};

// Define getAllData function
const getAllData = async () => {
  try {
    const result = await auction.aggregate([
      {
        $match: { isExpired: false }, // Match only auctions where isExpired is false (Live)
      },
      {
        $group: {
          _id: null,
          totalStartingPrice: { $sum: "$auctionStartingPrice" },
        },
      },
    ]);

    const totalStartingPrice =
      result.length > 0 ? result[0].totalStartingPrice : 0;

    // Calculate revenue and cost rounded to 2 decimal points
    const revenue = parseFloat((totalStartingPrice / 100) * 5).toFixed(2);
    const cost = parseFloat((revenue / 100) * 98).toFixed(2);

    return { revenue, cost }; // Returning the result
  } catch (error) {
    console.error("Error getting summation of auctionStartingPrice:", error);
    throw new Error("Error getting summation of auctionStartingPrice");
  }
};

// Define updateMonthlyData function
const updateMonthlyData = async () => {
  try {
    const { revenue, cost } = await getAllData(); // Await the result of getAllData()

    // Create or update revenue data for the current month
    const currentMonth = getCurrentMonthAsString(); // Get the current month as a string
    const existingData = await Revenue.findOneAndUpdate(
      { month: currentMonth },
      { revenue: revenue, cost: cost },
      { new: true, upsert: true }
    );

    console.log("Monthly data updated successfully:", existingData);
  } catch (error) {
    console.error("Error updating monthly data:", error);
    throw new Error("Error updating monthly data");
  }
};
const totalCount = async (req, res) => {
  try {
    const result = await auction.aggregate([
      {
        $match: { isExpired: false }, // Match only auctions where isExpired is false (Live)
      },
      {
        $group: {
          _id: null,
          totalStartingPrice: { $sum: "$auctionStartingPrice" },
          totalAuctions: { $sum: 1 }, // Count the number of auctions
        },
      },
    ]);

    // Calculate total value by multiplying total starting price with the number of auctions
    const totalValue =
      result.length > 0
        ? result[0].totalStartingPrice * result[0].totalAuctions
        : 0;

    res.json({ totalValue });
  } catch (error) {
    console.error("Error calculating total value of auctions:", error);
    res
      .status(500)
      .json({ error: "Error calculating total value of auctions" });
  }
};

module.exports = { getAllData, updateMonthlyData, totalCount };
