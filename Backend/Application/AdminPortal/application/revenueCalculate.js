const express = require("express");
const mongoose = require("mongoose");
const Revenue = require("../../../models/revenue");
const auction = require("../../../models/auctions");
// Get all data
const getAllData = async (req, res) => {
  try {
    const result = await auction.aggregate([
      {
        $match: { isExpired: false }, // Match only auction where isExpired is false (Live)
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

    res.json((totalStartingPrice / 100) * 5); // Sending response back
  } catch (error) {
    console.error("Error getting summation of auctionStartingPrice:", error);
    res
      .status(500)
      .json({ error: "Error getting summation of auctionStartingPrice" }); // Handling errors
  }
};

// Update data monthly
const updateMonthlyData = async () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const revenue = await getAllData(); // Await the result of getAllData()
  const cost = parseFloat(revenue) - (parseFloat(revenue) / 100) * 2; // Cast to number

  // Check if data for the current month exists
  const existingData = await Revenue.findOne({ name: currentMonth });
  if (!existingData) {
    // If data doesn't exist, create new entry with provided values
    const newData = new Revenue({
      name: currentMonth,
      Revenue: revenue,
      Cost: cost,
    });
    await newData.save();
  } else {
    // If data already exists, update the Revenue and Cost
    existingData.Revenue = revenue;
    existingData.Cost = cost;
    await existingData.save();
  }
};
module.exports = { getAllData, updateMonthlyData };
