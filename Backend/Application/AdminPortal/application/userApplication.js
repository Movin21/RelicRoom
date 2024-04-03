const auctioneers = require("../../../models/auctionnerModel");
const bidders = require("../../../models/bidderModel");
const vintageExpert = require("../../../models/vintageExpert");
const repairSpecialist = require("../../../models/repairSpecialist");
const express = require("express");
const getAllUsers = async (req, res) => {
  try {
    const auctioneerUsers = await auctioneers.find();
    const bidderUsers = await bidders.find();
    const vintageExpertUsers = await vintageExpert.find();
    const repairSpecialistUsers = await repairSpecialist.find();

    const allUsers = [
      ...auctioneerUsers,
      ...bidderUsers,
      ...vintageExpertUsers,
      ...repairSpecialistUsers,
    ];

    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

const getAllAuctioneers = async (req, res) => {
  try {
    const auctioneerUsers = await auctioneers.find();
    res.status(200).json(auctioneerUsers);
  } catch (error) {
    next(error);
  }
};

const getAllBidders = async (req, res) => {
  try {
    const bidderUsers = await bidders.find();
    res.status(200).json(bidderUsers);
  } catch (error) {
    next(error);
  }
};

const getAllVintageExperts = async (req, res) => {
  try {
    const vintageExpertUsers = await vintageExpert.find();
    res.status(200).json(vintageExpertUsers);
  } catch (error) {
    next(error);
  }
};

const getAllRepairSpecialists = async (req, res) => {
  try {
    const repairSpecialistUsers = await repairSpecialist.find();
    res.status(200).json(repairSpecialistUsers);
  } catch (error) {
    next(error);
  }
};

const deactivateAuctioneer = async (userId) => {
  return await auctioneers.findByIdAndUpdate(userId, { isActive: false });
};

const deactivateBidder = async (userId) => {
  return await bidders.findByIdAndUpdate(userId, { isActive: false });
};

const deactivateVintageExpert = async (userId) => {
  return await vintageExpert.findByIdAndUpdate(userId, { isActive: false });
};

const deactivateRepairSpecialist = async (userId) => {
  return await repairSpecialist.findByIdAndUpdate(userId, { isActive: false });
};

const deleteAuctioneer = async (req, res) => {
  try {
    const Auctioneer = await auctioneers.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Auctioneer Deleted" });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

const deleteBidder = async (req, res) => {
  try {
    const Bidder = await bidders.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Bidder Deleted" });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

const deleteVintageExpert = async (req, res) => {
  try {
    const VintageExpert = await vintageExpert.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Vintage Expert Deleted" });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
const deleteRepairSpecialist = async (req, res) => {
  try {
    const RepairSpecialist = await repairSpecialist.findByIdAndDelete(
      req.params.id
    );
    return res.status(200).json({ msg: "Repair Specialist Deleted" });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

const countAuctioneers = async (req, res) => {
  try {
    const count = await auctioneers.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};

const countBidders = async (req, res) => {
  try {
    const count = await bidders.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};

const countVintageExperts = async (req, res) => {
  try {
    const count = await vintageExpert.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};

const countRepairSpecialists = async (req, res) => {
  try {
    const count = await repairSpecialist.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};
const countAllUsers = async (req, res, next) => {
  try {
    const auctioneerCount = await auctioneers.countDocuments();
    const bidderCount = await bidders.countDocuments();
    const vintageExpertCount = await vintageExpert.countDocuments();
    const repairSpecialistCount = await repairSpecialist.countDocuments();

    const totalCount =
      auctioneerCount +
      bidderCount +
      vintageExpertCount +
      repairSpecialistCount;
    res.status(200).json(totalCount);
  } catch (error) {
    next(error);
  }
};
const userChart = async (req, res, next) => {
  try {
    const auctioneerCount = await auctioneers.countDocuments();
    const bidderCount = await bidders.countDocuments();
    const vintageExpertCount = await vintageExpert.countDocuments();
    const repairSpecialistCount = await repairSpecialist.countDocuments();

    // Creating an array of objects with the desired structure
    const data = [
      { name: "Auctioneer", value: auctioneerCount },
      { name: "Bidder", value: bidderCount },
      { name: "Vintage Expert", value: vintageExpertCount },
      { name: "Repair Specialist", value: repairSpecialistCount },
    ];

    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllAuctioneers,
  getAllBidders,
  getAllVintageExperts,
  getAllRepairSpecialists,
  deactivateAuctioneer,
  deactivateBidder,
  deactivateVintageExpert,
  deactivateRepairSpecialist,
  deleteAuctioneer,
  deleteBidder,
  deleteVintageExpert,
  deleteRepairSpecialist,
  countAllUsers,
  countAuctioneers,
  countBidders,
  countVintageExperts,
  countRepairSpecialists,
  userChart,
};
