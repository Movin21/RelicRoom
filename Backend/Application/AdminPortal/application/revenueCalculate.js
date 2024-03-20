const express = require("express");
const mongoose = require("mongoose");
const Revenue = require("../../../models/revenue");

// Get all data
const getAllData = async () => {
  const data = await Revenue.find();
  res.status(200).json(data);
};
// Update data monthly
const updateMonthlyData = async (revenue, cost) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

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
